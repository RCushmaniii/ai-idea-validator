/**
 * The output contract for the idea analysis.
 *
 * This shape is the whole point of the rewrite. The previous version asked the
 * model for a JSON card with a rationale capped at "2-3 sentences" and a 1024
 * token ceiling — so no matter how good the model was, the tool could not
 * produce a real analysis. Most of what the results page showed was assembled
 * client-side from four slider values by string concatenation.
 *
 * Every narrative field below is Markdown written by the model from the
 * founder's own answers. Typed fields (verdict, scores, contradictions) stay
 * typed so the UI can rank, colour, and filter — but they sit alongside the
 * prose rather than replacing it.
 */

export type Verdict = "kill" | "flip" | "build" | "bet";
export type Language = "en" | "es";

/** One defensibility dimension: what they scored, what we scored, and why. */
export interface RiskScore {
  /** Stable key so the UI can match rows across renders. */
  key:
    | "copycat_risk"
    | "platform_risk"
    | "lock_in_strength"
    | "pricing_power"
    | "execution_risk"
    | "regulatory_risk";
  /** Human label, already localized. */
  label: string;
  /** 1-10, as the founder rated it. Null for dimensions they never scored. */
  selfScore: number | null;
  /** 1-10, re-derived by the model from what they actually described. */
  adjustedScore: number;
  /** Which direction is bad news, so the UI can colour it correctly. */
  higherIs: "worse" | "better";
  /** A paragraph explaining the adjusted score. Not a sentence fragment. */
  reasoning: string;
}

/**
 * A gap between what the founder rated and what their own words describe.
 * This is the highest-signal output of the whole assessment — optimism bias is
 * invisible from the inside, and the quote is what makes it undeniable.
 */
export interface Contradiction {
  /** Matches a RiskScore.key. */
  key: string;
  label: string;
  selfScore: number;
  adjustedScore: number;
  /** The founder's own sentence that contradicts their rating. Verbatim, but
   *  with transcription and grammar errors repaired — see GRAMMAR_REPAIR. */
  quote: string;
  /** Why the quote and the score cannot both be true. */
  issue: string;
}

/** A real product doing something close, found via web search. */
export interface Comparable {
  name: string;
  /** What it does and how it overlaps. */
  what: string;
  /** Where this idea is genuinely different — or "no meaningful difference". */
  difference: string;
  url: string | null;
}

export interface AnalysisResult {
  verdict: Verdict;
  /** 0-100. Paired with `uncertainty` — a number with no named risk is noise. */
  confidence: number;
  /** What the remaining (100 - confidence)% actually is. Specific, not "edge cases". */
  uncertainty: string;

  /** One line. The headline the founder reads first. */
  headline: string;

  /** Where this lands in the market. Categorization the founder didn't supply. */
  category: string;
  /** Who the buyer is, in the model's words after reading everything. */
  buyer: string;
  /** Price band the evidence supports, or an explicit "not enough signal". */
  priceBand: string;

  // ── Narrative sections (Markdown) ─────────────────────────────────────────
  /** The idea restated concretely — city, headcount, price, specifics. */
  theIdea: string;
  /** What the product actually is, phased if the phasing matters. */
  theSolution: string;
  /** The outcome the buyer is paying for, not the feature list. */
  valueProposition: string;
  /** Why this could work. The honest bull case. */
  whyThisCouldWork: string;
  /** The single biggest unresolved risk, and why the obvious validation is wrong. */
  biggestRisk: string;
  /** A second, independent risk with concrete failure modes. */
  secondRisk: string;
  /** How to validate before building. Specific and measurable. */
  validationPlan: string;
  /** 2-3 positioning options with real copy, plus a recommendation. */
  positioning: string;
  /** Final call: the sequence, and what NOT to invest in yet. */
  finalAssessment: string;

  riskScores: RiskScore[];
  contradictions: Contradiction[];
  comparables: Comparable[];

  /** Provenance, so the UI never presents a degraded run as a full one. */
  meta: {
    model: string;
    /** False when web search returned nothing usable. */
    researchPerformed: boolean;
    language: Language;
    generatedAt: string;
  };
}

/**
 * Shared instruction for echoing the founder's words back.
 *
 * Robert used voice-to-text and got his own transcription errors quoted back at
 * him verbatim. Repairing mechanics is not editorializing; changing substance
 * is. The distinction matters enough to state explicitly, because "quote them
 * exactly" and "don't hand me back my own typos" pull in opposite directions.
 */
export const GRAMMAR_REPAIR = `When you quote the founder, repair the mechanics and preserve the substance.

Fix: grammar, punctuation, capitalization, and obvious speech-to-text errors
(homophones, dropped words, run-on dictation, mangled proper nouns you can infer
from context).

Never change: meaning, emphasis, hedges, or qualifiers. "I think maybe" is not
"I believe" — the uncertainty is signal. Do not upgrade tentative language into
confident language, or the contradiction analysis becomes worthless.

If a sentence is too garbled to repair without guessing what they meant, quote
the readable part and say plainly that the rest was unclear. Never invent a
sentence they did not say.`;

/** Mexican Professional Spanish. Iberian markers damage credibility in this market. */
export const ES_MX_INSTRUCTION = `Write all Spanish output in Mexican Professional Spanish (es-MX) for a
Mexico-based corporate audience.

Use "ustedes" for all plural (never "vosotros"). Use: celular (not móvil),
computadora (not ordenador), carro/auto (not coche), manejar (not conducir),
estacionar (not aparcar), lentes (not gafas), rentar (not alquilar),
tomar/agarrar (never "coger", which is vulgar in Mexico).

Prefer simple past over present perfect for recent actions. No Spain slang
(vale, tío, guay, chaval). Direct object pronouns are lo/la, never leísmo.

The test: would a Mexican corporate executive say this naturally to a peer?`;
