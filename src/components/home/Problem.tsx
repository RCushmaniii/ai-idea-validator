'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function Problem() {
  const { t } = useLanguage();

  return (
    <section className="bg-neutral-900 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            {t.home.problem.subtitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.home.problem.title}
          </h2>
        </div>

        {/* Points */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.home.problem.points.map((point, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-neutral-800 bg-neutral-900/50 p-8"
            >
              {/* Number */}
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-2 text-lg font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-4 text-neutral-400">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
