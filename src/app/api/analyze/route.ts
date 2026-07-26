import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { TestAnswers } from "@/contexts/KillTestContext";
import type { AnalysisResult, Language } from "@/lib/analysis-schema";
import { RESEARCH_PROMPT, buildAnalysisPrompt } from "@/lib/analysis-prompt";

export const maxDuration = 300; // long analyses run for minutes

const MODEL = "claude-opus-5";

/**
 * Rate limiting is mandatory here, not optional.
 *
 * This is a public endpoint that calls a premium model twice per request with a
 * large token budget. Uncapped, a single scripted caller can run up a real bill
 * in an hour. In-memory limiters are useless on serverless (they reset every
 * deploy and aren't shared across instances), so this uses Upstash Redis over
 * REST.
 *
 * If Upstash is not configured the route fails CLOSED with an operator-facing
 * error. That is deliberate: an unavailable validator is recoverable, an
 * unmetered one is not.
 */
const upstashConfigured = Boolean(
  process.env.IDEA_VALIDATOR_UPSTASH_URL && process.env.IDEA_VALIDATOR_UPSTASH_TOKEN,
);

const redis = upstashConfigured
  ? new Redis({
      url: process.env.IDEA_VALIDATOR_UPSTASH_URL!,
      token: process.env.IDEA_VALIDATOR_UPSTASH_TOKEN!,
    })
  : null;

// Two windows: bursts and sustained abuse are different attacks.
const perMinute = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 m"),
      prefix: "aiv:min",
    })
  : null;
const perDay = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(25, "24 h"),
      prefix: "aiv:day",
    })
  : null;

function clientId(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-nf-client-connection-ip") ?? "unknown";
}

/**
 * Split the founder's answers into prose and self-assessment scores.
 *
 * Walks the object rather than naming fields, so adding a question upstream
 * can't silently drop it from the analysis — the previous implementation
 * hardcoded a field list, and any question added later was invisible to the model.
 */
function partitionAnswers(answers: TestAnswers): {
  responses: string;
  selfScores: string;
} {
  const prose: string[] = [];
  const scores: string[] = [];

  for (const [key, raw] of Object.entries(answers as Record<string, unknown>)) {
    if (raw === null || raw === undefined || raw === "") continue;
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());

    if (key.endsWith("Score") || typeof raw === "number") {
      scores.push(`- ${label.replace(/ Score$/, "")}: ${String(raw)}/10`);
    } else if (typeof raw === "string") {
      prose.push(`### ${label}\n${raw.trim()}`);
    } else if (Array.isArray(raw) && raw.length > 0) {
      prose.push(`### ${label}\n${raw.map(String).join("\n")}`);
    }
  }

  return {
    responses: prose.join("\n\n") || "(no written responses provided)",
    selfScores: scores.join("\n") || "(no self-assessment scores provided)",
  };
}

/** JSON Schema for the structured response. Every object needs additionalProperties: false. */
const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "verdict",
    "confidence",
    "uncertainty",
    "headline",
    "category",
    "buyer",
    "priceBand",
    "theIdea",
    "theSolution",
    "valueProposition",
    "whyThisCouldWork",
    "biggestRisk",
    "secondRisk",
    "validationPlan",
    "positioning",
    "finalAssessment",
    "riskScores",
    "contradictions",
    "comparables",
  ],
  properties: {
    verdict: { type: "string", enum: ["kill", "flip", "build", "bet"] },
    confidence: { type: "integer" },
    uncertainty: { type: "string" },
    headline: { type: "string" },
    category: { type: "string" },
    buyer: { type: "string" },
    priceBand: { type: "string" },
    theIdea: { type: "string" },
    theSolution: { type: "string" },
    valueProposition: { type: "string" },
    whyThisCouldWork: { type: "string" },
    biggestRisk: { type: "string" },
    secondRisk: { type: "string" },
    validationPlan: { type: "string" },
    positioning: { type: "string" },
    finalAssessment: { type: "string" },
    riskScores: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "key",
          "label",
          "selfScore",
          "adjustedScore",
          "higherIs",
          "reasoning",
        ],
        properties: {
          key: {
            type: "string",
            enum: [
              "copycat_risk",
              "platform_risk",
              "lock_in_strength",
              "pricing_power",
              "execution_risk",
              "regulatory_risk",
            ],
          },
          label: { type: "string" },
          selfScore: { type: ["integer", "null"] },
          adjustedScore: { type: "integer" },
          higherIs: { type: "string", enum: ["worse", "better"] },
          reasoning: { type: "string" },
        },
      },
    },
    contradictions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "key",
          "label",
          "selfScore",
          "adjustedScore",
          "quote",
          "issue",
        ],
        properties: {
          key: { type: "string" },
          label: { type: "string" },
          selfScore: { type: "integer" },
          adjustedScore: { type: "integer" },
          quote: { type: "string" },
          issue: { type: "string" },
        },
      },
    },
    comparables: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "what", "difference", "url"],
        properties: {
          name: { type: "string" },
          what: { type: "string" },
          difference: { type: "string" },
          url: { type: ["string", "null"] },
        },
      },
    },
  },
};

export async function POST(request: Request) {
  // ── Rate limit ────────────────────────────────────────────────────────────
  if (!perMinute || !perDay) {
    console.error(
      "[analyze] Upstash is not configured. Set IDEA_VALIDATOR_UPSTASH_URL and " +
        "IDEA_VALIDATOR_UPSTASH_TOKEN. Refusing to run an uncapped premium-model endpoint.",
    );
    return NextResponse.json(
      {
        error:
          "Analysis is temporarily unavailable. The operator has been notified.",
      },
      { status: 503 },
    );
  }

  const id = clientId(request);
  const [minute, day] = await Promise.all([
    perMinute.limit(id),
    perDay.limit(id),
  ]);
  if (!minute.success || !day.success) {
    return NextResponse.json(
      {
        error:
          "Rate limit reached. This analysis is expensive to run — please try again later.",
      },
      {
        status: 429,
        headers: { "Retry-After": minute.success ? "3600" : "60" },
      },
    );
  }

  const apiKey = process.env.IDEA_VALIDATOR_ANTHROPIC_KEY;
  if (!apiKey) {
    // Fail loudly. The previous version silently served canned template text
    // here, which is a large part of why the tool felt shallow — a missing key
    // was indistinguishable from a real analysis.
    console.error("[analyze] IDEA_VALIDATOR_ANTHROPIC_KEY is not set.");
    return NextResponse.json(
      {
        error:
          "Analysis is temporarily unavailable. The operator has been notified.",
      },
      { status: 503 },
    );
  }

  try {
    const { answers, language = "en" } = (await request.json()) as {
      answers: TestAnswers;
      language?: Language;
    };

    const client = new Anthropic({ apiKey });
    const { responses, selfScores } = partitionAnswers(answers);

    // ── Stage 1: competitive research ───────────────────────────────────────
    // A separate call so web search never has to coexist with a constrained
    // output format. Prose in, prose out.
    let research = "(no research available)";
    let researchPerformed = false;
    try {
      const researched = await client.messages.create({
        model: MODEL,
        max_tokens: 4000,
        output_config: { effort: "medium" },
        tools: [
          { type: "web_search_20260209", name: "web_search", max_uses: 6 },
        ],
        messages: [
          {
            role: "user",
            content: RESEARCH_PROMPT.replace(
              "{IDEA}",
              responses.slice(0, 6000),
            ),
          },
        ],
      });
      const text = researched.content
        .filter((b) => b.type === "text")
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("\n")
        .trim();
      if (text) {
        research = text;
        researchPerformed = true;
      }
    } catch (e) {
      // Research is an enhancement, not a precondition — degrade to an
      // unresearched analysis rather than failing the request. The response
      // records researchPerformed:false so the UI never implies otherwise.
      console.error(
        "[analyze] research stage failed, continuing without it:",
        e,
      );
    }

    // ── Stage 2: the analysis ───────────────────────────────────────────────
    // Streamed because a model writing a multi-section document at this length
    // would otherwise risk the SDK's HTTP timeout.
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 32000,
      output_config: {
        effort: "high",
        format: { type: "json_schema", schema: OUTPUT_SCHEMA },
      },
      messages: [
        {
          role: "user",
          content: buildAnalysisPrompt(
            responses,
            selfScores,
            research,
            language,
          ),
        },
      ],
    });

    const message = await stream.finalMessage();

    if (message.stop_reason === "refusal") {
      console.error("[analyze] model declined:", message.stop_details);
      return NextResponse.json(
        {
          error:
            "This idea could not be analyzed automatically. Please rephrase and try again.",
        },
        { status: 422 },
      );
    }

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error(
        `no text block in response (stop_reason: ${message.stop_reason})`,
      );
    }

    const parsed = JSON.parse(textBlock.text) as AnalysisResult;

    const result: AnalysisResult = {
      ...parsed,
      confidence: Math.max(
        0,
        Math.min(100, Math.round(parsed.confidence ?? 50)),
      ),
      riskScores: parsed.riskScores ?? [],
      contradictions: parsed.contradictions ?? [],
      comparables: parsed.comparables ?? [],
      meta: {
        model: message.model,
        researchPerformed,
        language,
        generatedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    // No canned fallback. A failure that looks like a successful shallow
    // analysis is worse than an honest error.
    console.error("[analyze] failed:", error);
    return NextResponse.json(
      {
        error:
          "Analysis failed. Please try again — if it persists, the operator has been notified.",
      },
      { status: 500 },
    );
  }
}
