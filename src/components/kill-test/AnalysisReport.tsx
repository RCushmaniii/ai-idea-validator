"use client";

import ReactMarkdown from "react-markdown";
import type {
  AnalysisResult,
  Contradiction,
  RiskScore,
} from "@/lib/analysis-schema";

/**
 * Renders the Opus 5 analysis.
 *
 * The previous results page showed two large narrative sections that were
 * assembled client-side from four slider values by string concatenation. Every
 * section here is model output derived from the founder's written answers —
 * nothing on this page is generated locally.
 */

const VERDICT_STYLE: Record<
  AnalysisResult["verdict"],
  { chip: string; ring: string; label: string; labelEs: string }
> = {
  kill: {
    chip: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
    ring: "border-red-200 dark:border-red-900/50",
    label: "Kill",
    labelEs: "Descartar",
  },
  flip: {
    chip: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300",
    ring: "border-yellow-200 dark:border-yellow-900/50",
    label: "Flip",
    labelEs: "Replantear",
  },
  build: {
    chip: "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
    ring: "border-green-200 dark:border-green-900/50",
    label: "Build",
    labelEs: "Construir",
  },
  bet: {
    chip: "bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-300",
    ring: "border-orange-200 dark:border-orange-900/50",
    label: "Bet",
    labelEs: "Apostar",
  },
};

/** Shared prose styling so every Markdown section reads as one document. */
function Prose({ children }: { children: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert
                 prose-headings:font-semibold prose-headings:tracking-tight
                 prose-p:leading-relaxed prose-li:leading-relaxed
                 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100"
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

function Section({ title, body }: { title: string; body?: string }) {
  if (!body?.trim()) return null;
  return (
    <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h2>
      <Prose>{body}</Prose>
    </section>
  );
}

/**
 * A score row. Direction matters: for a risk dimension a higher adjusted score
 * is bad news, for a strength dimension a lower one is. Colouring them the same
 * way would invert the meaning on half the rows.
 */
function ScoreRow({ score, es }: { score: RiskScore; es: boolean }) {
  const gap =
    score.selfScore === null ? 0 : score.adjustedScore - score.selfScore;
  const badNews = score.higherIs === "worse" ? gap >= 2 : gap <= -2;

  return (
    <div className="border-t border-neutral-200 py-4 first:border-t-0 dark:border-neutral-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-medium text-neutral-900 dark:text-white">
          {score.label}
        </h3>
        <div className="flex items-center gap-3 text-sm">
          {score.selfScore !== null && (
            <span className="text-neutral-500 dark:text-neutral-400">
              {es ? "Tu puntaje" : "You rated"}{" "}
              <strong className="tabular-nums">{score.selfScore}</strong>/10
            </span>
          )}
          <span
            className={
              badNews
                ? "rounded px-2 py-0.5 font-semibold tabular-nums text-red-700 ring-1 ring-red-300 dark:text-red-300 dark:ring-red-900"
                : "font-semibold tabular-nums text-neutral-900 dark:text-white"
            }
          >
            {es ? "Ajustado" : "Adjusted"} {score.adjustedScore}/10
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {score.reasoning}
      </p>
    </div>
  );
}

function ContradictionCard({ c, es }: { c: Contradiction; es: boolean }) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-medium text-amber-900 dark:text-amber-200">
          {c.label}
        </h3>
        <span className="text-sm tabular-nums text-amber-800 dark:text-amber-300">
          {es ? "Tú" : "You"} {c.selfScore}/10 → {es ? "ajustado" : "adjusted"}{" "}
          {c.adjustedScore}/10
        </span>
      </div>
      <blockquote className="mt-3 border-l-2 border-amber-400 pl-3 text-sm italic text-amber-900 dark:border-amber-700 dark:text-amber-200">
        “{c.quote}”
      </blockquote>
      <p className="mt-3 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
        {c.issue}
      </p>
    </div>
  );
}

export default function AnalysisReport({
  analysis,
  language,
}: {
  analysis: AnalysisResult;
  language: "en" | "es";
}) {
  const es = language === "es";
  const v = VERDICT_STYLE[analysis.verdict] ?? VERDICT_STYLE.bet;
  const t = (en: string, esText: string) => (es ? esText : en);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Verdict */}
      <header className={`rounded-xl border p-6 ${v.ring}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${v.chip}`}
          >
            {es ? v.labelEs : v.label}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("Confidence", "Confianza")}{" "}
            <strong className="tabular-nums">{analysis.confidence}%</strong>
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
          {analysis.headline}
        </h1>

        {analysis.uncertainty && (
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <strong>
              {t(
                `The remaining ${100 - analysis.confidence}%:`,
                `El ${100 - analysis.confidence}% restante:`,
              )}
            </strong>{" "}
            {analysis.uncertainty}
          </p>
        )}

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            [t("Category", "Categoría"), analysis.category],
            [t("Buyer", "Comprador"), analysis.buyer],
            [t("Price band", "Rango de precio"), analysis.priceBand],
          ].map(([label, value]) =>
            value ? (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
                  {value}
                </dd>
              </div>
            ) : null,
          )}
        </dl>
      </header>

      {/* Contradictions — the highest-signal output, so it sits above the prose. */}
      {analysis.contradictions.length > 0 && (
        <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {t(
              "Where your scores and your answers disagree",
              "Dónde tus puntajes y tus respuestas no coinciden",
            )}
          </h2>
          <p className="mb-4 mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            {t(
              "You rated these before seeing any analysis. These are the gaps between what you scored and what you described.",
              "Calificaste esto antes de ver cualquier análisis. Estas son las diferencias entre lo que puntuaste y lo que describiste.",
            )}
          </p>
          <div className="space-y-3">
            {analysis.contradictions.map((c, i) => (
              <ContradictionCard key={`${c.key}-${i}`} c={c} es={es} />
            ))}
          </div>
        </section>
      )}

      <Section title={t("The idea", "La idea")} body={analysis.theIdea} />
      <Section
        title={t("The solution", "La solución")}
        body={analysis.theSolution}
      />
      <Section
        title={t("Value proposition", "Propuesta de valor")}
        body={analysis.valueProposition}
      />
      <Section
        title={t("Why this could work", "Por qué esto podría funcionar")}
        body={analysis.whyThisCouldWork}
      />

      {/* Risk scores */}
      {analysis.riskScores.length > 0 && (
        <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {t("Risk assessment", "Evaluación de riesgo")}
          </h2>
          <div>
            {analysis.riskScores.map((s) => (
              <ScoreRow key={s.key} score={s} es={es} />
            ))}
          </div>
        </section>
      )}

      <Section
        title={t("The biggest unresolved risk", "El mayor riesgo sin resolver")}
        body={analysis.biggestRisk}
      />
      <Section
        title={t("Second major risk", "Segundo riesgo importante")}
        body={analysis.secondRisk}
      />

      {/* Comparables */}
      {analysis.comparables.length > 0 && (
        <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {t(
              "Who already does something like this",
              "Quién ya hace algo parecido",
            )}
          </h2>
          {!analysis.meta?.researchPerformed && (
            <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
              {t(
                "Web research was unavailable for this run — these come from the model's own knowledge and may be incomplete.",
                "La búsqueda web no estuvo disponible en este análisis — esto proviene del conocimiento del modelo y puede estar incompleto.",
              )}
            </p>
          )}
          <div className="mt-4 space-y-4">
            {analysis.comparables.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <h3 className="font-medium text-neutral-900 dark:text-white">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600 dark:decoration-neutral-600"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {c.what}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-900 dark:text-neutral-100">
                  <strong>{t("Difference:", "Diferencia:")}</strong>{" "}
                  {c.difference}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Section
        title={t("How to validate this", "Cómo validar esto")}
        body={analysis.validationPlan}
      />
      <Section
        title={t("Positioning", "Posicionamiento")}
        body={analysis.positioning}
      />
      <Section
        title={t("Final assessment", "Evaluación final")}
        body={analysis.finalAssessment}
      />

      {analysis.meta && (
        <footer className="border-t border-neutral-200 pt-6 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
          {analysis.meta.model}
          {analysis.meta.researchPerformed
            ? t(" · with web research", " · con investigación web")
            : t(" · without web research", " · sin investigación web")}
        </footer>
      )}
    </div>
  );
}
