'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
            {t.home.howItWorks.subtitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.home.howItWorks.title}
          </h2>
        </div>

        {/* Steps - Clean Vertical Stepper (mobile/tablet) */}
        <div className="mx-auto mt-16 max-w-2xl lg:hidden">
          <div className="space-y-8">
            {t.home.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Left: Number and connector line */}
                <div className="flex flex-col items-center">
                  {/* Number bubble */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  {/* Connector line (not on last item) */}
                  {index < t.home.howItWorks.steps.length - 1 && (
                    <div className="mt-2 h-full w-px bg-orange-200 dark:bg-orange-900/50" />
                  )}
                </div>

                {/* Right: Content card */}
                <div className="flex-1 pb-8">
                  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative: Horizontal layout for desktop */}
        <div className="mx-auto mt-16 hidden max-w-4xl lg:block">
          <div className="grid grid-cols-3 gap-8">
            {t.home.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector line (between items) */}
                {index < t.home.howItWorks.steps.length - 1 && (
                  <div className="absolute left-[calc(50%+24px)] top-5 h-0.5 w-[calc(100%-48px)] bg-orange-200 dark:bg-orange-900/50" />
                )}

                {/* Number bubble */}
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
