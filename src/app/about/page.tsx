'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
              {t.about.subtitle}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              {t.about.title}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              {t.about.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {t.about.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy */}
          <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {t.about.philosophy.title}
            </h2>
            <ul className="mt-6 space-y-4">
              {t.about.philosophy.points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                >
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">
              {t.about.cta.text}
            </p>
            <Link
              href="/kill-test"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-orange-500"
            >
              {t.about.cta.button}
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
        </div>
      </div>
    </div>
  );
}
