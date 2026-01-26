# AI Idea Validator

A defensibility assessment tool that uses AI to evaluate startup ideas and detect founder optimism bias. Analyzes 23 questions across 4 sections, then generates a verdict (KILL, FLIP, BUILD, or BET) with contradiction detection between self-assessment scores and written responses.

## Key Features

| Feature | Benefit |
|---------|---------|
| AI-Driven Verdicts | GPT-4o-mini analyzes qualitative responses, not just numeric scores |
| Contradiction Detection | Identifies gaps between founder self-assessment and written answers |
| Score Adjustment | Shows difference between perceived risk and AI-evaluated risk |
| Bilingual Support | Full English and Spanish support, including AI-generated content |
| Offline Fallback | Heuristic-based analysis when API is unavailable |
| JSON Import/Export | Prepare assessments offline or integrate with other AI workflows |

## Quick Start

### Prerequisites

- Node.js 18.17 or higher
- OpenAI API key (optional, enables AI analysis)

### Installation

```powershell
# 1. Clone the repository
git clone https://github.com/RCushmaniii/ai-idea-validator.git
cd ai-idea-validator

# 2. Install dependencies
npm install

# 3. Configure environment (optional, for AI features)
copy .env.example .env
notepad .env
# Add your OpenAI API key: OPENAI_API_KEY=sk-your-key

# 4. Start development server
npm run dev
```

Open http://localhost:3000 in your browser. Expected: Homepage loads with "AI Idea Validator" header.

## Verdict Types

| Verdict | Meaning |
|---------|---------|
| **KILL** | Fundamentally weak. Too many structural problems. Move on. |
| **FLIP** | Has potential but needs a significant pivot. Rethink positioning or model. |
| **BUILD** | Defensible with discipline. Execute carefully and focus on moats. |
| **BET** | Risky but asymmetric upside. The potential reward justifies the gamble. |

## Project Structure

```
ai-idea-validator/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/analyze/        # AI analysis API endpoint
│   │   ├── about/              # About page
│   │   ├── kill-test/          # Main assessment flow
│   │   ├── privacy/            # Privacy policy
│   │   └── terms/              # Terms of service
│   ├── components/
│   │   ├── home/               # Landing page components
│   │   └── kill-test/          # Assessment UI components
│   ├── contexts/               # React context providers
│   │   ├── KillTestContext.tsx # Assessment state management
│   │   ├── LanguageContext.tsx # i18n support
│   │   └── ThemeContext.tsx    # Dark/light mode
│   └── lib/
│       ├── analyzeIdea.ts      # AI analysis logic
│       ├── killTestQuestions.ts # Question definitions
│       └── translations.ts     # EN/ES translations
├── INPUT_TEMPLATE.json         # v2.0 JSON schema for structured input
├── template.md                 # Kill test framework documentation
├── netlify.toml                # Netlify deployment configuration
└── .env.example                # Environment variable template
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Webpack) |
| `npm run dev:turbo` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run typecheck` | TypeScript type checking |
| `npm run ci` | Full CI pipeline (lint + typecheck + build) |

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for AI-powered analysis. Without this, falls back to heuristic analysis. |

### JSON Input Schema

For programmatic or AI-assisted workflows, use `INPUT_TEMPLATE.json` (v2.0):

```json
{
  "meta": {
    "schema_version": "2.0",
    "language": "en"
  },
  "idea_definition": {
    "one_liner": "Your idea in one sentence",
    "what_disappears_if_product_dies": "Customer impact"
  },
  "scoring": {
    "copycat_risk": 5,
    "platform_risk": 5,
    "lock_in_strength": 5,
    "pricing_power": 5
  },
  "self_reflection": {
    "biggest_unresolved_risk": "The elephant in the room"
  }
}
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.9 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| OpenAI API | gpt-4o-mini | AI analysis |

## Deployment

### Netlify (Recommended)

The repository includes `netlify.toml` with optimized configuration:

```powershell
# Build command
npm run build

# Publish directory
.next
```

Set `OPENAI_API_KEY` in Netlify environment variables for AI features.

### Manual Deployment

```powershell
# Build production bundle
npm run build

# Start production server
npm run start
```

## Security

- API keys stored in environment variables only
- OpenAI calls made server-side via API route
- No client-side exposure of secrets
- Input sanitization on all user responses

## Philosophy

> Most failed products were technically correct. They failed because they were replaceable.

This tool exists to ensure that if you build something, it becomes deeply annoying to turn off.

## License

MIT

## Version

v1.0.0 - Initial Release

### Changelog

- AI-driven verdict generation with GPT-4o-mini
- Contradiction detection between scores and written responses
- Full English and Spanish language support
- JSON import/export for structured workflows
- Offline heuristic fallback when API unavailable
- Dark/light theme support
- Mobile-responsive design

---

Built for founders who value their time.
