'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 dark:border-orange-900/50 dark:bg-orange-950/50">
            <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
              {t.home.hero.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
            {t.home.hero.title}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            {t.home.hero.description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/kill-test"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {t.home.hero.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {t.home.hero.secondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
    </section>
  );
}
