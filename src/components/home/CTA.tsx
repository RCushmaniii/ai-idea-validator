'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-neutral-900 dark:bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Gradient accents */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.home.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-300">
            {t.home.cta.description}
          </p>

          <div className="mt-10">
            <Link
              href="/kill-test"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-500 hover:shadow-orange-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {t.home.cta.button}
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
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            {t.home.cta.note}
          </p>
        </div>
      </div>
    </section>
  );
}
