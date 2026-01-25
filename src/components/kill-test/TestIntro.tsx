'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useKillTest } from '@/contexts/KillTestContext';

export function TestIntro() {
  const { t } = useLanguage();
  const { startTest } = useKillTest();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-12">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-orange-600 dark:text-orange-500"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {t.killTest.title}
            </h1>
            <p className="mt-2 text-lg text-orange-600 dark:text-orange-500">
              {t.killTest.subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {t.killTest.intro.title}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              {t.killTest.intro.description}
            </p>

            {/* Warning */}
            <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-5 w-5 shrink-0 text-orange-600 dark:text-orange-500"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                  {t.killTest.intro.warning}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={startTest}
              className="w-full rounded-lg bg-orange-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {t.killTest.intro.start}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 inline-block h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
