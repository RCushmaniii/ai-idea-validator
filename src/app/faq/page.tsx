'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-start justify-between text-left"
          >
            <span className="text-base font-medium text-neutral-900 dark:text-white">
              {item.question}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`ml-4 h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {openIndex === index && (
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about AI Idea Validator',
      backToSupport: 'Back to Support',
      categories: [
        {
          name: 'General',
          faqs: [
            {
              question: 'What is AI Idea Validator?',
              answer: 'AI Idea Validator is a defensibility assessment tool that helps founders evaluate their startup ideas. It uses AI to analyze your responses, detect contradictions between your self-assessment and written answers, and provide an objective verdict on your idea\'s viability.',
            },
            {
              question: 'How long does the assessment take?',
              answer: 'The guided assessment takes about 5-10 minutes to complete. If you use the JSON upload option with an AI assistant, it may take longer depending on how thorough your conversation is.',
            },
            {
              question: 'Do I need to create an account?',
              answer: 'No. AI Idea Validator requires no signup, no email, and no account creation. You can start the assessment immediately.',
            },
            {
              question: 'Is my idea kept private?',
              answer: 'Yes. Your responses are processed in your browser and sent directly to the AI for analysis. We do not store your ideas on our servers. When you close your browser, the data disappears. The code is open source so you can verify this yourself.',
            },
          ],
        },
        {
          name: 'Verdicts',
          faqs: [
            {
              question: 'What does KILL mean?',
              answer: 'KILL means the idea has fundamental structural weaknesses that cannot be fixed with better execution. These are problems inherent to the business model itself—like extreme platform dependency, zero switching costs, or an easily commoditized offering. It\'s a signal to step back and reconsider the core concept.',
            },
            {
              question: 'What does FLIP mean?',
              answer: 'FLIP means the idea has potential, but requires a significant pivot to survive. There are elements worth keeping, but major risk areas need to be addressed before investing more time. Think of it as: "The kernel is good, but the shell needs to change."',
            },
            {
              question: 'What does BUILD mean?',
              answer: 'BUILD means the idea is defensible with discipline. You have real competitive advantages, but they require careful cultivation. Focus on building moats, avoid over-expansion, and execute with precision. The idea can work, but only if you protect what makes it defensible.',
            },
            {
              question: 'What does BET mean?',
              answer: 'BET means high risk but with asymmetric upside. The downside is significant—this could fail—but the potential reward justifies taking a calculated gamble. These are often ideas with strong network effects or winner-take-all dynamics.',
            },
            {
              question: 'Can I retake the assessment?',
              answer: 'Yes, and you should. Run the assessment multiple times with more honest answers each time. If an idea passes twice with genuinely honest responses, it\'s probably real. Many founders are too optimistic the first time.',
            },
          ],
        },
        {
          name: 'AI Analysis',
          faqs: [
            {
              question: 'How does the AI detect contradictions?',
              answer: 'The AI compares your numeric self-assessment scores (1-10 ratings) against your written responses. For example, if you rate your copycat risk as low (2/10) but describe a product that could be cloned in 30 days using public APIs, the AI flags this as a contradiction.',
            },
            {
              question: 'What is the confidence score?',
              answer: 'The confidence score indicates how certain the AI is about its verdict. Higher confidence means your responses were consistent and the patterns were clear. Lower confidence might indicate contradictory information or unusual edge cases.',
            },
            {
              question: 'Can the AI be wrong?',
              answer: 'Yes. The AI is a tool to challenge your thinking, not an oracle. It can miss context, misinterpret responses, or fail to understand nuances in your market. Use it as one input among many, not as the final word.',
            },
            {
              question: 'What if I disagree with the verdict?',
              answer: 'Good. Disagreement means you\'re thinking critically. Consider why you disagree: Are there factors the AI couldn\'t know? Or are you being defensive about a weakness? Run the test again with more detail in your written responses.',
            },
          ],
        },
        {
          name: 'Technical',
          faqs: [
            {
              question: 'What happens if I don\'t have an API key?',
              answer: 'The tool works without an API key using a heuristic-based fallback. You\'ll still get a verdict, but it won\'t include the AI-powered contradiction detection or nuanced analysis. For best results, the deployed version at ai-idea-validator.netlify.app uses a server-side API.',
            },
            {
              question: 'Can I self-host this tool?',
              answer: 'Yes. AI Idea Validator is open source (MIT license). Clone the repository, add your own OpenAI API key, and deploy wherever you like. See the GitHub repo for instructions.',
            },
            {
              question: 'What AI model is used?',
              answer: 'The assessment uses GPT-4o-mini for analysis. It\'s optimized for speed and cost while maintaining quality for this type of structured evaluation.',
            },
          ],
        },
      ],
    },
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre AI Idea Validator',
      backToSupport: 'Volver a Soporte',
      categories: [
        {
          name: 'General',
          faqs: [
            {
              question: '¿Qué es AI Idea Validator?',
              answer: 'AI Idea Validator es una herramienta de evaluación de defendibilidad que ayuda a los fundadores a evaluar sus ideas de startup. Usa IA para analizar tus respuestas, detectar contradicciones entre tu auto-evaluación y respuestas escritas, y proporcionar un veredicto objetivo sobre la viabilidad de tu idea.',
            },
            {
              question: '¿Cuánto tiempo toma la evaluación?',
              answer: 'La evaluación guiada toma aproximadamente 5-10 minutos. Si usas la opción de subir JSON con un asistente de IA, puede tomar más tiempo dependiendo de qué tan detallada sea tu conversación.',
            },
            {
              question: '¿Necesito crear una cuenta?',
              answer: 'No. AI Idea Validator no requiere registro, email ni creación de cuenta. Puedes comenzar la evaluación inmediatamente.',
            },
            {
              question: '¿Mi idea se mantiene privada?',
              answer: 'Sí. Tus respuestas se procesan en tu navegador y se envían directamente a la IA para análisis. No almacenamos tus ideas en nuestros servidores. Cuando cierras tu navegador, los datos desaparecen. El código es de código abierto para que puedas verificarlo tú mismo.',
            },
          ],
        },
        {
          name: 'Veredictos',
          faqs: [
            {
              question: '¿Qué significa KILL?',
              answer: 'KILL significa que la idea tiene debilidades estructurales fundamentales que no pueden arreglarse con mejor ejecución. Son problemas inherentes al modelo de negocio—como dependencia extrema de plataformas, cero costos de cambio, u oferta fácilmente commoditizable. Es una señal para reconsiderar el concepto central.',
            },
            {
              question: '¿Qué significa FLIP?',
              answer: 'FLIP significa que la idea tiene potencial, pero requiere un pivote significativo para sobrevivir. Hay elementos que vale la pena mantener, pero las áreas de riesgo principales necesitan abordarse antes de invertir más tiempo.',
            },
            {
              question: '¿Qué significa BUILD?',
              answer: 'BUILD significa que la idea es defendible con disciplina. Tienes ventajas competitivas reales, pero requieren cultivo cuidadoso. Enfócate en construir fosos, evita sobre-expandirte, y ejecuta con precisión.',
            },
            {
              question: '¿Qué significa BET?',
              answer: 'BET significa alto riesgo pero con potencial asimétrico. La desventaja es significativa—podría fallar—pero la recompensa potencial justifica tomar una apuesta calculada.',
            },
            {
              question: '¿Puedo repetir la evaluación?',
              answer: 'Sí, y deberías. Ejecuta la evaluación múltiples veces con respuestas más honestas cada vez. Si una idea pasa dos veces con respuestas genuinamente honestas, probablemente es real.',
            },
          ],
        },
        {
          name: 'Análisis de IA',
          faqs: [
            {
              question: '¿Cómo detecta contradicciones la IA?',
              answer: 'La IA compara tus puntuaciones numéricas de auto-evaluación (calificaciones 1-10) contra tus respuestas escritas. Por ejemplo, si calificas tu riesgo de copia como bajo (2/10) pero describes un producto que podría clonarse en 30 días, la IA marca esto como contradicción.',
            },
            {
              question: '¿Qué es el puntaje de confianza?',
              answer: 'El puntaje de confianza indica qué tan segura está la IA sobre su veredicto. Mayor confianza significa que tus respuestas fueron consistentes y los patrones claros. Menor confianza podría indicar información contradictoria.',
            },
            {
              question: '¿Puede la IA equivocarse?',
              answer: 'Sí. La IA es una herramienta para desafiar tu pensamiento, no un oráculo. Puede perder contexto, malinterpretar respuestas, o no entender matices de tu mercado. Úsala como un input entre muchos.',
            },
            {
              question: '¿Qué pasa si no estoy de acuerdo con el veredicto?',
              answer: 'Bien. El desacuerdo significa que estás pensando críticamente. Considera por qué no estás de acuerdo: ¿Hay factores que la IA no podía saber? ¿O estás siendo defensivo sobre una debilidad?',
            },
          ],
        },
        {
          name: 'Técnico',
          faqs: [
            {
              question: '¿Qué pasa si no tengo una API key?',
              answer: 'La herramienta funciona sin API key usando un fallback basado en heurísticas. Aún obtendrás un veredicto, pero no incluirá la detección de contradicciones ni análisis matizado. Para mejores resultados, la versión desplegada usa una API del lado del servidor.',
            },
            {
              question: '¿Puedo auto-hospedar esta herramienta?',
              answer: 'Sí. AI Idea Validator es de código abierto (licencia MIT). Clona el repositorio, agrega tu propia API key de OpenAI, y despliega donde quieras.',
            },
            {
              question: '¿Qué modelo de IA se usa?',
              answer: 'La evaluación usa GPT-4o-mini para análisis. Está optimizado para velocidad y costo mientras mantiene calidad para este tipo de evaluación estructurada.',
            },
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
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

        {/* FAQ Categories */}
        <div className="mt-12 space-y-12">
          {t.categories.map((category, index) => (
            <div key={index}>
              <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
                {category.name}
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-6 dark:border-neutral-800 dark:bg-neutral-900">
                <FAQAccordion items={category.faqs} />
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-lg border border-orange-200 bg-orange-50 p-6 text-center dark:border-orange-900/50 dark:bg-orange-950/30">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {language === 'en' ? 'Still have questions?' : '¿Aún tienes preguntas?'}
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {language === 'en'
              ? "Can't find what you're looking for? Reach out to us directly."
              : '¿No encuentras lo que buscas? Contáctanos directamente.'}
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-500"
          >
            {language === 'en' ? 'Contact Us' : 'Contáctanos'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
