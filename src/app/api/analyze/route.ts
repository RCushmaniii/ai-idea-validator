import { NextResponse } from 'next/server';
import type { TestAnswers } from '@/contexts/KillTestContext';

export type Verdict = 'kill' | 'flip' | 'build' | 'bet';
export type Language = 'en' | 'es';

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  rationale: string;
  contradictions: Array<{
    field: string;
    userScore: number;
    issue: string;
  }>;
  adjustedScores: {
    copycatRisk: number;
    platformRisk: number;
    lockInStrength: number;
    pricingPower: number;
  };
}

const ANALYSIS_PROMPT_EN = `You are a brutally honest startup idea evaluator. Your job is to cut through founder optimism and identify real weaknesses.

Analyze this founder's responses and:

1. Generate a verdict:
   - KILL: Fundamentally weak. Too many structural problems. Move on.
   - FLIP: Has potential but needs a significant pivot. Rethink the positioning or model.
   - BUILD: Defensible with discipline. Execute carefully and focus on moats.
   - BET: Risky but asymmetric upside. The potential reward justifies the gamble.

2. Identify contradictions between their written answers and self-assessment scores. Look for:
   - Optimistic scores that don't match concerning written responses
   - Claims of defensibility without evidence
   - Underestimating platform or copycat risk
   - Overestimating lock-in or pricing power

3. Provide adjusted risk scores based on what they actually described (not what they scored themselves).

## Founder Responses:
{RESPONSES}

## Self-Assessment Scores:
- Copycat Risk: {COPYCAT_RISK}/10 (higher = easier to copy)
- Platform Risk: {PLATFORM_RISK}/10 (higher = more dependent)
- Lock-in Strength: {LOCKIN_STRENGTH}/10 (higher = stickier)
- Pricing Power: {PRICING_POWER}/10 (higher = can charge more)

Be direct and honest. If this idea has fatal flaws, say so clearly. Founders need truth, not encouragement.

Respond in JSON only (no markdown, no explanation outside JSON):
{
  "verdict": "kill" | "flip" | "build" | "bet",
  "confidence": 0-100,
  "rationale": "2-3 sentences explaining your verdict. Be specific about the key issues or strengths.",
  "contradictions": [
    {"field": "fieldName", "userScore": 8, "issue": "Specific contradiction explanation..."}
  ],
  "adjustedScores": {
    "copycatRisk": 1-10,
    "platformRisk": 1-10,
    "lockInStrength": 1-10,
    "pricingPower": 1-10
  }
}`;

const ANALYSIS_PROMPT_ES = `Eres un evaluador de ideas de startup brutalmente honesto. Tu trabajo es cortar el optimismo del fundador e identificar debilidades reales.

Analiza las respuestas de este fundador y:

1. Genera un veredicto:
   - KILL: Fundamentalmente debil. Demasiados problemas estructurales. Sigue adelante.
   - FLIP: Tiene potencial pero necesita un pivote significativo. Repiensa el posicionamiento o modelo.
   - BUILD: Defendible con disciplina. Ejecuta cuidadosamente y enfocate en los fosos.
   - BET: Arriesgado pero con potencial asimetrico. La recompensa potencial justifica la apuesta.

2. Identifica contradicciones entre sus respuestas escritas y sus puntuaciones de autoevaluacion. Busca:
   - Puntuaciones optimistas que no coinciden con respuestas escritas preocupantes
   - Afirmaciones de defendibilidad sin evidencia
   - Subestimacion del riesgo de plataforma o de copia
   - Sobreestimacion del lock-in o poder de precios

3. Proporciona puntuaciones de riesgo ajustadas basadas en lo que realmente describieron (no lo que puntuaron).

## Respuestas del Fundador:
{RESPONSES}

## Puntuaciones de Autoevaluacion:
- Riesgo de Copia: {COPYCAT_RISK}/10 (mayor = mas facil de copiar)
- Riesgo de Plataforma: {PLATFORM_RISK}/10 (mayor = mas dependiente)
- Fuerza de Lock-in: {LOCKIN_STRENGTH}/10 (mayor = mas pegajoso)
- Poder de Precios: {PRICING_POWER}/10 (mayor = puede cobrar mas)

Se directo y honesto. Si esta idea tiene fallas fatales, dilo claramente. Los fundadores necesitan verdad, no aliento.

Responde SOLO en JSON (sin markdown, sin explicacion fuera del JSON). El rationale y las contradicciones DEBEN estar en espanol:
{
  "verdict": "kill" | "flip" | "build" | "bet",
  "confidence": 0-100,
  "rationale": "2-3 oraciones explicando tu veredicto en espanol. Se especifico sobre los problemas o fortalezas clave.",
  "contradictions": [
    {"field": "fieldName", "userScore": 8, "issue": "Explicacion especifica de la contradiccion en espanol..."}
  ],
  "adjustedScores": {
    "copycatRisk": 1-10,
    "platformRisk": 1-10,
    "lockInStrength": 1-10,
    "pricingPower": 1-10
  }
}`;

function buildPrompt(answers: TestAnswers, language: Language): string {
  const responses = {
    ideaDefinition: answers.ideaDefinition || '',
    targetCustomer: answers.targetCustomer || '',
    coreWorkflow: answers.coreWorkflow || '',
    monetization: answers.monetization || '',
    platformDependencies: answers.platformDependencies || '',
    disappearanceTest: answers.disappearanceTest || '',
    inevitabilityTest: answers.inevitabilityTest || '',
    copycatVelocity: answers.copycatVelocity || '',
    aiCommoditization: answers.aiCommoditization || '',
    platformHostageRisk: answers.platformHostageRisk || '',
    dataMoatReality: answers.dataMoatReality || '',
    dataCompounding: answers.dataCompounding || '',
    workflowLockIn: answers.workflowLockIn || '',
    pricingPower: answers.pricingPower || '',
    budgetOwner: answers.budgetOwner || '',
    soloFounderRisk: answers.soloFounderRisk || '',
    scalingStress: answers.scalingStress || '',
    likelyFailureMode: answers.likelyFailureMode || '',
    biggestUnresolvedRisk: answers.biggestUnresolvedRisk || '',
  };

  const copycatRisk = Number(answers.copycatRiskScore) || 5;
  const platformRisk = Number(answers.platformRiskScore) || 5;
  const lockInStrength = Number(answers.lockInStrengthScore) || 5;
  const pricingPower = Number(answers.pricingPowerScore) || 5;

  const promptTemplate = language === 'es' ? ANALYSIS_PROMPT_ES : ANALYSIS_PROMPT_EN;

  return promptTemplate
    .replace('{RESPONSES}', JSON.stringify(responses, null, 2))
    .replace('{COPYCAT_RISK}', String(copycatRisk))
    .replace('{PLATFORM_RISK}', String(platformRisk))
    .replace('{LOCKIN_STRENGTH}', String(lockInStrength))
    .replace('{PRICING_POWER}', String(pricingPower));
}

export async function POST(request: Request) {
  try {
    const { answers, language = 'en' } = await request.json() as { answers: TestAnswers; language?: Language };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return offline analysis if no API key
      return NextResponse.json(analyzeOffline(answers, language));
    }

    const prompt = buildPrompt(answers, language);

    const systemMessage = language === 'es'
      ? 'Eres un evaluador de ideas de startup brutalmente honesto. Siempre responde con JSON valido solamente. Todas las respuestas de texto deben estar en espanol.'
      : 'You are a brutally honest startup idea evaluator. Always respond with valid JSON only.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1024,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(analyzeOffline(answers));
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(analyzeOffline(answers));
    }

    const result = JSON.parse(content) as AnalysisResult;

    // Validate and sanitize
    if (!['kill', 'flip', 'build', 'bet'].includes(result.verdict)) {
      result.verdict = 'bet';
    }

    result.confidence = Math.max(0, Math.min(100, result.confidence || 50));
    result.contradictions = result.contradictions || [];
    result.adjustedScores = {
      copycatRisk: Math.max(1, Math.min(10, result.adjustedScores?.copycatRisk || 5)),
      platformRisk: Math.max(1, Math.min(10, result.adjustedScores?.platformRisk || 5)),
      lockInStrength: Math.max(1, Math.min(10, result.adjustedScores?.lockInStrength || 5)),
      pricingPower: Math.max(1, Math.min(10, result.adjustedScores?.pricingPower || 5)),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}

// Fallback analysis when API is unavailable
function analyzeOffline(answers: TestAnswers, language: Language = 'en'): AnalysisResult {
  const copycatRisk = Number(answers.copycatRiskScore) || 5;
  const platformRisk = Number(answers.platformRiskScore) || 5;
  const lockInStrength = Number(answers.lockInStrengthScore) || 5;
  const pricingPower = Number(answers.pricingPowerScore) || 5;

  const riskScore = (copycatRisk + platformRisk) / 2;
  const strengthScore = (lockInStrength + pricingPower) / 2;
  const netScore = strengthScore - riskScore;

  let verdict: Verdict;
  let rationale: string;

  const rationales = {
    en: {
      kill: 'High risks combined with weak defensibility signals. The combination of copycat vulnerability and platform dependency makes this structurally fragile.',
      flip: 'The risk-to-strength ratio suggests a pivot is needed. Consider repositioning toward stronger lock-in or reduced platform dependency.',
      bet: 'Moderate defensibility with manageable risks. Success depends heavily on execution speed and building moats before competitors catch up.',
      build: 'Strong fundamentals with good lock-in potential. Focus on deepening customer relationships and expanding the moat while you have momentum.',
    },
    es: {
      kill: 'Altos riesgos combinados con senales de defendibilidad debiles. La combinacion de vulnerabilidad a copias y dependencia de plataforma hace esto estructuralmente fragil.',
      flip: 'La relacion riesgo-fortaleza sugiere que se necesita un pivote. Considera reposicionarte hacia un lock-in mas fuerte o menor dependencia de plataforma.',
      bet: 'Defendibilidad moderada con riesgos manejables. El exito depende en gran medida de la velocidad de ejecucion y construir fosos antes de que los competidores te alcancen.',
      build: 'Fundamentos solidos con buen potencial de lock-in. Enfocate en profundizar las relaciones con clientes y expandir el foso mientras tienes impulso.',
    },
  };

  if (netScore <= -3) {
    verdict = 'kill';
    rationale = rationales[language].kill;
  } else if (netScore <= 0) {
    verdict = 'flip';
    rationale = rationales[language].flip;
  } else if (netScore <= 3) {
    verdict = 'bet';
    rationale = rationales[language].bet;
  } else {
    verdict = 'build';
    rationale = rationales[language].build;
  }

  return {
    verdict,
    confidence: 60,
    rationale,
    contradictions: [],
    adjustedScores: {
      copycatRisk,
      platformRisk,
      lockInStrength,
      pricingPower,
    },
  };
}
