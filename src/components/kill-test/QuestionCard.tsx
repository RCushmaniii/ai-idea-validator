'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKillTest } from '@/contexts/KillTestContext';

export function QuestionCard() {
  const { t, language } = useLanguage();
  const {
    currentQuestionIndex,
    totalQuestions,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
    getCurrentQuestion,
    canProceed,
  } = useKillTest();

  const [helperOpen, setHelperOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const current = getCurrentQuestion();

  useEffect(() => {
    // Focus input when question changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Close helper when question changes (deferred to avoid sync setState in effect)
    requestAnimationFrame(() => {
      setHelperOpen(false);
    });
  }, [currentQuestionIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && current?.question.type !== 'textarea') {
        e.preventDefault();
        if (canProceed()) {
          if (currentQuestionIndex === totalQuestions - 1) {
            submitTest();
          } else {
            nextQuestion();
          }
        }
      }
    },
    [canProceed, currentQuestionIndex, totalQuestions, nextQuestion, submitTest, current]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!current) return null;

  const { section, question } = current;
  const sectionT = t.killTest.sections[section.id as keyof typeof t.killTest.sections];
  const questionT = t.killTest.questions[question.id as keyof typeof t.killTest.questions];
  const currentAnswer = answers[question.id];

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Get helper content if available
  const helper = question.helper?.[language];

  return (
    <div className="flex min-h-[70vh] flex-col">
      {/* Progress bar */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-[640px] max-w-full">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">
              {t.killTest.progress
                .replace('{current}', String(currentQuestionIndex + 1))
                .replace('{total}', String(totalQuestions))}
            </span>
            <span className="font-medium text-orange-600 dark:text-orange-500">
              {sectionT.title}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-orange-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="mx-auto flex max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-[640px] max-w-full">
          <div className="min-h-[480px] rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-10">
            {/* Section subtitle */}
            <p className="mb-2 text-sm font-medium text-orange-600 dark:text-orange-500">
              {sectionT.subtitle}
            </p>

            {/* Question */}
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
              {questionT.label}
            </h2>

            {/* SubLabel if available */}
            {'subLabel' in questionT && (
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
                {questionT.subLabel as string}
              </p>
            )}

            {/* Helper tooltip button */}
            {helper && (
              <button
                onClick={() => setHelperOpen(!helperOpen)}
                className="mt-3 flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t.killTest.helper.button}
              </button>
            )}

            {/* Helper content (expandable) */}
            {helper && helperOpen && (
              <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
                <h3 className="font-semibold text-orange-800 dark:text-orange-300">
                  {helper.title}
                </h3>
                <div className="mt-2 whitespace-pre-wrap text-sm text-orange-700 dark:text-orange-400">
                  {helper.content}
                </div>
                <button
                  onClick={() => setHelperOpen(false)}
                  className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400"
                >
                  {t.killTest.helper.close}
                </button>
              </div>
            )}

            {/* Input based on type */}
            <div className="mt-6">
              {question.type === 'textarea' && (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={(currentAnswer as string) || ''}
                  onChange={(e) => setAnswer(question.id, e.target.value)}
                  placeholder={'placeholder' in questionT ? (questionT.placeholder as string) : ''}
                  rows={5}
                  className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                />
              )}

              {question.type === 'radio' && 'options' in questionT && (
                <div className="space-y-3">
                  {question.options?.map((optionKey) => {
                    const options = questionT.options as Record<string, string>;
                    return (
                      <label
                        key={optionKey}
                        className={`flex cursor-pointer items-center rounded-lg border p-4 transition-all ${
                          currentAnswer === optionKey
                            ? 'border-orange-500 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={optionKey}
                          checked={currentAnswer === optionKey}
                          onChange={(e) => setAnswer(question.id, e.target.value)}
                          className="sr-only"
                        />
                        <span
                          className={`mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            currentAnswer === optionKey
                              ? 'border-orange-600 bg-orange-600'
                              : 'border-neutral-300 dark:border-neutral-600'
                          }`}
                        >
                          {currentAnswer === optionKey && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="text-neutral-900 dark:text-white">
                          {options[optionKey]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {question.type === 'scale' && (
                <div>
                  <div className="mb-4 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{'scaleMin' in questionT ? (questionT.scaleMin as string) : '1'}</span>
                    <span>{'scaleMax' in questionT ? (questionT.scaleMax as string) : '10'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => setAnswer(question.id, num)}
                        className={`flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-medium transition-all ${
                          currentAnswer === num
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:border-orange-300 hover:bg-orange-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-orange-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Verdict question type - special rendering with descriptions */}
              {question.type === 'verdict' && 'options' in questionT && 'descriptions' in questionT && (
                <div className="space-y-3">
                  {question.options?.map((optionKey) => {
                    const options = questionT.options as Record<string, string>;
                    const descriptions = questionT.descriptions as Record<string, string>;
                    const verdictColors: Record<string, string> = {
                      kill: 'border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-950/30',
                      flip: 'border-yellow-500 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-950/30',
                      build: 'border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-950/30',
                      bet: 'border-orange-500 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30',
                    };
                    const selectedColor = verdictColors[optionKey] || verdictColors.bet;

                    return (
                      <label
                        key={optionKey}
                        className={`flex cursor-pointer items-start rounded-lg border p-4 transition-all ${
                          currentAnswer === optionKey
                            ? selectedColor
                            : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={optionKey}
                          checked={currentAnswer === optionKey}
                          onChange={(e) => setAnswer(question.id, e.target.value)}
                          className="sr-only"
                        />
                        <span
                          className={`mr-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            currentAnswer === optionKey
                              ? 'border-orange-600 bg-orange-600'
                              : 'border-neutral-300 dark:border-neutral-600'
                          }`}
                        >
                          {currentAnswer === optionKey && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-white">
                            {options[optionKey]}
                          </span>
                          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                            {descriptions[optionKey]}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              {t.killTest.navigation.back}
            </button>

            <button
              onClick={isLastQuestion ? submitTest : nextQuestion}
              disabled={!canProceed()}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-2 font-medium text-white transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLastQuestion ? t.killTest.navigation.submit : t.killTest.navigation.next}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
