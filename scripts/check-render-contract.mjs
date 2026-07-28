/**
 * Verify the real analysis output satisfies every field AnalysisReport reads.
 *
 *   node scripts/check-render-contract.mjs [analysis-output.json]
 *
 * The schema and the component were written separately. A field the model never
 * returns renders as a blank section — visible to the user, invisible to tsc and
 * to the build. This closes that gap with real data.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const file = process.argv[2] || join(REPO, "analysis-output.json");
const out = JSON.parse(readFileSync(file, "utf8"));

let fail = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "OK  " : "FAIL"}  ${msg}`);
  if (!cond) fail++;
};

// Scalars the header renders.
for (const f of [
  "verdict",
  "confidence",
  "uncertainty",
  "headline",
  "category",
  "buyer",
  "priceBand",
]) {
  const v = out[f];
  ok(
    v !== undefined && v !== null && v !== "",
    `${f} present${typeof v === "string" ? ` (${v.length} chars)` : ` (${v})`}`,
  );
}

ok(
  ["kill", "flip", "build", "bet"].includes(out.verdict),
  `verdict is a known value: ${out.verdict}`,
);
ok(
  Number.isFinite(out.confidence) &&
    out.confidence >= 0 &&
    out.confidence <= 100,
  `confidence in range: ${out.confidence}`,
);

// The nine Markdown sections.
const SECTIONS = [
  "theIdea",
  "theSolution",
  "valueProposition",
  "whyThisCouldWork",
  "biggestRisk",
  "secondRisk",
  "validationPlan",
  "positioning",
  "finalAssessment",
];
console.log("\n── narrative sections ──");
for (const f of SECTIONS) {
  const v = out[f];
  const words = typeof v === "string" ? v.trim().split(/\s+/).length : 0;
  ok(
    words >= 40,
    `${f}: ${words} words${words < 40 ? " — too thin, would look empty" : ""}`,
  );
}

// Arrays and their per-item fields.
console.log("\n── risk scores ──");
ok(
  Array.isArray(out.riskScores) && out.riskScores.length > 0,
  `riskScores: ${out.riskScores?.length ?? 0} rows`,
);
for (const s of out.riskScores ?? []) {
  const good =
    typeof s.label === "string" &&
    s.label &&
    Number.isFinite(s.adjustedScore) &&
    (s.selfScore === null || Number.isFinite(s.selfScore)) &&
    ["worse", "better"].includes(s.higherIs) &&
    typeof s.reasoning === "string" &&
    s.reasoning.length > 40;
  ok(
    good,
    `  ${s.label ?? "(no label)"} — self ${s.selfScore ?? "null"} → ${s.adjustedScore}, higherIs "${s.higherIs}", ${s.reasoning?.length ?? 0} chars`,
  );
}

console.log("\n── contradictions ──");
ok(
  Array.isArray(out.contradictions),
  `contradictions is an array (${out.contradictions?.length ?? 0})`,
);
for (const c of out.contradictions ?? []) {
  const good =
    typeof c.label === "string" &&
    c.label &&
    Number.isFinite(c.selfScore) &&
    Number.isFinite(c.adjustedScore) &&
    typeof c.quote === "string" &&
    c.quote.length > 10 &&
    typeof c.issue === "string" &&
    c.issue.length > 20;
  ok(
    good,
    `  ${c.label ?? "(no label)"} — ${c.selfScore}→${c.adjustedScore}, quote ${c.quote?.length ?? 0} chars`,
  );
  // The gap must be real, or the contradiction is noise.
  ok(
    Math.abs(c.adjustedScore - c.selfScore) >= 2,
    `    gap is >= 2 points (${Math.abs(c.adjustedScore - c.selfScore)})`,
  );
}

console.log("\n── comparables ──");
ok(
  Array.isArray(out.comparables),
  `comparables is an array (${out.comparables?.length ?? 0})`,
);
for (const c of out.comparables ?? []) {
  const good =
    typeof c.name === "string" &&
    c.name &&
    typeof c.what === "string" &&
    typeof c.difference === "string";
  ok(good, `  ${c.name ?? "(no name)"}${c.url ? " (has url)" : " (no url)"}`);
  if (c.url)
    ok(
      /^https?:\/\//.test(c.url),
      `    url is absolute: ${c.url.slice(0, 60)}`,
    );
}

console.log("\n── meta ──");
ok(
  out.meta && typeof out.meta.model === "string",
  `meta.model: ${out.meta?.model}`,
);
ok(
  out.meta && typeof out.meta.researchPerformed === "boolean",
  `meta.researchPerformed: ${out.meta?.researchPerformed}`,
);

// Any key the model returned that the component ignores, and vice versa.
const componentReads = new Set([
  ...SECTIONS,
  "verdict",
  "confidence",
  "uncertainty",
  "headline",
  "category",
  "buyer",
  "priceBand",
  "riskScores",
  "contradictions",
  "comparables",
  "meta",
]);
const extra = Object.keys(out).filter((k) => !componentReads.has(k));
if (extra.length)
  console.log(
    `\nNOTE: model returned fields the UI ignores: ${extra.join(", ")}`,
  );

console.log(
  `\n${fail === 0 ? "RENDER CONTRACT OK — every field the UI reads is present and substantive." : `${fail} PROBLEM(S) — these would render blank or wrong.`}`,
);
process.exit(fail === 0 ? 0 : 1);
