# AI Idea Validator

A defensibility assessment tool that uses AI to evaluate startup ideas and detect founder optimism bias. Analyzes 23 questions across 4 sections, generates verdicts (KILL/FLIP/BUILD/BET), and identifies contradictions between self-assessment scores and written responses.

## Live Demo

**https://ai-idea-validator.netlify.app**

Try it:
1. Click "Run the AI Idea Validator" on the homepage
2. Answer 23 questions about your startup idea
3. Review your AI-generated verdict with contradiction analysis

---

## Quick Start

### Prerequisites

- Node.js 18.17+
- OpenAI API key (optional—enables AI analysis)

### Installation

```powershell
# 1. Clone the repository
git clone https://github.com/RCushmaniii/ai-idea-validator.git
cd ai-idea-validator

# 2. Install dependencies
npm install
# Expected output: added 247 packages in 30s

# 3. Configure environment (optional, for AI features)
copy .env.example .env
notepad .env
# Add your OpenAI API key: OPENAI_API_KEY=sk-your-key

# 4. Start development server
npm run dev
# Expected output: Ready in 2.5s on http://localhost:3000
```

Open http://localhost:3000 — you should see the orange "AI Idea Validator" header.

---

## Features

| Feature | Outcome |
|---------|---------|
| AI-Driven Verdicts | Analyzes 23 qualitative responses via GPT-4o-mini, not just numeric scores |
| Contradiction Detection | Flags mismatches between self-assessment (e.g., 3/10) and written answers |
| Score Comparison | Side-by-side display of user scores vs AI-adjusted scores |
| Bilingual (EN/ES) | Full Spanish support including AI-generated rationale and contradictions |
| Offline Fallback | Heuristic-based verdicts when OpenAI API unavailable |
| JSON Import/Export | Download template, fill offline, upload for instant analysis |

---

## Verdict Types

| Verdict | When It Applies |
|---------|-----------------|
| **KILL** | Structural weaknesses that execution cannot fix |
| **FLIP** | Potential exists but significant pivot required |
| **BUILD** | Defensible with discipline—focus on moats |
| **BET** | High risk but asymmetric upside justifies the gamble |

---

## Project Structure

```
ai-idea-validator/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts   # OpenAI API endpoint
│   │   ├── kill-test/page.tsx     # Main assessment flow
│   │   ├── about/page.tsx         # About page
│   │   ├── privacy/page.tsx       # Privacy policy
│   │   └── terms/page.tsx         # Terms of service
│   ├── components/
│   │   ├── Header.tsx             # Navigation with orange logo
│   │   ├── Footer.tsx             # Site footer
│   │   ├── home/                  # Landing page sections
│   │   └── kill-test/             # Assessment components
│   ├── contexts/
│   │   ├── KillTestContext.tsx    # Assessment state + API calls
│   │   ├── LanguageContext.tsx    # EN/ES translations
│   │   └── ThemeContext.tsx       # Dark/light mode
│   └── lib/
│       ├── killTestQuestions.ts   # 23 question definitions
│       ├── translations.ts        # All UI strings (EN/ES)
│       └── analyzeIdea.ts         # Analysis utilities
├── INPUT_TEMPLATE.json            # v2.0 JSON schema
├── .env.example                   # Environment template
├── netlify.toml                   # Deployment config
└── package.json                   # v1.5.0
```

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | Enables AI-powered analysis. Without it, uses heuristic fallback. |

### JSON Schema (v2.0)

For programmatic workflows, use `INPUT_TEMPLATE.json`:

```json
{
  "meta": { "schema_version": "2.0", "language": "en" },
  "idea_definition": {
    "one_liner": "",
    "what_disappears_if_product_dies": ""
  },
  "scoring": {
    "copycat_risk": null,
    "platform_risk": null,
    "lock_in_strength": null,
    "pricing_power": null
  },
  "self_reflection": {
    "biggest_unresolved_risk": ""
  }
}
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Webpack) |
| `npm run dev:turbo` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript validation |
| `npm run ci` | Full CI: lint + typecheck + build |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.9 | App Router framework |
| React | 19.2.3 | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| OpenAI | gpt-4o-mini | AI analysis |

---

## Deployment

### Netlify

Repository includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Set `OPENAI_API_KEY` in Netlify environment variables.

### Manual

```powershell
npm run build
npm run start
# Server runs on http://localhost:3000
```

---

## Security

- ✅ API keys in environment variables only (never client-side)
- ✅ OpenAI calls via server-side API route (`/api/analyze`)
- ✅ No secrets in client bundle
- ✅ Input sanitization on user responses

---

## Privacy

Your ideas are safe with us:

| Principle | Implementation |
|-----------|----------------|
| **No Account Required** | Start immediately—no signup, email, or tracking |
| **Browser-Based Processing** | Answers processed locally; nothing stored on our servers |
| **Open Source** | Full code transparency—verify our claims yourself |
| **Session-Only Data** | Close browser, data disappears; no persistent storage |
| **AI Analysis** | Your idea goes directly to OpenAI for analysis, then results returned—we don't store the content |

Read the full [Privacy Policy](https://ai-idea-validator.netlify.app/privacy).

---

## Version

**v2.0.0** (2025-01-26)

### Changelog

**v2.0.0 - Trust Edition**
- New TrustBadges section on homepage with 4 privacy guarantees
- Privacy trust banner on assessment entry page
- Full bilingual (EN/ES) trust messaging
- GitHub link for open-source code verification
- Updated Privacy section in README
- Privacy-first positioning throughout the app

**v1.5.0 - AI Analysis**
- GPT-4o-mini verdict generation
- Contradiction detection (score vs written response)
- Spanish language support for AI output

**v1.0.0 - Initial Release**
- Orange branded navigation logo
- Fixed 640px question card width
- Dark/light theme toggle
- Next.js 15.5.9 (Windows stability)
- Netlify deployment config
- Offline heuristic fallback
- INPUT_TEMPLATE.json v2.0
- AI generates verdict (removed user selection)
- Added `biggest_unresolved_risk` field

---

## License

MIT

---

Built for founders who value their time.
