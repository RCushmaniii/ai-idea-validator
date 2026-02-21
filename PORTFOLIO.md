---
# =============================================================================
# PORTFOLIO.md — AI Idea Validator
# =============================================================================
portfolio_enabled: true
portfolio_priority: 1
portfolio_featured: true
portfolio_last_reviewed: "2026-02-20"

title: "AI Idea Validator"
tagline: "Brutal startup defensibility assessment powered by AI contradiction detection"
slug: "ai-idea-validator"

category: "AI Automation"
target_audience: "Founders and solo entrepreneurs evaluating startup ideas before building"
tags:
  - "ai"
  - "startup-validation"
  - "openai"
  - "nextjs"
  - "defensibility"
  - "founder-tools"
  - "contradiction-detection"
  - "bilingual"

thumbnail: "/portfolio/ai-idea-validator.png"
hero_images:
  - "/portfolio/ai-idea-validator-hero-01.png"
  - "/portfolio/ai-idea-validator-hero-02.png"
  - "/portfolio/ai-idea-validator-hero-03.png"
demo_video_url: ""

live_url: "https://ai-idea-validator.netlify.app/"
demo_url: "https://ai-idea-validator.netlify.app/"
case_study_url: ""

problem_solved: |
  Founders waste months or years building ideas that are structurally replaceable — not because the ideas are bad, but because they lack defensibility. Traditional validation tools focus on execution and market fit while ignoring whether an idea can survive competition, platform changes, and solo-founder realities. Self-assessment alone can't catch optimism bias.

key_outcomes:
  - "23-question structured assessment covering moats, platform risk, lock-in, and failure modes"
  - "AI-powered contradiction detection comparing numeric scores vs written responses"
  - "4 honest verdicts (KILL/FLIP/BUILD/BET) with confidence scores and detailed rationale"
  - "Sub-3-second AI analysis via GPT-4o-mini"
  - "Full bilingual support (EN/ES) including AI-generated content"
  - "Offline heuristic fallback when API is unavailable"

tech_stack:
  - "Next.js 15"
  - "React 19"
  - "TypeScript"
  - "OpenAI GPT-4o-mini"
  - "Tailwind CSS 4"
  - "Netlify"
  - "Formspree"

complexity: "Production"
---

## Overview

AI Idea Validator is a structured defensibility assessment tool that forces founders to confront the hard questions about their startup ideas before investing time and capital. Instead of asking "is this a good idea?", it asks 23 targeted questions across four sections: Idea Definition, Scoring, Qualitative Deep-Dives, and Self-Reflection.

The tool feeds both numeric self-assessments and written qualitative responses to GPT-4o-mini, which generates a frank verdict — KILL, FLIP, BUILD, or BET — along with contradiction analysis that surfaces the gap between what founders believe and what they've actually described.

Built as a Next.js 15 application with full bilingual support (English and Spanish), it runs on Netlify with a heuristic fallback for offline use. No accounts required, no data stored, no tracking.

## The Challenge

- **Optimism bias is invisible from the inside.** Founders consistently overrate their competitive position. A numeric score of 8/10 on "competitive moat" paired with a description of a product any developer could clone in a weekend — that contradiction goes unnoticed in traditional self-assessment.
- **Defensibility is the missing lens.** Market validation tools ask "will people buy this?" but never "can someone else build this cheaper tomorrow?" Structural replaceability kills more startups than bad product-market fit.
- **Existing tools are too encouraging.** The startup ecosystem rewards optimism over honesty. Founders need an assessment that delivers a KILL verdict when the structure doesn't support the ambition.

## The Solution

**Structured questioning over intuition:**
23 questions organized into four sections force founders to articulate specific answers about moats, dependencies, and failure modes. Each question targets a known defensibility weakness — no filler, no softballs.

**AI contradiction detection:**
GPT-4o-mini cross-references numeric self-assessment scores against written qualitative responses. When a founder rates pricing power 7/10 but describes a commodity market, the AI flags the specific mismatch with reasoning.

**Four honest verdicts:**
KILL (structural failure, stop building), FLIP (potential but needs major pivot), BUILD (defensible with discipline), or BET (high risk, asymmetric upside). Each comes with a confidence score and detailed rationale — not a vague encouragement.

**Bilingual by design:**
Full Spanish support including AI-generated analysis, contradiction explanations, and UI — not just translated labels.

## Technical Highlights

- **Server-side AI integration** via Next.js API routes ensures OpenAI keys never reach the client bundle
- **Contradiction detection** cross-references structured numeric data against unstructured text using carefully engineered GPT prompts
- **Graceful degradation** with heuristic-based verdicts when the API is unavailable — the tool always returns a result
- **Context-based state architecture** (KillTestContext, LanguageContext, ThemeContext) keeping assessment flow, i18n, and theming cleanly separated
- **JSON import/export schema (v2.0)** enabling programmatic batch analysis workflows
- **Honeypot spam protection** on the Formspree-powered contact form
- **Zero persistent storage** — no accounts, no databases, no tracking; data exists only in the browser session

## Results

**For the Founder:**
- Structured defensibility analysis across 23 dimensions that self-assessment alone can't provide
- Contradiction detection that surfaces optimism bias with specific evidence
- Actionable verdicts (KILL/FLIP/BUILD/BET) with rationale — not a percentage score to misinterpret
- Full bilingual experience for the Latin American founder market

**Technical Demonstration:**
- End-to-end AI integration with structured prompt engineering and graceful fallback
- Production-quality Next.js application with server-side API security
- Internationalization architecture that extends to AI-generated content, not just static strings
- Clean state management patterns applicable to any multi-step assessment or wizard flow
