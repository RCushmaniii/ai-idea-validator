'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SupportPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Support',
      subtitle: 'Get help with AI Idea Validator',
      cards: [
        {
          href: '/docs',
          icon: 'book',
          title: 'Documentation',
          description: 'Learn how to use the AI Idea Validator, including guides for getting started and working with JSON files.',
        },
        {
          href: '/faq',
          icon: 'question',
          title: 'FAQ',
          description: 'Find answers to commonly asked questions about the assessment, verdicts, and how to interpret your results.',
        },
        {
          href: '/contact',
          icon: 'mail',
          title: 'Contact Us',
          description: 'Have a question or feedback? Reach out to us directly and we\'ll get back to you.',
        },
      ],
    },
    es: {
      title: 'Soporte',
      subtitle: 'Obtén ayuda con AI Idea Validator',
      cards: [
        {
          href: '/docs',
          icon: 'book',
          title: 'Documentación',
          description: 'Aprende a usar el AI Idea Validator, incluyendo guías para comenzar y trabajar con archivos JSON.',
        },
        {
          href: '/faq',
          icon: 'question',
          title: 'Preguntas Frecuentes',
          description: 'Encuentra respuestas a las preguntas más comunes sobre la evaluación, veredictos y cómo interpretar tus resultados.',
        },
        {
          href: '/contact',
          icon: 'mail',
          title: 'Contáctanos',
          description: '¿Tienes alguna pregunta o comentario? Escríbenos directamente y te responderemos.',
        },
      ],
    },
  };

  const t = content[language];

  const icons = {
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    question: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  };

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {t.subtitle}
          </p>
        </div>

        {/* Support Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                {icons[card.icon as keyof typeof icons]}
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {card.description}
              </p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                {language === 'en' ? 'Learn more' : 'Saber más'}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
