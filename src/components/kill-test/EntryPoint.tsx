'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface EntryPointProps {
  onSelectGuided: () => void;
  onSelectJson: () => void;
}

export function EntryPoint({ onSelectGuided, onSelectJson }: EntryPointProps) {
  const { language } = useLanguage();

  const t = {
    en: {
      title: 'Choose Your Path',
      subtitle: 'Two ways to test your idea',
      guided: {
        title: 'Guided Assessment',
        badge: 'Recommended',
        description: 'Answer 24 carefully designed questions one at a time. Best for first-time users and structured thinking.',
        cta: 'Start Guided Test',
        features: ['Step-by-step flow', 'Helper tooltips', 'Progress tracking'],
      },
      json: {
        title: 'Upload JSON',
        badge: 'Advanced',
        description: 'Already analyzed your idea with AI? Upload a structured JSON file for instant analysis.',
        cta: 'Upload JSON',
        features: ['For AI-assisted workflows', 'Bulk analysis', 'Reproducible results'],
      },
    },
    es: {
      title: 'Elige Tu Camino',
      subtitle: 'Dos formas de probar tu idea',
      guided: {
        title: 'Evaluacion Guiada',
        badge: 'Recomendado',
        description: 'Responde 24 preguntas cuidadosamente disenadas una a la vez. Ideal para nuevos usuarios y pensamiento estructurado.',
        cta: 'Iniciar Test Guiado',
        features: ['Flujo paso a paso', 'Tooltips de ayuda', 'Seguimiento de progreso'],
      },
      json: {
        title: 'Subir JSON',
        badge: 'Avanzado',
        description: 'Ya analizaste tu idea con IA? Sube un archivo JSON estructurado para analisis instantaneo.',
        cta: 'Subir JSON',
        features: ['Para flujos con IA', 'Analisis en lote', 'Resultados reproducibles'],
      },
    },
  };

  const text = t[language];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
          {text.subtitle}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          {text.title}
        </h1>
      </div>

      {/* Options */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Guided Option */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-orange-500 bg-white p-8 shadow-lg dark:bg-neutral-900">
          {/* Badge */}
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
              {text.guided.badge}
            </span>
          </div>

          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            {text.guided.title}
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            {text.guided.description}
          </p>

          {/* Features */}
          <ul className="mt-6 space-y-2">
            {text.guided.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={onSelectGuided}
            className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-all hover:bg-orange-500"
          >
            {text.guided.cta}
          </button>
        </div>

        {/* JSON Option */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          {/* Badge */}
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              {text.json.badge}
            </span>
          </div>

          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            {text.json.title}
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            {text.json.description}
          </p>

          {/* Features */}
          <ul className="mt-6 space-y-2">
            {text.json.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-neutral-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={onSelectJson}
            className="mt-8 w-full rounded-lg border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {text.json.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
