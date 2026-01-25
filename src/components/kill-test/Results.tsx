'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKillTest, Verdict } from '@/contexts/KillTestContext';

// Info Tooltip Component
function InfoTooltip({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
        aria-label="More information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-neutral-200 bg-white p-3 text-sm text-neutral-600 shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          {content}
        </div>
      )}
    </div>
  );
}

const verdictColors: Record<Verdict, { bg: string; border: string; text: string }> = {
  kill: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-900/50',
    text: 'text-red-700 dark:text-red-400',
  },
  pivot: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-900/50',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  build: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-900/50',
    text: 'text-green-700 dark:text-green-400',
  },
  bet: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-900/50',
    text: 'text-orange-700 dark:text-orange-400',
  },
};

const verdictLabels: Record<Verdict, { en: string; es: string }> = {
  kill: { en: 'Stop here.', es: 'Detente aqui.' },
  pivot: { en: 'Consider a pivot.', es: 'Considera un pivote.' },
  build: { en: 'You should build this!', es: 'Deberias construir esto!' },
  bet: { en: 'A calculated risk.', es: 'Un riesgo calculado.' },
};

const signalLabels: Record<string, { en: string; es: string }> = {
  copycatRisk: { en: 'Copycat Risk', es: 'Riesgo de Copia' },
  platformRisk: { en: 'Platform Risk', es: 'Riesgo de Plataforma' },
  lockInStrength: { en: 'Lock-in Strength', es: 'Fuerza de Lock-in' },
  pricingPower: { en: 'Pricing Power', es: 'Poder de Precios' },
};

const signalExplanations: Record<string, { en: string; es: string }> = {
  copycatRisk: {
    en: 'How easily competitors can replicate your core offering. Lower is better - a score of 4/10 means relatively low risk of being copied quickly.',
    es: 'Que tan facil pueden los competidores replicar tu oferta principal. Menor es mejor - 4/10 significa riesgo relativamente bajo de ser copiado rapidamente.',
  },
  platformRisk: {
    en: 'Your dependency on third-party platforms (APIs, app stores, etc). Lower is better - high scores mean a platform change could break your business.',
    es: 'Tu dependencia de plataformas de terceros (APIs, tiendas de apps, etc). Menor es mejor - puntuaciones altas significan que un cambio de plataforma podria romper tu negocio.',
  },
  lockInStrength: {
    en: 'How hard it is for customers to switch away from your product. Higher is better - strong lock-in means customers stay even when competitors appear.',
    es: 'Que tan dificil es para los clientes cambiar de tu producto. Mayor es mejor - fuerte lock-in significa que los clientes se quedan incluso cuando aparecen competidores.',
  },
  pricingPower: {
    en: 'Your ability to charge premium prices and resist price pressure. Higher is better - strong pricing power means sustainable margins.',
    es: 'Tu capacidad de cobrar precios premium y resistir presion de precios. Mayor es mejor - fuerte poder de precios significa margenes sostenibles.',
  },
};

const weakSignalReasons: Record<string, { en: string; es: string }> = {
  copycatRisk: {
    en: 'Marked weak because competitors could replicate your core value proposition quickly, reducing your competitive advantage.',
    es: 'Marcado debil porque los competidores podrian replicar tu propuesta de valor rapidamente, reduciendo tu ventaja competitiva.',
  },
  platformRisk: {
    en: 'Marked weak because heavy reliance on external platforms creates existential risk if those platforms change terms or access.',
    es: 'Marcado debil porque la fuerte dependencia de plataformas externas crea riesgo existencial si esas plataformas cambian terminos o acceso.',
  },
  lockInStrength: {
    en: 'Marked weak because customers can easily switch to alternatives, making retention difficult when competitors emerge.',
    es: 'Marcado debil porque los clientes pueden cambiar facilmente a alternativas, dificultando la retencion cuando aparecen competidores.',
  },
  pricingPower: {
    en: 'Marked weak because you may struggle to maintain margins under competitive pressure or have to compete primarily on price.',
    es: 'Marcado debil porque puedes tener dificultades para mantener margenes bajo presion competitiva o tener que competir principalmente en precio.',
  },
};

const pivotTypeLabels: Record<string, { en: string; es: string }> = {
  lockIn: { en: 'Strengthen Lock-in', es: 'Fortalecer Lock-in' },
  niche: { en: 'Focus Niche', es: 'Enfocarse en Nicho' },
  value: { en: 'Restructure Value', es: 'Reestructurar Valor' },
  platform: { en: 'Reduce Platform Risk', es: 'Reducir Riesgo de Plataforma' },
};

const sectionExplanations = {
  riskScores: {
    en: 'These four metrics measure key defensibility factors. Risk scores (Copycat, Platform) are better when low. Strength scores (Lock-in, Pricing Power) are better when high.',
    es: 'Estas cuatro metricas miden factores clave de defensibilidad. Los puntajes de riesgo (Copia, Plataforma) son mejores cuando son bajos. Los puntajes de fuerza (Lock-in, Poder de Precios) son mejores cuando son altos.',
  },
  weakSignals: {
    en: 'These are areas where your idea shows vulnerability. Each weak signal compounds the others - multiple weak signals together create much higher overall risk.',
    es: 'Estas son areas donde tu idea muestra vulnerabilidad. Cada senal debil se combina con las otras - multiples senales debiles juntas crean un riesgo general mucho mayor.',
  },
  pivotSuggestions: {
    en: 'Based on your weak signals, these are strategic pivots that could strengthen your defensibility before you invest more time and resources.',
    es: 'Basado en tus senales debiles, estos son pivotes estrategicos que podrian fortalecer tu defensibilidad antes de que inviertas mas tiempo y recursos.',
  },
  biggestRisk: {
    en: 'This is the risk you identified as most likely to cause failure. Keep this top of mind - it should inform your early validation priorities.',
    es: 'Este es el riesgo que identificaste como mas probable de causar fracaso. Tenlo presente - deberia informar tus prioridades de validacion temprana.',
  },
};

export function Results() {
  const { t, language } = useLanguage();
  const { result, resetTest, answers } = useKillTest();
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const verdictT = t.results.verdicts[result.verdict];
  const colors = verdictColors[result.verdict];
  const verdictLabel = verdictLabels[result.verdict][language];

  // Get weak signals (sorted by severity)
  const weakSignals = result.weakSignals.filter(s => s.isWeak);

  // Helper to get risk level label
  const getRiskLevel = (score: number, isInverted: boolean) => {
    if (isInverted) {
      // For lock-in and pricing power (higher is better)
      if (score >= 7) return language === 'en' ? 'Strong' : 'Fuerte';
      if (score >= 4) return language === 'en' ? 'Moderate' : 'Moderado';
      return language === 'en' ? 'Weak' : 'Debil';
    } else {
      // For copycat and platform risk (lower is better)
      if (score <= 3) return language === 'en' ? 'Low Risk' : 'Bajo Riesgo';
      if (score <= 6) return language === 'en' ? 'Moderate' : 'Moderado';
      return language === 'en' ? 'High Risk' : 'Alto Riesgo';
    }
  };

  const copyResults = async () => {
    const ideaDescription = answers.ideaDefinition || '';
    const biggestRisk = answers.biggestUnresolvedRisk || '';

    const text = `
${verdictLabel}
${t.results.title}: ${verdictT.title} ${verdictT.emoji}

${t.results.ideaSummary}: ${ideaDescription}

${verdictT.description}

${t.results.scores.title}:
- ${t.results.scores.copycatRisk}: ${result.scores.copycatRisk}/10
- ${t.results.scores.platformRisk}: ${result.scores.platformRisk}/10
- ${t.results.scores.lockInStrength}: ${result.scores.lockInStrength}/10
- ${t.results.scores.pricingPower}: ${result.scores.pricingPower}/10

${result.compoundingStory}

${t.results.biggestRisk}: ${biggestRisk}

---
Generated by AI Idea Validator
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Verdict Card */}
        <div
          className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 text-center sm:p-12`}
        >
          <span className="text-6xl">{verdictT.emoji}</span>
          <p className="mt-4 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
            {verdictLabel}
          </p>
          <h1 className={`mt-2 text-4xl font-bold tracking-tight ${colors.text} sm:text-5xl`}>
            {verdictT.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
            {verdictT.description}
          </p>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-6">
          {/* Risk Scores */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-start justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-orange-500"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
                {t.results.scores.title}
              </h2>
              <InfoTooltip content={sectionExplanations.riskScores[language]} />
            </div>
            <div className="mt-4 space-y-4">
              {/* Copycat Risk */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {t.results.scores.copycatRisk}
                    </span>
                    <InfoTooltip content={signalExplanations.copycatRisk[language]} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${result.scores.copycatRisk <= 3 ? 'text-green-600 dark:text-green-400' : result.scores.copycatRisk <= 6 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getRiskLevel(result.scores.copycatRisk, false)}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {result.scores.copycatRisk}/10
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`h-full rounded-full ${result.scores.copycatRisk >= 7 ? 'bg-red-500' : result.scores.copycatRisk >= 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${result.scores.copycatRisk * 10}%` }}
                  />
                </div>
              </div>
              {/* Platform Risk */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {t.results.scores.platformRisk}
                    </span>
                    <InfoTooltip content={signalExplanations.platformRisk[language]} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${result.scores.platformRisk <= 3 ? 'text-green-600 dark:text-green-400' : result.scores.platformRisk <= 6 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getRiskLevel(result.scores.platformRisk, false)}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {result.scores.platformRisk}/10
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`h-full rounded-full ${result.scores.platformRisk >= 7 ? 'bg-red-500' : result.scores.platformRisk >= 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${result.scores.platformRisk * 10}%` }}
                  />
                </div>
              </div>
              {/* Lock-in Strength (inverted - higher is better) */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {t.results.scores.lockInStrength}
                    </span>
                    <InfoTooltip content={signalExplanations.lockInStrength[language]} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${result.scores.lockInStrength >= 7 ? 'text-green-600 dark:text-green-400' : result.scores.lockInStrength >= 4 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getRiskLevel(result.scores.lockInStrength, true)}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {result.scores.lockInStrength}/10
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`h-full rounded-full ${result.scores.lockInStrength <= 3 ? 'bg-red-500' : result.scores.lockInStrength <= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${result.scores.lockInStrength * 10}%` }}
                  />
                </div>
              </div>
              {/* Pricing Power (higher is better) */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {t.results.scores.pricingPower}
                    </span>
                    <InfoTooltip content={signalExplanations.pricingPower[language]} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${result.scores.pricingPower >= 7 ? 'text-green-600 dark:text-green-400' : result.scores.pricingPower >= 4 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getRiskLevel(result.scores.pricingPower, true)}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {result.scores.pricingPower}/10
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`h-full rounded-full ${result.scores.pricingPower <= 3 ? 'bg-red-500' : result.scores.pricingPower <= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${result.scores.pricingPower * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Weak Signals */}
          {weakSignals.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-red-500"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {language === 'en' ? 'Weak Signals' : 'Senales Debiles'}
                </h2>
                <InfoTooltip content={sectionExplanations.weakSignals[language]} />
              </div>
              <ul className="mt-4 space-y-3">
                {weakSignals.map((signal) => (
                  <li
                    key={signal.id}
                    className="rounded-lg bg-red-50 p-3 dark:bg-red-950/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {signalLabels[signal.id]?.[language] || signal.id}
                      </span>
                      <span className="text-sm text-neutral-500">
                        ({signal.score}/{signal.maxScore})
                      </span>
                      <InfoTooltip content={weakSignalReasons[signal.id]?.[language] || ''} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Compounding Story */}
          {result.compoundingStory && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-blue-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                {language === 'en' ? 'Why This Matters' : 'Por Que Importa'}
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                {result.compoundingStory}
              </p>
            </div>
          )}

          {/* Pivot Suggestions */}
          {result.pivotSuggestions.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-green-500"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  {language === 'en' ? 'Pivot Suggestions' : 'Sugerencias de Pivote'}
                </h2>
                <InfoTooltip content={sectionExplanations.pivotSuggestions[language]} />
              </div>
              <ul className="mt-4 space-y-4">
                {result.pivotSuggestions.map((pivot, index) => (
                  <li key={index} className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-950/20">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      {pivotTypeLabels[pivot.type]?.[language] || pivot.type}
                    </span>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      {pivot.suggestion}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Biggest Unresolved Risk */}
          {answers.biggestUnresolvedRisk && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-orange-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {t.results.biggestRisk}
                </h2>
                <InfoTooltip content={sectionExplanations.biggestRisk[language]} />
              </div>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                {answers.biggestUnresolvedRisk as string}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={resetTest}
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-all hover:bg-orange-500"
          >
            {t.results.actions.startOver}
          </button>
          <button
            onClick={copyResults}
            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {copied ? t.results.actions.copied : t.results.actions.copyResults}
            {!copied && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-500">
          {t.results.note}
        </p>
      </div>
    </div>
  );
}
