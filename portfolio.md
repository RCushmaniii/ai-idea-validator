---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 2
portfolio_featured: true
portfolio_last_reviewed: "2026-03-16"

# === IDENTITY ===
title: "AI Idea Validator"
tagline: "Brutal startup defensibility assessment with AI contradiction detection"
slug: "ai-idea-validator"

# === CLASSIFICATION ===
category: "AI Automation"
target_audience: "Founders and solopreneurs validating startup ideas before committing resources"
tags:
  - "ai"
  - "startup-validation"
  - "openai"
  - "nextjs"
  - "defensibility"
  - "founder-tools"
  - "contradiction-detection"
  - "bilingual"

# === VISUALS ===
thumbnail: "/images/portfolio/aI-Idea-validator-thumb.jpg"
hero_images:
  - "/images/portfolio/aI-Idea-validator-01.webp"
  - "/images/portfolio/aI-Idea-validator-02.webp"
  - "/images/portfolio/aI-Idea-validator-03.webp"
  - "/images/portfolio/aI-Idea-validator-04.webp"
  - "/images/portfolio/aI-Idea-validator-05.webp"
  - "/images/portfolio/aI-Idea-validator-06.webp"
demo_video_url: "/video/aI-Idea-validator-brief.mp4"

# === LINKS ===
live_url: "https://ai-idea-validator.netlify.app/"
demo_url: "https://ai-idea-validator.netlify.app/"
case_study_url: ""

# === SALES CONTENT ===
problem_solved: |
  Founders waste months building ideas that are structurally replaceable because traditional validation tools ignore defensibility. Self-assessment alone can't catch optimism bias — founders consistently rate their moats high while describing products with no switching costs.
key_outcomes:
  - "23-question defensibility assessment across 4 sections with AI-powered contradiction detection"
  - "4 honest verdicts (KILL/FLIP/BUILD/BET) with confidence scores and detailed rationale"
  - "AI cross-references numeric self-assessment vs written responses to surface optimism bias"
  - "Full EN/ES bilingual support including AI-generated verdicts and analysis"
  - "Offline heuristic fallback — always returns a verdict, even without API access"
  - "Sub-3-second AI analysis via GPT-4o-mini"

# === TECH ===
tech_stack:
  - "Next.js 15"
  - "React 19"
  - "TypeScript"
  - "OpenAI GPT-4o-mini"
  - "Tailwind CSS 4"
  - "Netlify"
  - "Formspree"
complexity: "Production"

# === MEDIA: PORTFOLIO SLIDES ===
slides:
  - src: "/images/portfolio/aI-Idea-validator-01.webp"
    alt_en: "AI Idea Validator — Brutal honesty for founders who want the truth before they build"
    alt_es: "AI Idea Validator — Honestidad brutal para fundadores que quieren la verdad antes de construir"
  - src: "/images/portfolio/aI-Idea-validator-02.webp"
    alt_en: "The $50,000 Problem — building something structurally replaceable because nobody asked about defensibility"
    alt_es: "El Problema de $50,000 — construir algo estructuralmente reemplazable porque nadie pregunto sobre defensibilidad"
  - src: "/images/portfolio/aI-Idea-validator-03.webp"
    alt_en: "23 Questions That Matter — moats, platform risk, switching costs, and failure modes"
    alt_es: "23 Preguntas Que Importan — fosos, riesgo de plataforma, costos de cambio y modos de fallo"
  - src: "/images/portfolio/aI-Idea-validator-04.webp"
    alt_en: "Contradiction Detection — AI reads your scores AND your words, then flags where they diverge"
    alt_es: "Deteccion de Contradicciones — la IA lee tus puntuaciones Y tus palabras, luego senala donde divergen"
  - src: "/images/portfolio/aI-Idea-validator-05.webp"
    alt_en: "Four Verdicts, Zero Diplomacy — KILL, FLIP, BUILD, or BET with confidence scores"
    alt_es: "Cuatro Veredictos, Cero Diplomacia — KILL, FLIP, BUILD o BET con puntuaciones de confianza"
  - src: "/images/portfolio/aI-Idea-validator-06.webp"
    alt_en: "The Advisor Who Doesn't Need to Be Polite — AI delivers what mentors won't say"
    alt_es: "El Asesor Que No Necesita Ser Amable — la IA entrega lo que los mentores no dicen"
  - src: "/images/portfolio/aI-Idea-validator-07.webp"
    alt_en: "Privacy-First, Zero Storage — no accounts, no tracking, your idea stays yours"
    alt_es: "Privacidad Primero, Cero Almacenamiento — sin cuentas, sin rastreo, tu idea sigue siendo tuya"

# === MEDIA: VIDEO ===
video_url: "/video/aI-Idea-validator-brief.mp4"
video_poster: "/video/aI-Idea-validator-brief-poster.jpg"

# === OPTIONAL ===
date_completed: "2026-02"

# === REPO HEALTH STATUS ===
# Last audited: 2026-04-04
# Standards defined in: operating-system/delivery/repo-health-baseline.md
health_status:
  sentry: "-"
  testing: "-"
  ci_cd: "Y"
  health_endpoint: "Y"
  security_headers: "-"
  rate_limiting: "-"
  env_validation: "-"
  analytics: "DEFERRED"
  structured_logging: "-"
  dependabot: "Y"
  secret_scanning: "Y"
  db_backup: "-"
---

## Overview

AI Idea Validator is a structured defensibility assessment for founders and solopreneurs. It goes beyond the standard "is there a market?" question to ask the one almost nobody asks systematically: **can this idea be defended once it's proven to work?**

The tool walks users through 23 questions covering moats, platform risk, lock-in, switching costs, and failure modes. GPT-4o-mini then reads both the numeric self-assessment scores and the written qualitative responses, detects contradictions between the two, and delivers one of four verdicts — KILL, FLIP, BUILD, or BET — with specific reasoning and a confidence score.

No account required. No data stored. No tracking. Answer the questions, get the verdict, close the browser.

## The Challenge

- **The $50,000 problem:** Founders validate demand and build products only to discover they have no moat. A competitor with more funding launches the same thing because nothing about the original was structurally difficult to copy.
- **Optimism bias is invisible from the inside:** Founders who rate their competitive moat 8/10 then describe a product any developer could replicate in a weekend. Self-assessment measures confidence, not reality.
- **The encouragement industrial complex:** Accelerators, mentors, and investors have structural incentives to be positive. Almost nobody tells a founder "this idea has a structural flaw that execution can't fix."
- **Existing tools ask the wrong question:** Lean Canvas, Business Model Canvas, and YC's application all evaluate viability — none systematically probe defensibility.

## The Solution

**23-question structured assessment:** Four sections — Idea Definition, Scoring, Qualitative Deep-Dives, and Self-Reflection — probe defensibility from multiple angles. Each question targets a documented startup failure mode.

**AI-powered contradiction detection:** GPT-4o-mini cross-references numeric scores against written responses and flags specific mismatches. "You rated your competitive moat 8/10 but described a product with no switching costs — here's why those two assessments are incompatible."

**Four honest verdicts:** KILL (structural flaws execution can't fix), FLIP (valuable insight but current form is vulnerable — pivots identified), BUILD (real defensibility if moats are strengthened), or BET (high risk with asymmetric upside). Each verdict includes a confidence score and detailed rationale.

**Full bilingual support:** The entire experience — UI, questions, AI-generated verdicts, contradiction analysis — works natively in both English and Spanish. The AI generates output in whichever language the user selects.

**Offline heuristic fallback:** When the API is unavailable, a heuristic scoring algorithm generates verdicts from numeric inputs. Less nuanced, but the tool always works.

## Technical Highlights

- **Server-side AI integration** via Next.js API routes — OpenAI keys never reach the client bundle
- **Contradiction detection engine** cross-references structured numeric data against unstructured text using engineered GPT prompts with structured output parsing
- **Graceful degradation** with heuristic-based verdicts when the API is unavailable — always returns a result, never fails silently
- **Context-based state architecture** (KillTestContext, LanguageContext, ThemeContext) with zero prop-drilling
- **JSON import/export schema (v2.0)** enabling programmatic batch analysis and archiving
- **Zero persistent storage** — no accounts, no databases, no cookies, no analytics
- **Bilingual AI output** — GPT generates verdicts natively in the selected language, not post-translated

## Results

- **For Founders:** Get a structurally honest assessment of defensibility in under 3 seconds — before investing months of development time. The contradiction detection catches the optimism bias that self-assessment alone misses.
- **Technical Demonstration:** Production-grade Next.js 15 application with server-side AI integration, graceful degradation, bilingual AI output generation, and zero-storage privacy architecture. Sub-3-second analysis round-trips through GPT-4o-mini with structured output parsing.
