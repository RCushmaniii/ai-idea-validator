'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { KillTestProvider } from '@/contexts/KillTestContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <KillTestProvider>{children}</KillTestProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
