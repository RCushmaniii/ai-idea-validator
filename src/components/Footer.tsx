'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// JSON template for download
const JSON_TEMPLATE = `{
  "meta": {
    "schema_version": "1.1",
    "language": "en",
    "created_with": "human+ai",
    "confidence_level": "medium"
  },
  "idea_definition": {
    "one_liner": "",
    "problem_statement": "",
    "why_now": "",
    "who_feels_pain_most": ""
  },
  "customer": {
    "primary_payer": { "role": "", "industry": "", "company_size": "" },
    "primary_user": { "role": "", "industry": "" },
    "existing_behavior": { "current_solution": "", "why_it_sucks": "" }
  },
  "core_workflow": {
    "event": "",
    "decision": "",
    "action": "",
    "frequency": "weekly",
    "criticality": "medium"
  },
  "value_and_money": {
    "value_proposition": "",
    "value_type": "convenience",
    "monetization_model": "",
    "pricing_anchor": "subscription",
    "estimated_willingness_to_pay": ""
  },
  "platform_and_dependencies": {
    "core_platforms": [],
    "dependency_severity": { "low": [], "medium": [], "high": [] },
    "single_point_of_failure": ""
  },
  "defensibility_analysis": {
    "why_this_is_hard_to_copy": "",
    "what_looks_like_a_moat_but_isnt": "",
    "time_based_advantages": ""
  },
  "data_and_learning": {
    "data_collected": [],
    "data_type": "behavioral",
    "data_owner": "you",
    "learning_loops": "",
    "does_data_compound": "somewhat"
  },
  "risks_and_failure": {
    "primary_failure_mode": "",
    "secondary_failure_modes": [],
    "platform_risk_description": "",
    "competitive_risk_description": "",
    "founder_risk_description": ""
  },
  "scoring": {
    "copycat_risk": 5,
    "platform_risk": 5,
    "lock_in_strength": 5,
    "pricing_power": 5,
    "overall_confidence": 5
  },
  "assumptions": {
    "most_critical_assumptions": [],
    "least_certain_assumptions": [],
    "assumptions_not_yet_tested": []
  },
  "self_reflection": {
    "emotional_attachment_level": 5,
    "would_i_fund_this_if_not_my_idea": "unsure",
    "biggest_blind_spot": ""
  },
  "initial_verdict": {
    "founder_verdict": "BUILD",
    "reasoning": "",
    "what_would_change_my_mind": ""
  }
}`;

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const handleDownloadTemplate = useCallback(() => {
    const blob = new Blob([JSON_TEMPLATE], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kill-test-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/kill-test', label: t.nav.killTest },
  ];

  const legalItems = [
    { href: '/terms', label: language === 'en' ? 'Terms of Service' : 'Terminos de Servicio' },
    { href: '/privacy', label: language === 'en' ? 'Privacy Policy' : 'Politica de Privacidad' },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              {t.header.logo}
            </Link>
            <p className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-500">
              {t.footer.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              {t.footer.navigation}
            </h3>
            <nav className="mt-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              {language === 'en' ? 'Resources' : 'Recursos'}
            </h3>
            <nav className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-1 text-left text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                {language === 'en' ? 'JSON Template' : 'Plantilla JSON'}
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="text-left text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {language === 'en' ? 'Cambiar a Espanol' : 'Switch to English'}
              </button>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              {language === 'en' ? 'Legal' : 'Legal'}
            </h3>
            <nav className="mt-4 flex flex-col gap-2">
              {legalItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              {t.footer.copyright}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              {t.footer.builtFor}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
