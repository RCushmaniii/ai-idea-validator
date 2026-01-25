'use client';

import { useState, useEffect } from 'react';
import { useKillTest, TestAnswers } from '@/contexts/KillTestContext';
import { TestIntro, QuestionCard, Results } from '@/components/kill-test';
import { EntryPoint } from '@/components/kill-test/EntryPoint';
import { JsonUpload } from '@/components/kill-test/JsonUpload';

type Mode = 'entry' | 'guided-intro' | 'guided-test' | 'json-upload' | 'results';

export default function KillTestPage() {
  const { isStarted, isCompleted, submitWithAnswers } = useKillTest();
  const [mode, setMode] = useState<Mode>('entry');
  const [isLoading, setIsLoading] = useState(true);

  // Check for JSON result mode from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');

    if (urlMode === 'json-result') {
      const storedAnswers = sessionStorage.getItem('killtest-json-answers');
      if (storedAnswers) {
        try {
          const answers = JSON.parse(storedAnswers) as TestAnswers;
          submitWithAnswers(answers);
          sessionStorage.removeItem('killtest-json-answers');
          // Clean up URL
          window.history.replaceState({}, '', '/kill-test');
        } catch (e) {
          console.error('Failed to parse stored answers:', e);
        }
      }
    }
    setIsLoading(false);
  }, [submitWithAnswers]);

  // Sync mode with context state
  useEffect(() => {
    if (isCompleted) {
      setMode('results');
    } else if (isStarted) {
      setMode('guided-test');
    }
  }, [isStarted, isCompleted]);

  // Handle guided test start
  const handleStartGuided = () => {
    setMode('guided-intro');
  };

  // Handle JSON upload
  const handleStartJson = () => {
    setMode('json-upload');
  };

  // Handle back to entry
  const handleBackToEntry = () => {
    setMode('entry');
  };

  // Show loading state while checking for JSON params
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
      </div>
    );
  }

  // Render based on mode
  if (mode === 'results' || isCompleted) {
    return <Results />;
  }

  if (mode === 'guided-test' || isStarted) {
    return <QuestionCard />;
  }

  if (mode === 'guided-intro') {
    return <TestIntro />;
  }

  if (mode === 'json-upload') {
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
