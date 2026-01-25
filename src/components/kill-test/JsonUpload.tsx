'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKillTest, TestAnswers } from '@/contexts/KillTestContext';

interface JsonInputData {
  meta?: {
    schema_version?: string;
    language?: string;
    created_with?: string;
    confidence_level?: string;
  };
  idea_definition?: {
    one_liner?: string;
    problem_statement?: string;
    why_now?: string;
    who_feels_pain_most?: string;
  };
  customer?: {
    primary_payer?: {
      role?: string;
      industry?: string;
      company_size?: string;
    };
    primary_user?: {
      role?: string;
      industry?: string;
    };
    existing_behavior?: {
      current_solution?: string;
      why_it_sucks?: string;
    };
  };
  core_workflow?: {
    event?: string;
    decision?: string;
    action?: string;
    frequency?: string;
    criticality?: string;
  };
  value_and_money?: {
    value_proposition?: string;
    value_type?: string;
    monetization_model?: string;
    pricing_anchor?: string;
    estimated_willingness_to_pay?: string;
  };
  platform_and_dependencies?: {
    core_platforms?: string[];
    dependency_severity?: {
      low?: string[];
      medium?: string[];
      high?: string[];
    };
    single_point_of_failure?: string;
  };
  defensibility_analysis?: {
    why_this_is_hard_to_copy?: string;
    what_looks_like_a_moat_but_isnt?: string;
    time_based_advantages?: string;
  };
  data_and_learning?: {
    data_collected?: string[];
    data_type?: string;
    data_owner?: string;
    learning_loops?: string;
    does_data_compound?: string;
  };
  risks_and_failure?: {
    primary_failure_mode?: string;
    secondary_failure_modes?: string[];
    platform_risk_description?: string;
    competitive_risk_description?: string;
    founder_risk_description?: string;
  };
  scoring?: {
    copycat_risk?: number;
    platform_risk?: number;
    lock_in_strength?: number;
    pricing_power?: number;
    overall_confidence?: number;
  };
  assumptions?: {
    most_critical_assumptions?: string[];
    least_certain_assumptions?: string[];
    assumptions_not_yet_tested?: string[];
  };
  self_reflection?: {
    emotional_attachment_level?: number;
    would_i_fund_this_if_not_my_idea?: string;
    biggest_blind_spot?: string;
  };
  initial_verdict?: {
    founder_verdict?: string;
    reasoning?: string;
    what_would_change_my_mind?: string;
  };
}

// Convert JSON input to internal answer format
function convertJsonToAnswers(json: JsonInputData): TestAnswers {
  const answers: TestAnswers = {};

  // Setup section
  if (json.idea_definition?.one_liner) {
    answers.ideaDefinition = json.idea_definition.one_liner;
  }
  if (json.customer?.primary_payer || json.customer?.primary_user) {
    const payer = json.customer.primary_payer;
    const user = json.customer.primary_user;
    answers.targetCustomer = [
      payer?.role && `Payer: ${payer.role}${payer.industry ? ` (${payer.industry})` : ''}`,
      user?.role && `User: ${user.role}${user.industry ? ` (${user.industry})` : ''}`,
    ].filter(Boolean).join('\n');
  }
  if (json.core_workflow) {
    const wf = json.core_workflow;
    answers.coreWorkflow = [
      wf.event && `Event: ${wf.event}`,
      wf.decision && `Decision: ${wf.decision}`,
      wf.action && `Action: ${wf.action}`,
    ].filter(Boolean).join('\n');
  }
  if (json.value_and_money?.monetization_model) {
    answers.monetization = json.value_and_money.monetization_model;
  }
  if (json.platform_and_dependencies?.core_platforms) {
    answers.platformDependencies = json.platform_and_dependencies.core_platforms.join(', ');
  }
  if (json.idea_definition?.problem_statement) {
    answers.disappearanceTest = json.idea_definition.problem_statement;
  }

  // Kill Test section
  if (json.idea_definition?.why_now) {
    answers.inevitabilityTest = json.idea_definition.why_now;
  }
  if (json.defensibility_analysis?.why_this_is_hard_to_copy) {
    // Map to copycat velocity based on content analysis
    const hardToCopy = json.defensibility_analysis.why_this_is_hard_to_copy.toLowerCase();
    if (hardToCopy.includes('proprietary') || hardToCopy.includes('years') || hardToCopy.includes('regulatory')) {
      answers.copycatVelocity = 'over6months';
    } else if (hardToCopy.includes('domain') || hardToCopy.includes('expertise')) {
      answers.copycatVelocity = '60to90';
    } else if (hardToCopy.includes('iteration') || hardToCopy.includes('learning')) {
      answers.copycatVelocity = '30to60';
    } else {
      answers.copycatVelocity = 'under30';
    }
  }
  if (json.defensibility_analysis?.what_looks_like_a_moat_but_isnt) {
    answers.aiCommoditization = json.defensibility_analysis.what_looks_like_a_moat_but_isnt;
  }
  if (json.platform_and_dependencies?.single_point_of_failure) {
    answers.platformHostageRisk = json.platform_and_dependencies.single_point_of_failure;
  }
  if (json.data_and_learning?.data_collected) {
    answers.dataMoatReality = json.data_and_learning.data_collected.join(', ');
  }
  if (json.data_and_learning?.does_data_compound) {
    const compound = json.data_and_learning.does_data_compound.toLowerCase();
    if (compound === 'yes') answers.dataCompounding = 'yesStrongly';
    else if (compound === 'somewhat') answers.dataCompounding = 'somewhat';
    else answers.dataCompounding = 'no';
  }
  if (json.scoring?.lock_in_strength) {
    answers.workflowLockIn = json.scoring.lock_in_strength;
  }
  if (json.value_and_money?.pricing_anchor) {
    const anchor = json.value_and_money.pricing_anchor.toLowerCase();
    if (anchor === 'outcome' || anchor === 'contract') {
      answers.pricingPower = 'yes';
    } else if (anchor === 'subscription') {
      answers.pricingPower = 'maybe';
    } else {
      answers.pricingPower = 'no';
    }
  }
  if (json.customer?.primary_payer?.role) {
    answers.budgetOwner = `${json.customer.primary_payer.role}${json.customer.primary_payer.company_size ? ` at ${json.customer.primary_payer.company_size} company` : ''}`;
  }
  if (json.risks_and_failure?.founder_risk_description) {
    answers.soloFounderRisk = json.risks_and_failure.founder_risk_description;
  }
  if (json.risks_and_failure?.secondary_failure_modes) {
    answers.scalingStress = json.risks_and_failure.secondary_failure_modes.join(', ');
  }
  if (json.risks_and_failure?.primary_failure_mode) {
    answers.likelyFailureMode = json.risks_and_failure.primary_failure_mode;
  }

  // Scoring section
  if (json.scoring?.copycat_risk) {
    answers.copycatRiskScore = json.scoring.copycat_risk;
  }
  if (json.scoring?.platform_risk) {
    answers.platformRiskScore = json.scoring.platform_risk;
  }
  if (json.scoring?.lock_in_strength) {
    answers.lockInStrengthScore = json.scoring.lock_in_strength;
  }
  if (json.scoring?.pricing_power) {
    answers.pricingPowerScore = json.scoring.pricing_power;
  }

  // Verdict section
  if (json.initial_verdict?.founder_verdict) {
    const verdict = json.initial_verdict.founder_verdict.toLowerCase();
    if (verdict === 'kill') answers.finalVerdict = 'kill';
    else if (verdict === 'pivot') answers.finalVerdict = 'pivot';
    else if (verdict === 'build') answers.finalVerdict = 'build';
    else if (verdict === 'bet') answers.finalVerdict = 'bet';
  }
  if (json.self_reflection?.biggest_blind_spot || json.initial_verdict?.what_would_change_my_mind) {
    answers.biggestUnresolvedRisk = json.self_reflection?.biggest_blind_spot || json.initial_verdict?.what_would_change_my_mind || '';
  }

  return answers;
}

// Empty JSON template for download
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
    "primary_payer": {
      "role": "",
      "industry": "",
      "company_size": ""
    },
    "primary_user": {
      "role": "",
      "industry": ""
    },
    "existing_behavior": {
      "current_solution": "",
      "why_it_sucks": ""
    }
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
    "dependency_severity": {
      "low": [],
      "medium": [],
      "high": []
    },
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

interface JsonUploadProps {
  onBack: () => void;
}

export function JsonUpload({ onBack }: JsonUploadProps) {
  const { language } = useLanguage();
  const { submitTest } = useKillTest();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<JsonInputData | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const t = {
    en: {
      title: 'Upload JSON',
      subtitle: 'For AI-assisted workflows',
      description: 'Already explored your idea with AI? Paste your structured analysis below.',
      placeholder: 'Paste your JSON here...',
      validate: 'Validate & Preview',
      submit: 'Submit for Analysis',
      back: 'Back to Options',
      dropzone: 'Drop JSON file here or click to upload',
      downloadTemplate: 'Download Template',
      templateHint: 'Give this template to your AI assistant to help structure your idea analysis.',
      errors: {
        invalidJson: 'Invalid JSON format. Please check your syntax.',
        missingFields: 'Missing required fields. Please include at least idea_definition and scoring.',
      },
      preview: {
        title: 'Preview',
        idea: 'Idea',
        scores: 'Scores',
        verdict: 'Your Verdict',
      },
    },
    es: {
      title: 'Subir JSON',
      subtitle: 'Para flujos asistidos por IA',
      description: 'Ya exploraste tu idea con IA? Pega tu analisis estructurado abajo.',
      placeholder: 'Pega tu JSON aqui...',
      validate: 'Validar y Previsualizar',
      submit: 'Enviar para Analisis',
      back: 'Volver a Opciones',
      dropzone: 'Suelta el archivo JSON aqui o haz clic para subir',
      downloadTemplate: 'Descargar Plantilla',
      templateHint: 'Dale esta plantilla a tu asistente de IA para estructurar el analisis de tu idea.',
      errors: {
        invalidJson: 'Formato JSON invalido. Revisa la sintaxis.',
        missingFields: 'Faltan campos requeridos. Incluye al menos idea_definition y scoring.',
      },
      preview: {
        title: 'Vista Previa',
        idea: 'Idea',
        scores: 'Puntuaciones',
        verdict: 'Tu Veredicto',
      },
    },
  };

  const text = t[language];

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

  const handleValidate = useCallback(() => {
    setError(null);
    setPreview(null);

    try {
      const parsed = JSON.parse(jsonText) as JsonInputData;

      // Basic validation
      if (!parsed.idea_definition?.one_liner && !parsed.scoring) {
        setError(text.errors.missingFields);
        return;
      }

      setPreview(parsed);
    } catch {
      setError(text.errors.invalidJson);
    }
  }, [jsonText, text.errors]);

  const handleSubmit = useCallback(() => {
    if (!preview) return;

    // Convert JSON to answers and submit
    const answers = convertJsonToAnswers(preview);

    // We need to set answers and submit - this requires updating the context
    // For now, we'll use a workaround by storing in sessionStorage
    sessionStorage.setItem('killtest-json-answers', JSON.stringify(answers));
    window.location.href = '/kill-test?mode=json-result';
  }, [preview]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJsonText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJsonText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-500">
            {text.subtitle}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {text.title}
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {text.description}
          </p>
        </div>

        {/* Download Template */}
        <div className="mt-8 rounded-xl border border-dashed border-orange-300 bg-orange-50 p-6 dark:border-orange-900/50 dark:bg-orange-950/20">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                {text.downloadTemplate}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {text.templateHint}
              </p>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-orange-300 bg-white px-4 py-2 font-medium text-orange-700 transition-all hover:bg-orange-50 dark:border-orange-700 dark:bg-orange-950/50 dark:text-orange-400 dark:hover:bg-orange-900/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {text.downloadTemplate}
            </button>
          </div>
        </div>

        {/* File Drop Zone */}
        <div
          className={`mt-8 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
              : 'border-neutral-300 dark:border-neutral-700'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
            id="json-file-input"
          />
          <label
            htmlFor="json-file-input"
            className="cursor-pointer text-neutral-600 dark:text-neutral-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-12 w-12 text-neutral-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="mt-2">{text.dropzone}</p>
          </label>
        </div>

        {/* JSON Text Area */}
        <div className="mt-6">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={text.placeholder}
            rows={12}
            className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {text.preview.title}
            </h3>

            <div className="mt-4 space-y-4">
              {preview.idea_definition?.one_liner && (
                <div>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {text.preview.idea}
                  </span>
                  <p className="mt-1 text-neutral-900 dark:text-white">
                    {preview.idea_definition.one_liner}
                  </p>
                </div>
              )}

              {preview.scoring && (
                <div>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {text.preview.scores}
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
                      <span className="text-xs text-neutral-500">Copycat Risk</span>
                      <p className="font-bold text-neutral-900 dark:text-white">
                        {preview.scoring.copycat_risk}/10
                      </p>
                    </div>
                    <div className="rounded bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
                      <span className="text-xs text-neutral-500">Platform Risk</span>
                      <p className="font-bold text-neutral-900 dark:text-white">
                        {preview.scoring.platform_risk}/10
                      </p>
                    </div>
                    <div className="rounded bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
                      <span className="text-xs text-neutral-500">Lock-in</span>
                      <p className="font-bold text-neutral-900 dark:text-white">
                        {preview.scoring.lock_in_strength}/10
                      </p>
                    </div>
                    <div className="rounded bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
                      <span className="text-xs text-neutral-500">Pricing Power</span>
                      <p className="font-bold text-neutral-900 dark:text-white">
                        {preview.scoring.pricing_power}/10
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {preview.initial_verdict?.founder_verdict && (
                <div>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {text.preview.verdict}
                  </span>
                  <p className="mt-1 font-bold text-orange-600 dark:text-orange-500">
                    {preview.initial_verdict.founder_verdict}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onBack}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {text.back}
          </button>

          {!preview ? (
            <button
              onClick={handleValidate}
              disabled={!jsonText.trim()}
              className="flex-1 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {text.validate}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-all hover:bg-orange-500"
            >
              {text.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
