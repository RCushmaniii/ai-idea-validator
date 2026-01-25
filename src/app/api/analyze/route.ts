import { NextResponse } from 'next/server';
import type { TestAnswers } from '@/contexts/KillTestContext';

export type Verdict = 'kill' | 'flip' | 'build' | 'bet';

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

const ANALYSIS_PROMPT = `You are a brutally honest startup idea evaluator. Your job is to cut through founder optimism and identify real weaknesses.

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

function buildPrompt(answers: TestAnswers): string {
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

  return ANALYSIS_PROMPT
    .replace('{RESPONSES}', JSON.stringify(responses, null, 2))
    .replace('{COPYCAT_RISK}', String(copycatRisk))
    .replace('{PLATFORM_RISK}', String(platformRisk))
    .replace('{LOCKIN_STRENGTH}', String(lockInStrength))
    .replace('{PRICING_POWER}', String(pricingPower));
}

export async function POST(request: Request) {
  try {
    const { answers } = await request.json() as { answers: TestAnswers };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return offline analysis if no API key
      return NextResponse.json(analyzeOffline(answers));
    }

    const prompt = buildPrompt(answers);

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
            content: 'You are a brutally honest startup idea evaluator. Always respond with valid JSON only.',
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
function analyzeOffline(answers: TestAnswers): AnalysisResult {
  const copycatRisk = Number(answers.copycatRiskScore) || 5;
  const platformRisk = Number(answers.platformRiskScore) || 5;
  const lockInStrength = Number(answers.lockInStrengthScore) || 5;
  const pricingPower = Number(answers.pricingPowerScore) || 5;

  const riskScore = (copycatRisk + platformRisk) / 2;
  const strengthScore = (lockInStrength + pricingPower) / 2;
  const netScore = strengthScore - riskScore;

  let verdict: Verdict;
  let rationale: string;

  if (netScore <= -3) {
    verdict = 'kill';
    rationale = 'High risks combined with weak defensibility signals. The combination of copycat vulnerability and platform dependency makes this structurally fragile.';
  } else if (netScore <= 0) {
    verdict = 'flip';
    rationale = 'The risk-to-strength ratio suggests a pivot is needed. Consider repositioning toward stronger lock-in or reduced platform dependency.';
  } else if (netScore <= 3) {
    verdict = 'bet';
    rationale = 'Moderate defensibility with manageable risks. Success depends heavily on execution speed and building moats before competitors catch up.';
  } else {
    verdict = 'build';
    rationale = 'Strong fundamentals with good lock-in potential. Focus on deepening customer relationships and expanding the moat while you have momentum.';
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
