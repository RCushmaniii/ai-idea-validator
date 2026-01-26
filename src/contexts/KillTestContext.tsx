'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { getAllQuestions, getTotalQuestions } from '@/lib/killTestQuestions';
import { useLanguage } from '@/contexts/LanguageContext';

export type Verdict = 'kill' | 'flip' | 'build' | 'bet';

export interface TestAnswers {
  [key: string]: string | number;
}

export interface WeakSignal {
  id: string;
  score: number;
  maxScore: number;
  isWeak: boolean;
}

export interface PivotSuggestion {
  type: string;
  suggestion: string;
}

export interface Contradiction {
  field: string;
  userScore: number;
  issue: string;
}

export interface AIAnalysis {
  confidence: number;
  rationale: string;
  contradictions: Contradiction[];
  adjustedScores: {
    copycatRisk: number;
    platformRisk: number;
    lockInStrength: number;
    pricingPower: number;
  };
}

export interface TestResult {
  verdict: Verdict;
  weakSignals: WeakSignal[];
  compoundingStory: string;
  pivotSuggestions: PivotSuggestion[];
  scores: {
    copycatRisk: number;
    platformRisk: number;
    lockInStrength: number;
    pricingPower: number;
  };
  aiAnalysis?: AIAnalysis;
}

interface KillTestContextType {
  currentQuestionIndex: number;
  answers: TestAnswers;
  isStarted: boolean;
  isCompleted: boolean;
  isAnalyzing: boolean;
  result: TestResult | null;
  totalQuestions: number;
  startTest: () => void;
  setAnswer: (questionId: string, value: string | number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitTest: () => void;
  submitWithAnswers: (answers: TestAnswers) => void;
  resetTest: () => void;
  getCurrentQuestion: () => ReturnType<typeof getAllQuestions>[0] | null;
  canProceed: () => boolean;
}

const KillTestContext = createContext<KillTestContextType | undefined>(undefined);

function calculateOfflineVerdict(answers: TestAnswers): TestResult {
  // Get scores from the scoring section
  const copycatRisk = Number(answers.copycatRiskScore) || 5;
  const platformRisk = Number(answers.platformRiskScore) || 5;
  const lockInStrength = Number(answers.lockInStrengthScore) || 5;
  const pricingPower = Number(answers.pricingPowerScore) || 5;

  // Also consider qualitative answers
  const copycatVelocity = answers.copycatVelocity as string;
  const dataCompounding = answers.dataCompounding as string;
  const pricingPowerQual = answers.pricingPower as string;

  // Build weak signals list
  const weakSignals: WeakSignal[] = [
    {
      id: 'copycatRisk',
      score: copycatRisk,
      maxScore: 10,
      isWeak: copycatRisk >= 7,
    },
    {
      id: 'platformRisk',
      score: platformRisk,
      maxScore: 10,
      isWeak: platformRisk >= 7,
    },
    {
      id: 'lockInStrength',
      score: lockInStrength,
      maxScore: 10,
      isWeak: lockInStrength <= 4,
    },
    {
      id: 'pricingPower',
      score: pricingPower,
      maxScore: 10,
      isWeak: pricingPower <= 4,
    },
  ];

  // Adjust based on qualitative answers
  if (copycatVelocity === 'under30') {
    weakSignals[0].isWeak = true;
  }
  if (dataCompounding === 'no') {
    weakSignals[2].isWeak = true;
  }
  if (pricingPowerQual === 'no') {
    weakSignals[3].isWeak = true;
  }

  // Count weak signals
  const weakCount = weakSignals.filter(s => s.isWeak).length;

  // Determine verdict based on heuristics
  let verdict: Verdict;

  // Auto-determine based on signals
  if (weakCount >= 3) {
    verdict = 'kill';
  } else if (weakCount === 2) {
    verdict = 'flip';
  } else if (lockInStrength >= 6 && pricingPower >= 6 && copycatRisk <= 5) {
    verdict = 'build';
  } else {
    verdict = 'bet';
  }

  // Generate compounding story based on weak signals
  let compoundingStory = '';
  const weakIds = weakSignals.filter(s => s.isWeak).map(s => s.id);

  if (weakIds.includes('copycatRisk') && weakIds.includes('lockInStrength')) {
    compoundingStory = 'Because this idea is easy to copy and has weak customer lock-in, competitors can undercut pricing quickly. ';
  }
  if (weakIds.includes('pricingPower')) {
    compoundingStory += 'The fragile pricing power means there\'s little margin to absorb competitive pressure. ';
  }
  if (weakIds.includes('platformRisk')) {
    compoundingStory += 'Heavy platform dependency adds a layer of existential risk that compounds other weaknesses. ';
  }
  if (compoundingStory === '') {
    if (verdict === 'build') {
      compoundingStory = 'The core signals are strong. Focus on execution and building moats early while you have momentum.';
    } else {
      compoundingStory = 'The risk profile is mixed. The outcome depends heavily on external factors and execution quality.';
    }
  }

  // Generate pivot suggestions based on weak signals
  const pivotSuggestions: PivotSuggestion[] = [];

  if (weakIds.includes('lockInStrength')) {
    pivotSuggestions.push({
      type: 'lockIn',
      suggestion: 'Shift from a convenience feature to a system that owns a critical workflow (e.g., revenue recovery, compliance, payments).',
    });
  }
  if (weakIds.includes('copycatRisk')) {
    pivotSuggestions.push({
      type: 'niche',
      suggestion: 'Focus on a narrowly defined vertical where domain rules, language, or regulation create friction for competitors.',
    });
  }
  if (weakIds.includes('pricingPower')) {
    pivotSuggestions.push({
      type: 'value',
      suggestion: 'Tie pricing to recovered revenue, avoided costs, or risk reduction rather than usage or features.',
    });
  }
  if (weakIds.includes('platformRisk')) {
    pivotSuggestions.push({
      type: 'platform',
      suggestion: 'Add a second execution path (multi-channel, offline fallback, or customer-owned data layer).',
    });
  }

  return {
    verdict,
    weakSignals,
    compoundingStory,
    pivotSuggestions,
    scores: {
      copycatRisk,
      platformRisk,
      lockInStrength,
      pricingPower,
    },
  };
}

export function KillTestProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const { language } = useLanguage();

  const totalQuestions = getTotalQuestions();
  const allQuestions = getAllQuestions();

  const startTest = useCallback(() => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
  }, []);

  const setAnswer = useCallback((questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (currentQuestionIndex >= allQuestions.length) return null;
    return allQuestions[currentQuestionIndex];
  }, [currentQuestionIndex, allQuestions]);

  const canProceed = useCallback(() => {
    const current = getCurrentQuestion();
    if (!current) return false;
    const answer = answers[current.question.id];
    if (!current.question.required) return true;
    if (typeof answer === 'string') return answer.trim().length > 0;
    if (typeof answer === 'number') return true;
    return false;
  }, [getCurrentQuestion, answers]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const submitTest = useCallback(async () => {
    setIsAnalyzing(true);
    setIsCompleted(true);

    // Start with offline calculation (will be updated by AI)
    const offlineResult = calculateOfflineVerdict(answers);
    setResult(offlineResult);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, language }),
      });

      if (response.ok) {
        const aiResult = await response.json();

        // Update result with AI analysis
        setResult({
          ...offlineResult,
          verdict: aiResult.verdict,
          aiAnalysis: {
            confidence: aiResult.confidence,
            rationale: aiResult.rationale,
            contradictions: aiResult.contradictions || [],
            adjustedScores: aiResult.adjustedScores,
          },
        });
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Keep offline result
    } finally {
      setIsAnalyzing(false);
    }
  }, [answers, language]);

  const submitWithAnswers = useCallback(async (externalAnswers: TestAnswers) => {
    setAnswers(externalAnswers);
    setIsAnalyzing(true);
    setIsCompleted(true);

    // Start with offline calculation
    const offlineResult = calculateOfflineVerdict(externalAnswers);
    setResult(offlineResult);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: externalAnswers, language }),
      });

      if (response.ok) {
        const aiResult = await response.json();

        setResult({
          ...offlineResult,
          verdict: aiResult.verdict,
          aiAnalysis: {
            confidence: aiResult.confidence,
            rationale: aiResult.rationale,
            contradictions: aiResult.contradictions || [],
            adjustedScores: aiResult.adjustedScores,
          },
        });
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [language]);

  const resetTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsStarted(false);
    setIsCompleted(false);
    setResult(null);
  }, []);

  return (
    <KillTestContext.Provider
      value={{
        currentQuestionIndex,
        answers,
        isStarted,
        isCompleted,
        isAnalyzing,
        result,
        totalQuestions,
        startTest,
        setAnswer,
        nextQuestion,
        prevQuestion,
        submitTest,
        submitWithAnswers,
        resetTest,
        getCurrentQuestion,
        canProceed,
      }}
    >
      {children}
    </KillTestContext.Provider>
  );
}

const defaultContext: KillTestContextType = {
  currentQuestionIndex: 0,
  answers: {},
  isStarted: false,
  isCompleted: false,
  isAnalyzing: false,
  result: null,
  totalQuestions: getTotalQuestions(),
  startTest: () => {},
  setAnswer: () => {},
  nextQuestion: () => {},
  prevQuestion: () => {},
  submitTest: () => {},
  submitWithAnswers: () => {},
  resetTest: () => {},
  getCurrentQuestion: () => null,
  canProceed: () => false,
};

export function useKillTest() {
  const context = useContext(KillTestContext);
  if (context === undefined) {
    return defaultContext;
  }
  return context;
}
