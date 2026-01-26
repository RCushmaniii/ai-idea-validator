'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocSection {
  title: string;
  content: string;
  list?: string[];
  steps?: string[];
  isPrompt?: boolean;
}

interface DocContent {
  title: string;
  intro: string;
  sections: DocSection[];
}

interface ContentLanguage {
  title: string;
  subtitle: string;
  tabs: {
    gettingStarted: string;
    jsonGuide: string;
  };
  gettingStarted: DocContent;
  jsonGuide: DocContent;
  copyButton: string;
  copiedButton: string;
  backToSupport: string;
}

// JSON template for AI assistants
const AI_PROMPT_TEMPLATE = `You are helping a founder fill out the AI Idea Validator JSON template. Ask them about their startup idea and fill in the following JSON structure based on their responses. Be thorough but concise.

Here's the template to fill:

{
  "meta": {
    "schema_version": "2.0",
    "language": "en",
    "created_with": "ai_assisted"
  },
  "idea_definition": {
    "one_liner": "[One sentence describing the business]",
    "problem_statement": "[What problem does this solve?]",
    "why_now": "[Why is now the right time for this?]",
    "who_feels_pain_most": "[Who has the biggest pain point?]",
    "what_disappears_if_product_dies": "[What breaks for customers if this vanishes?]"
  },
  "customer": {
    "primary_payer": {
      "role": "[Job title of buyer]",
      "industry": "[Industry]",
      "company_size": "[SMB/Mid-market/Enterprise]"
    },
    "primary_user": {
      "role": "[Job title of daily user]",
      "industry": "[Industry]"
    },
    "existing_behavior": {
      "current_solution": "[What do they use today?]",
      "why_it_sucks": "[Why is the current solution inadequate?]"
    }
  },
  "core_workflow": {
    "event": "[What triggers usage?]",
    "decision": "[What decision gets made?]",
    "action": "[What action results?]",
    "frequency": "daily | weekly | monthly | ad_hoc",
    "criticality": "low | medium | high"
  },
  "value_and_money": {
    "value_proposition": "[Core value delivered]",
    "value_type": "revenue_gain | cost_reduction | risk_avoidance | convenience",
    "monetization_model": "[How does this make money?]",
    "pricing_anchor": "usage | subscription | outcome | contract",
    "estimated_willingness_to_pay": "[Price range]"
  },
  "platform_and_dependencies": {
    "core_platforms": ["[List platforms: OpenAI, Stripe, etc.]"],
    "dependency_severity": {
      "low": ["[Low-risk dependencies]"],
      "medium": ["[Medium-risk dependencies]"],
      "high": ["[High-risk dependencies]"]
    },
    "single_point_of_failure": "[Biggest platform risk]"
  },
  "defensibility_analysis": {
    "why_this_is_hard_to_copy": "[Real competitive advantages]",
    "what_looks_like_a_moat_but_isnt": "[False moats]",
    "time_based_advantages": "[Head start benefits]"
  },
  "data_and_learning": {
    "data_collected": ["[Types of data collected]"],
    "data_type": "behavioral | transactional | outcome | none",
    "data_owner": "you | customer | platform",
    "learning_loops": "[How does the product improve with usage?]",
    "does_data_compound": "yes | somewhat | no"
  },
  "risks_and_failure": {
    "primary_failure_mode": "[Most likely way this fails]",
    "secondary_failure_modes": ["[Other failure modes]"],
    "platform_risk_description": "[Platform dependency risks]",
    "competitive_risk_description": "[Competitive threats]",
    "founder_risk_description": "[Solo founder / team risks]"
  },
  "scoring": {
    "copycat_risk": [1-10, higher = easier to copy],
    "platform_risk": [1-10, higher = more dependent],
    "lock_in_strength": [1-10, higher = stronger lock-in],
    "pricing_power": [1-10, higher = more pricing power]
  },
  "assumptions": {
    "most_critical_assumptions": ["[Key assumptions that must be true]"],
    "least_certain_assumptions": ["[Assumptions you're least sure about]"],
    "assumptions_not_yet_tested": ["[Untested assumptions]"]
  },
  "self_reflection": {
    "emotional_attachment_level": [1-10],
    "would_i_fund_this_if_not_my_idea": "yes | no | unsure",
    "biggest_blind_spot": "[Potential blind spots]",
    "biggest_unresolved_risk": "[The elephant in the room]"
  }
}

Instructions:
1. Ask the founder to describe their idea
2. Ask follow-up questions to fill each section
3. Be skeptical and push for honest answers
4. Output the completed JSON when done`;

export default function DocsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'getting-started' | 'json-guide'>('getting-started');
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = useCallback(() => {
    navigator.clipboard.writeText(AI_PROMPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const content: Record<'en' | 'es', ContentLanguage> = {
    en: {
      title: 'Documentation',
      subtitle: 'Everything you need to get started',
      tabs: {
        gettingStarted: 'Getting Started',
        jsonGuide: 'JSON & AI Workflow',
      },
      gettingStarted: {
        title: 'Getting Started with AI Idea Validator',
        intro: 'AI Idea Validator helps founders evaluate their startup ideas through a structured assessment. Here\'s how to get the most out of it.',
        sections: [
          {
            title: '1. Choose Your Path',
            content: 'When you start the assessment, you\'ll have two options:',
            list: [
              'Guided Assessment (Recommended): Answer 24 questions one at a time with helpful tooltips and progress tracking.',
              'JSON Upload: For power users who want to pre-fill answers using an AI assistant or batch process multiple ideas.',
            ],
          },
          {
            title: '2. Answer Honestly',
            content: 'The assessment works best when you\'re brutally honest. Optimistic answers only hurt you. The AI will detect contradictions between your self-assessment scores and your written responses.',
          },
          {
            title: '3. Understand the Questions',
            content: 'Questions are grouped into sections:',
            list: [
              'Idea Definition: What you\'re building and for whom',
              'Kill Test: Hard questions about defensibility, platform risk, and competition',
              'Scoring: Quick 1-10 self-assessments',
              'Final Reflection: Your biggest unresolved concern',
            ],
          },
          {
            title: '4. Interpret Your Verdict',
            content: 'You\'ll receive one of four verdicts:',
            list: [
              'KILL: Fundamental weaknesses that execution can\'t fix',
              'FLIP: Potential exists but significant pivot required',
              'BUILD: Defensible with discipline—focus on moats',
              'BET: High risk but asymmetric upside justifies the gamble',
            ],
          },
          {
            title: '5. Review AI Analysis',
            content: 'The AI provides a confidence score, detailed rationale, and highlights any contradictions between your scores and written answers. Use this to identify blind spots.',
          },
        ],
      },
      jsonGuide: {
        title: 'Working with JSON & AI Assistants',
        intro: 'You can use AI assistants (ChatGPT, Claude, etc.) to help fill out the assessment JSON. This is great for exploring ideas quickly or when you want an AI to challenge your thinking.',
        sections: [
          {
            title: 'Why Use the JSON Workflow?',
            content: 'Benefits of the AI-assisted JSON approach:',
            list: [
              'Faster iteration: Test multiple idea variations quickly',
              'AI co-pilot: Let the AI push back on weak answers',
              'Structured thinking: The JSON format forces completeness',
              'Reproducible: Save and compare assessments over time',
            ],
          },
          {
            title: 'How It Works',
            content: 'Follow these steps:',
            steps: [
              'Copy the AI prompt below to your favorite AI assistant',
              'Describe your startup idea to the AI',
              'Answer the AI\'s follow-up questions honestly',
              'Get the completed JSON from the AI',
              'Upload the JSON to AI Idea Validator',
              'Review your AI-generated verdict',
            ],
          },
          {
            title: 'AI Prompt Template',
            content: 'Copy this prompt and paste it into ChatGPT, Claude, or any AI assistant:',
            isPrompt: true,
          },
          {
            title: 'Tips for Best Results',
            content: 'Get the most accurate assessment:',
            list: [
              'Be honest with the AI—it can\'t help if you\'re defensive',
              'Push back if the AI is too optimistic about your idea',
              'Ask the AI to play "devil\'s advocate" on weak areas',
              'Run the assessment twice with different framing to test robustness',
            ],
          },
        ],
      },
      copyButton: 'Copy Prompt',
      copiedButton: 'Copied!',
      backToSupport: 'Back to Support',
    },
    es: {
      title: 'Documentación',
      subtitle: 'Todo lo que necesitas para comenzar',
      tabs: {
        gettingStarted: 'Comenzar',
        jsonGuide: 'JSON y Flujo con IA',
      },
      gettingStarted: {
        title: 'Comenzando con AI Idea Validator',
        intro: 'AI Idea Validator ayuda a los fundadores a evaluar sus ideas de startup a través de una evaluación estructurada. Así es como sacarle el máximo provecho.',
        sections: [
          {
            title: '1. Elige Tu Camino',
            content: 'Cuando comiences la evaluación, tendrás dos opciones:',
            list: [
              'Evaluación Guiada (Recomendada): Responde 24 preguntas una a la vez con tooltips útiles y seguimiento de progreso.',
              'Subir JSON: Para usuarios avanzados que quieren pre-llenar respuestas usando un asistente de IA o procesar múltiples ideas.',
            ],
          },
          {
            title: '2. Responde Honestamente',
            content: 'La evaluación funciona mejor cuando eres brutalmente honesto. Las respuestas optimistas solo te perjudican. La IA detectará contradicciones entre tus puntuaciones y tus respuestas escritas.',
          },
          {
            title: '3. Entiende las Preguntas',
            content: 'Las preguntas están agrupadas en secciones:',
            list: [
              'Definición de Idea: Qué estás construyendo y para quién',
              'Kill Test: Preguntas difíciles sobre defendibilidad, riesgo de plataforma y competencia',
              'Puntuación: Auto-evaluaciones rápidas del 1-10',
              'Reflexión Final: Tu mayor preocupación sin resolver',
            ],
          },
          {
            title: '4. Interpreta Tu Veredicto',
            content: 'Recibirás uno de cuatro veredictos:',
            list: [
              'KILL: Debilidades fundamentales que la ejecución no puede arreglar',
              'FLIP: Existe potencial pero se requiere un pivote significativo',
              'BUILD: Defendible con disciplina—enfócate en los fosos',
              'BET: Alto riesgo pero el potencial asimétrico justifica la apuesta',
            ],
          },
          {
            title: '5. Revisa el Análisis de IA',
            content: 'La IA proporciona un puntaje de confianza, razonamiento detallado, y resalta contradicciones entre tus puntuaciones y respuestas escritas. Úsalo para identificar puntos ciegos.',
          },
        ],
      },
      jsonGuide: {
        title: 'Trabajando con JSON y Asistentes de IA',
        intro: 'Puedes usar asistentes de IA (ChatGPT, Claude, etc.) para ayudar a llenar el JSON de evaluación. Es genial para explorar ideas rápidamente o cuando quieres que una IA desafíe tu pensamiento.',
        sections: [
          {
            title: '¿Por Qué Usar el Flujo JSON?',
            content: 'Beneficios del enfoque JSON asistido por IA:',
            list: [
              'Iteración más rápida: Prueba múltiples variaciones de ideas rápidamente',
              'Co-piloto de IA: Deja que la IA cuestione respuestas débiles',
              'Pensamiento estructurado: El formato JSON fuerza completitud',
              'Reproducible: Guarda y compara evaluaciones a lo largo del tiempo',
            ],
          },
          {
            title: 'Cómo Funciona',
            content: 'Sigue estos pasos:',
            steps: [
              'Copia el prompt de IA abajo a tu asistente de IA favorito',
              'Describe tu idea de startup a la IA',
              'Responde las preguntas de seguimiento de la IA honestamente',
              'Obtén el JSON completado de la IA',
              'Sube el JSON a AI Idea Validator',
              'Revisa tu veredicto generado por IA',
            ],
          },
          {
            title: 'Plantilla de Prompt para IA',
            content: 'Copia este prompt y pégalo en ChatGPT, Claude, o cualquier asistente de IA:',
            isPrompt: true,
          },
          {
            title: 'Consejos para Mejores Resultados',
            content: 'Obtén la evaluación más precisa:',
            list: [
              'Sé honesto con la IA—no puede ayudar si estás a la defensiva',
              'Cuestiona si la IA es muy optimista sobre tu idea',
              'Pide a la IA que juegue al "abogado del diablo" en áreas débiles',
              'Ejecuta la evaluación dos veces con diferente enfoque para probar robustez',
            ],
          },
        ],
      },
      copyButton: 'Copiar Prompt',
      copiedButton: '¡Copiado!',
      backToSupport: 'Volver a Soporte',
    },
  };

  const t = content[language];
  const currentContent = activeTab === 'getting-started' ? t.gettingStarted : t.jsonGuide;

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/support"
          className="mb-8 inline-flex items-center text-sm text-neutral-600 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          {t.backToSupport}
        </Link>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {t.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800">
            <button
              onClick={() => setActiveTab('getting-started')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'getting-started'
                  ? 'bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {t.tabs.gettingStarted}
            </button>
            <button
              onClick={() => setActiveTab('json-guide')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'json-guide'
                  ? 'bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {t.tabs.jsonGuide}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {currentContent.title}
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {currentContent.intro}
          </p>

          <div className="mt-8 space-y-8">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {'steps' in section && section.steps && (
                  <ol className="mt-4 space-y-2">
                    {section.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}

                {'isPrompt' in section && section.isPrompt && (
                  <div className="mt-4">
                    <div className="relative">
                      <pre className="max-h-64 overflow-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
                        <code>{AI_PROMPT_TEMPLATE}</code>
                      </pre>
                      <button
                        onClick={handleCopyPrompt}
                        className="absolute right-2 top-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-500"
                      >
                        {copied ? t.copiedButton : t.copyButton}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
