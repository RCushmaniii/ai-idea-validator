'use client';

import { useState, useEffect, useCallback } from 'react';
import { useKillTest, TestAnswers } from '@/contexts/KillTestContext';
import { TestIntro, QuestionCard, Results } from '@/components/kill-test';
import { EntryPoint } from '@/components/kill-test/EntryPoint';
import { JsonUpload } from '@/components/kill-test/JsonUpload';

type LocalMode = 'entry' | 'guided-intro' | 'json-upload';

export default function KillTestPage() {
  const { isStarted, isCompleted, submitWithAnswers } = useKillTest();
  const [localMode, setLocalMode] = useState<LocalMode>('entry');
  const [isLoading, setIsLoading] = useState(true);

  // Check for JSON result mode from URL params on mount
  const checkJsonParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');

    if (urlMode === 'json-result') {
      const storedAnswers = sessionStorage.getItem('killtest-json-answers');
      if (storedAnswers) {
        try {
          const answers = JSON.parse(storedAnswers) as TestAnswers;
          submitWithAnswers(answers);
          sessionStorage.removeItem('killtest-json-answers');
          window.history.replaceState({}, '', '/kill-test');
        } catch (e) {
          console.error('Failed to parse stored answers:', e);
        }
      }
    }
  }, [submitWithAnswers]);

  useEffect(() => {
    checkJsonParams();
    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(() => {
      setIsLoading(false);
    });
  }, [checkJsonParams]);

  // Derive effective mode from context state (no effect needed)
  const effectiveMode = isCompleted ? 'results' : isStarted ? 'guided-test' : localMode;

  // Handle guided test start
  const handleStartGuided = () => {
    setLocalMode('guided-intro');
  };

  // Handle JSON upload
  const handleStartJson = () => {
    setLocalMode('json-upload');
  };

  // Handle back to entry
  const handleBackToEntry = () => {
    setLocalMode('entry');
  };

  // Show loading state while checking for JSON params
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
      </div>
    );
  }

  // Render based on effective mode (derived from context + local state)
  if (effectiveMode === 'results') {
    return <Results />;
  }

  if (effectiveMode === 'guided-test') {
    return <QuestionCard />;
  }

  if (effectiveMode === 'guided-intro') {
    return <TestIntro />;
  }

  if (effectiveMode === 'json-upload') {
    return <JsonUpload onBack={handleBackToEntry} />;
  }

  // Default: Entry point
  return (
    <EntryPoint
      onSelectGuided={handleStartGuided}
      onSelectJson={handleStartJson}
    />
  );
}
