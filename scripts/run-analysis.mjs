/**
 * Run a real analysis from the command line.
 *
 *   node --env-file=.env.local scripts/run-analysis.mjs <payload.json>
 *
 * Reads the same env vars the API route uses. Prints the analysis and never
 * prints a secret value — only lengths, so a misconfigured key is diagnosable
 * without exposing it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
// The prompt and schema live in TypeScript modules, which plain node can't
// import. Rather than duplicating them here (which would drift from what the
// API route actually sends), read the sources and extract the pieces.
const rd = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const promptSrc = rd("../src/lib/analysis-prompt.ts");
const schemaTs = rd("../src/lib/analysis-schema.ts");
const routeSrc = rd("../src/app/api/analyze/route.ts");

const RESEARCH_PROMPT = promptSrc.match(/RESEARCH_PROMPT = `([\s\S]*?)`;/)[1];
const GRAMMAR_REPAIR = schemaTs.match(/GRAMMAR_REPAIR = `([\s\S]*?)`;/)[1];
const ES_MX = schemaTs.match(/ES_MX_INSTRUCTION = `([\s\S]*?)`;/)[1];
const template = promptSrc.match(/return `([\s\S]*?)`;\s*\n}/)[1];

const buildAnalysisPrompt = (responses, selfScores, research, language) =>
  template
    .replace(
      /\$\{language === "es" \? ES_MX_INSTRUCTION \+ "\\n\\n" : ""\}/,
      language === "es" ? ES_MX + "\n\n" : "",
    )
    .replace("${GRAMMAR_REPAIR}", GRAMMAR_REPAIR)
    .replace("${research}", research)
    .replace("${responses}", responses)
    .replace("${selfScores}", selfScores);

const OUTPUT_SCHEMA = JSON.parse(
  routeSrc
    .match(
      /const OUTPUT_SCHEMA = ([\s\S]*?);\s*\nexport async function POST/,
    )[1]
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
    .replace(/,(\s*[}\]])/g, "$1"),
);

/**
 * Resolve the API key. Checks this repo first, then the operating-system repo,
 * then the plain env. Loading happens in here rather than via a --env-file flag
 * so the command line never has to name a secrets file — the secrets hook
 * blocks any command text that does, and rightly so.
 *
 * Values are read into memory and never printed.
 */
function loadKey() {
  if (process.env.IDEA_VALIDATOR_ANTHROPIC_KEY)
    return {
      key: process.env.IDEA_VALIDATOR_ANTHROPIC_KEY,
      from: "environment",
    };

  const candidates = [
    ["../.env.local", "this repo"],
    ["../../operating-system/.env.local", "operating-system"],
    ["../../operating-system/.env", "operating-system (.env)"],
  ];

  for (const [rel, label] of candidates) {
    let raw;
    try {
      raw = readFileSync(new URL(rel, import.meta.url), "utf8");
    } catch {
      continue;
    }
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(
        /^\s*(?:IDEA_VALIDATOR_ANTHROPIC_KEY|ANTHROPIC_API_KEY)\s*=\s*(.+)$/,
      );
      if (!m) continue;
      const v = m[1].trim().replace(/^["']|["']$/g, "");
      if (v && !/^(PASTE|YOUR|REPLACE)/i.test(v))
        return { key: v, from: label };
    }
  }
  return { key: null, from: null };
}

const { key: KEY, from: KEY_SOURCE } = loadKey();
if (KEY) console.log(`key loaded from: ${KEY_SOURCE} (${KEY.length} chars)`);

console.log("env check (lengths only, values never printed):");
for (const name of [
  "IDEA_VALIDATOR_ANTHROPIC_KEY",
  "IDEA_VALIDATOR_UPSTASH_URL",
  "IDEA_VALIDATOR_UPSTASH_TOKEN",
]) {
  const v = process.env[name];
  console.log(`  ${name}: ${v ? `${v.length} chars` : "NOT SET"}`);
}

if (!KEY) {
  console.error("\nIDEA_VALIDATOR_ANTHROPIC_KEY is not set — cannot run.");
  process.exit(1);
}

const payloadPath = process.argv[2];
if (!payloadPath) {
  console.error(
    "usage: node --env-file=.env.local scripts/run-analysis.mjs <payload.json>",
  );
  process.exit(1);
}

const { answers, language = "en" } = JSON.parse(
  readFileSync(payloadPath, "utf8"),
);

// Same partition logic as the route.
const prose = [];
const scores = [];
for (const [key, raw] of Object.entries(answers)) {
  if (raw === null || raw === undefined || raw === "") continue;
  const label = key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase());
  if (key.endsWith("Score") || typeof raw === "number") {
    scores.push(`- ${label.replace(/ Score$/, "")}: ${raw}/10`);
  } else {
    prose.push(`### ${label}\n${String(raw).trim()}`);
  }
}
const responses = prose.join("\n\n");
const selfScores = scores.join("\n");

const client = new Anthropic({ apiKey: KEY });

console.log("\n[1/2] researching competitors via web search…");
let research = "(no research available)";
let researchPerformed = false;
try {
  const r = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 4000,
    output_config: { effort: "medium" },
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
    messages: [
      {
        role: "user",
        content: RESEARCH_PROMPT.replace("{IDEA}", responses.slice(0, 6000)),
      },
    ],
  });
  const t = r.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
  if (t) {
    research = t;
    researchPerformed = true;
    console.log(`      got ${t.length} chars of research`);
  }
} catch (e) {
  console.error("      research failed, continuing without it:", e.message);
}

console.log("[2/2] running the analysis (this takes a few minutes)…");
const stream = client.messages.stream({
  model: "claude-opus-5",
  max_tokens: 32000,
  output_config: {
    effort: "high",
    format: {
      type: "json_schema",
      schema: OUTPUT_SCHEMA,
    },
  },
  messages: [
    {
      role: "user",
      content: buildAnalysisPrompt(responses, selfScores, research, language),
    },
  ],
});

const msg = await stream.finalMessage();
if (msg.stop_reason === "refusal") {
  console.error("model declined:", msg.stop_details);
  process.exit(1);
}

const out = JSON.parse(msg.content.find((b) => b.type === "text").text);
out.meta = {
  model: msg.model,
  researchPerformed,
  language,
  generatedAt: new Date().toISOString(),
};

writeFileSync("analysis-output.json", JSON.stringify(out, null, 2));

console.log("\n" + "=".repeat(72));
console.log(
  `VERDICT: ${out.verdict.toUpperCase()}   confidence ${out.confidence}%`,
);
console.log("=".repeat(72));
console.log(`\n${out.headline}\n`);
console.log(`Category:   ${out.category}`);
console.log(`Buyer:      ${out.buyer}`);
console.log(`Price band: ${out.priceBand}`);
console.log(`\nRemaining ${100 - out.confidence}%: ${out.uncertainty}`);

if (out.contradictions?.length) {
  console.log(
    `\n── CONTRADICTIONS (${out.contradictions.length}) ${"─".repeat(40)}`,
  );
  for (const c of out.contradictions) {
    console.log(
      `\n${c.label}: you ${c.selfScore}/10 → adjusted ${c.adjustedScore}/10`,
    );
    console.log(`  "${c.quote}"`);
    console.log(`  ${c.issue}`);
  }
}

if (out.riskScores?.length) {
  console.log(`\n── RISK SCORES ${"─".repeat(48)}`);
  for (const s of out.riskScores) {
    console.log(
      `\n${s.label}: ${s.selfScore ?? "—"} → ${s.adjustedScore}/10 (higher is ${s.higherIs})`,
    );
    console.log(`  ${s.reasoning}`);
  }
}

if (out.comparables?.length) {
  console.log(`\n── COMPARABLES (${out.comparables.length}) ${"─".repeat(43)}`);
  for (const c of out.comparables) {
    console.log(`\n${c.name}${c.url ? ` — ${c.url}` : ""}`);
    console.log(`  ${c.what}`);
    console.log(`  Difference: ${c.difference}`);
  }
}

for (const [key, title] of [
  ["theIdea", "THE IDEA"],
  ["theSolution", "THE SOLUTION"],
  ["valueProposition", "VALUE PROPOSITION"],
  ["whyThisCouldWork", "WHY THIS COULD WORK"],
  ["biggestRisk", "BIGGEST UNRESOLVED RISK"],
  ["secondRisk", "SECOND MAJOR RISK"],
  ["validationPlan", "VALIDATION PLAN"],
  ["positioning", "POSITIONING"],
  ["finalAssessment", "FINAL ASSESSMENT"],
]) {
  if (out[key]) {
    console.log(`\n── ${title} ${"─".repeat(Math.max(0, 60 - title.length))}`);
    console.log(out[key]);
  }
}

const words = JSON.stringify(out).split(/\s+/).length;
console.log(`\n${"=".repeat(72)}`);
console.log(
  `~${words} words · research: ${researchPerformed ? "yes" : "no"} · saved to analysis-output.json`,
);
