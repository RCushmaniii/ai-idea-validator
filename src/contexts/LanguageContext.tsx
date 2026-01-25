'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer all state updates to avoid sync setState in effect
    requestAnimationFrame(() => {
      // Read stored language preference
      const stored = localStorage.getItem('language') as Language | null;
      if (stored && (stored === 'en' || stored === 'es')) {
        setLanguageState(stored);
      } else {
        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('es')) {
          setLanguageState('es');
        }
      }
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values during SSR
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en
    };
  }
  return context;
}
