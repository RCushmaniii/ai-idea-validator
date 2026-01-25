'use client';

import { useLanguage } from '@/contexts/LanguageContext';

// Reusable card component (DRY principle)
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700">
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-900/30 dark:text-orange-500">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

// Icon components
const icons = [
  // Shield check - Exposes false moats
  <svg key="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Lock - Tests platform dependency
  <svg key="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>,
  // Users - Evaluates solo-founder survivability
  <svg key="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Chart - Measures switching costs
  <svg key="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>,
  // Clock - Calculates asymmetric risk
  <svg key="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
];

export function WhatItDoes() {
  const { t } = useLanguage();

  // Split into rows: 3 on top, 2 centered on bottom
  const topRow = t.home.whatItDoes.points.slice(0, 3);
  const bottomRow = t.home.whatItDoes.points.slice(3);

  return (
    <section className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
            {t.home.whatItDoes.subtitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.home.whatItDoes.title}
          </h2>
        </div>

        {/* Features Grid - Top Row */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRow.map((point, index) => (
            <FeatureCard
              key={index}
              icon={icons[index]}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>

        {/* Features Grid - Bottom Row (centered) */}
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {bottomRow.map((point, index) => (
            <div key={index + 3} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <FeatureCard
                icon={icons[index + 3]}
                title={point.title}
                description={point.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
