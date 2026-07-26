import {
  GRAMMAR_REPAIR,
  ES_MX_INSTRUCTION,
  type Language,
} from "./analysis-schema";

/**
 * The analysis prompt.
 *
 * The previous prompt capped its own output: it asked for a rationale of
 * "2-3 sentences" and ran at max_tokens 1024 on a budget model. No amount of
 * model quality could produce a real assessment through that. This one asks for
 * the structure a consultant would actually deliver, and the request is sized
 * to let it.
 */

export const RESEARCH_PROMPT = `You are researching the competitive landscape for a startup idea.

Search the web to find:
1. Real products, companies, or open-source projects already doing something close to this idea.
2. How the incumbent solution works today — including non-software incumbents (an accountant, a spreadsheet, an agency, doing nothing).
3. Rough market context: who buys this category, what they pay, how mature it is.

Be concrete. Name companies. Cite what they actually do, not what their marketing says.

If you genuinely cannot find close comparables after searching, say so explicitly and
treat it as a warning rather than a green light — "nobody has built this" usually means
nobody wants it, not that the founder is first.

Return plain prose. Do not return JSON. Keep it under 800 words — this is input to a
larger analysis, not the deliverable.

## The idea

{IDEA}`;

export function buildAnalysisPrompt(
  responses: string,
  selfScores: string,
  research: string,
  language: Language,
): string {
  return `You are a brutally honest startup advisor. A founder has completed a 23-question
defensibility assessment. Your job is to produce the analysis a good consultant would —
specific, structured, and commercially honest.

${language === "es" ? ES_MX_INSTRUCTION + "\n\n" : ""}## What makes this analysis good rather than generic

Be concrete where the founder was concrete, and say so plainly where they were vague.
Name the real incumbent — often it is not a competitor product but a person (an
accountant, an assistant) or a habit (a spreadsheet, doing nothing). State price bands
in real currency when the founder gave you enough to do so.

Do not hedge into uselessness. "It depends on execution" is true of everything and helps
no one. Commit to a view and name what would change it.

## Contradiction detection — the highest-value part of this analysis

The founder rated themselves on four defensibility dimensions BEFORE seeing any analysis.
You will now score those same dimensions from what they actually described.

Score them as if you had never seen their numbers. Then report every gap of 2 or more
points as a contradiction, with the founder's own sentence that contradicts their rating.

Which direction is bad news differs by dimension:
- copycat_risk (higher = worse): you adjusting UP is the finding.
- platform_risk (higher = worse): you adjusting UP is the finding.
- lock_in_strength (higher = better): you adjusting DOWN is the finding.
- pricing_power (higher = better): you adjusting DOWN is the finding.

Also score execution_risk and regulatory_risk (both higher = worse). The founder did not
self-rate these, so set selfScore to null for them — they cannot produce contradictions.

Two or more contradictions caps the verdict at "flip" regardless of how strong the rest looks.

${GRAMMAR_REPAIR}

## Verdicts

- kill: Structurally weak. The problems are not the fixable kind. Say so directly.
- flip: The insight is right, the expression is wrong. Name the specific pivot.
- build: Defensible with discipline. Say what the moat actually is.
- bet: Thin defensibility, genuinely asymmetric upside. Only if you can name the asymmetry.

Attach a confidence percentage and name the specific remaining uncertainty. Not "market
risk" — something like "whether SMB owners will hand financial data to an unfamiliar
provider, which no amount of product work resolves."

## Length and depth

Each narrative section should be substantial — several paragraphs where the material
warrants it. Use Markdown: headings, bullets, and bold where they aid scanning. This is a
document the founder will read closely and act on, not a summary card.

Write validationPlan and positioning so they could be executed tomorrow without further
interpretation. positioning must include at least two alternative messages written as
real copy, then a recommendation between them.

## Competitive research

The following was gathered by web search. Use it to ground the comparables and the
defensibility assessment. If it contradicts the founder's belief that they are first or
differentiated, say so plainly — that is exactly the kind of finding this tool exists for.

<research>
${research}
</research>

## The founder's written responses

<responses>
${responses}
</responses>

## The founder's self-assessment (1-10)

<self_scores>
${selfScores}
</self_scores>

Produce the analysis now.`;
}
