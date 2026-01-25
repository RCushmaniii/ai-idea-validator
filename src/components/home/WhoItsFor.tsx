'use client';

import { useLanguage } from '@/contexts/LanguageContext';

// Reusable persona card component (DRY principle - same structure as FeatureCard)
interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PersonaCard({ icon, title, description }: PersonaCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm dark:bg-neutral-800">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        {description}
      </p>

      {/* Decorative element - consistent across all cards */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-orange-500/5 dark:bg-orange-500/10" />
    </div>
  );
}

// Icon components
const icons = [
  // Solo Founder - rocket
  <svg key="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>,
  // Freelancer - briefcase
  <svg key="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>,
  // Indie Hacker - code
  <svg key="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>,
];

export function WhoItsFor() {
  const { t } = useLanguage();

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
            {t.home.whoItsFor.subtitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.home.whoItsFor.title}
          </h2>
        </div>

        {/* Personas - constrained max-width to prevent over-stretching */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.home.whoItsFor.personas.map((persona, index) => (
            <PersonaCard
              key={index}
              icon={icons[index]}
              title={persona.title}
              description={persona.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
