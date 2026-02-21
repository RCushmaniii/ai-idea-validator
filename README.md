# AI Idea Validator

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

> A brutally honest defensibility assessment for founders. Find out if your business idea can survive competition, platform changes, and solo-founder realities before you build.

## Overview

AI Idea Validator is a structured assessment tool that evaluates startup ideas through the lens of defensibility — not just viability. Founders answer 23 targeted questions across four sections covering competitive moats, platform risk, lock-in strength, and failure modes. The tool then uses GPT-4o-mini to generate a frank verdict: KILL, FLIP, BUILD, or BET.

What sets this apart from generic idea validation is contradiction detection. The AI compares a founder's numeric self-assessment scores against their written responses, surfacing the optimism bias that kills most startups. If you rate your competitive moat 8/10 but describe a product that any developer could replicate in a weekend, the tool catches that.

The application runs fully bilingual in English and Spanish, includes an offline heuristic fallback when no API key is available, and supports JSON import/export for programmatic workflows.

## The Challenge

Most founders fail not because their ideas are bad, but because their ideas are structurally replaceable. Traditional validation tools focus on market fit and execution — they ask "can you build this?" but never "can you defend this?"

- **Founder optimism bias is invisible from the inside.** Founders consistently overrate their competitive position when self-assessing. There's no mechanism to catch the gap between perception and reality.
- **Defensibility analysis requires structured thinking.** Asking "is your idea defensible?" gets a confident "yes" every time. Breaking it into 23 specific questions across moat types, platform dependencies, and failure modes forces honest answers.
- **Existing tools are too gentle.** The startup ecosystem rewards encouragement over honesty. Founders need a tool that says "KILL this idea" when the structure doesn't hold up.

## The Solution

**Structured assessment over gut feeling:** 23 questions organized into four sections (Idea Definition, Scoring, Qualitative Deep-Dives, Self-Reflection) force founders to articulate specifics rather than generalities. Each question targets a known defensibility failure mode.

**AI-powered contradiction detection:** GPT-4o-mini analyzes both the numeric scores and written responses together. When a founder rates pricing power 7/10 but describes a commodity product, the AI flags the contradiction with specific reasoning — not just a generic warning.

**Four honest verdicts:** Instead of a percentage score, the tool delivers a verdict with clear implications:
- **KILL** — Structural weaknesses that no amount of execution can fix
- **FLIP** — Potential exists but requires a significant pivot
- **BUILD** — Defensible with discipline; focus on moats
- **BET** — High risk but asymmetric upside justifies the gamble

**Bilingual by design:** Full Spanish support including AI-generated rationale and contradiction explanations, not just translated UI labels.

## Technical Highlights

- **Next.js 15 App Router** with server-side API routes for secure OpenAI integration — API keys never reach the client bundle
- **Contradiction detection algorithm** that cross-references numeric self-assessment against qualitative written responses using structured GPT prompts
- **Graceful degradation** via heuristic-based verdict generation when the OpenAI API is unavailable, ensuring the tool always returns a result
- **JSON schema (v2.0)** for import/export, enabling programmatic workflows and batch analysis
- **Context-based state management** (KillTestContext, LanguageContext, ThemeContext) keeping the assessment flow, i18n, and theming cleanly separated
- **Barrel exports** (`components/index.ts`) for clean import paths across the component tree

## Getting Started

### Prerequisites

- Node.js >= 18.17
- OpenAI API key (optional — enables AI-powered analysis)

### Installation

```powershell
# Clone the repository
git clone https://github.com/RCushmaniii/ai-idea-validator.git
cd ai-idea-validator

# Install dependencies
npm install

# Configure environment (optional, for AI features)
cp .env.example .env
notepad .env
# Add your OpenAI API key: OPENAI_API_KEY=sk-your-key

# Start development server
npm run dev
# Ready on http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | Enables AI-powered verdict generation. Without it, the tool uses heuristic fallback. |

## Live Demo

**[Try it live](https://ai-idea-validator.netlify.app)**

1. Click "Run the AI Idea Validator" on the homepage
2. Answer 23 questions about your startup idea across all four sections
3. Review your AI-generated verdict with contradiction analysis and score comparison

## Project Structure

```
ai-idea-validator/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts    # OpenAI API endpoint
│   │   ├── kill-test/page.tsx      # Main assessment flow
│   │   ├── about/page.tsx          # About page
│   │   ├── contact/page.tsx        # Contact form (Formspree)
│   │   ├── docs/page.tsx           # Documentation
│   │   ├── faq/page.tsx            # FAQ
│   │   ├── support/page.tsx        # Support hub
│   │   ├── privacy/page.tsx        # Privacy policy
│   │   └── terms/page.tsx          # Terms of service
│   ├── components/
│   │   ├── Header.tsx              # Navigation with orange logo
│   │   ├── Footer.tsx              # Site footer
│   │   ├── home/                   # Landing page sections
│   │   └── kill-test/              # Assessment components
│   ├── contexts/
│   │   ├── KillTestContext.tsx      # Assessment state + API calls
│   │   ├── LanguageContext.tsx      # EN/ES translations
│   │   └── ThemeContext.tsx         # Dark/light mode
│   └── lib/
│       ├── killTestQuestions.ts     # 23 question definitions
│       ├── translations.ts          # All UI strings (EN/ES)
│       └── analyzeIdea.ts           # Analysis utilities
├── INPUT_TEMPLATE.json              # v2.0 JSON schema
├── .env.example                     # Environment template
├── netlify.toml                     # Deployment config
└── package.json
```

## Deployment

### Netlify

The repository includes `netlify.toml` pre-configured:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Set `OPENAI_API_KEY` in Netlify environment variables for AI features.

### Manual

```powershell
npm run build
npm run start
# Server runs on http://localhost:3000
```

## Security

- API keys stored in environment variables only — never included in client bundle
- OpenAI calls routed through server-side API route (`/api/analyze`)
- Input sanitization on all user responses before API submission
- Honeypot spam protection on contact form
- No user accounts, no persistent storage, no tracking

## Results

| Metric | Detail |
|--------|--------|
| Assessment depth | 23 questions across 4 sections covering defensibility, risk, and failure modes |
| Verdict types | 4 outcomes (KILL/FLIP/BUILD/BET) with confidence scores and detailed rationale |
| AI response time | Sub-3-second analysis via GPT-4o-mini |
| Language support | Full bilingual EN/ES including AI-generated content |
| Offline capability | Heuristic fallback when API unavailable |

The tool demonstrates that defensibility analysis doesn't require complex modeling — structured questions combined with contradiction detection surface the gaps that founders miss through self-assessment alone.

## Contact

**Robert Cushman**
Business Solution Architect & Full-Stack Developer
Guadalajara, Mexico

📧 info@cushlabs.ai
🔗 [GitHub](https://github.com/RCushmaniii) • [LinkedIn](https://linkedin.com/in/robertcushman) • [Portfolio](https://cushlabs.ai)

## License

© 2026 Robert Cushman. All rights reserved. See [LICENSE](LICENSE) for details.

---

*Last Updated: 2026-02-20*
