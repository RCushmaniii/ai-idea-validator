# AI Idea Validator

A brutally honest defensibility assessment for founders. Find out if your business idea can survive competition, platform changes, and solo-founder realities before you build.

## What It Does

AI Idea Validator runs your startup idea through a rigorous 12-section kill test designed to expose:

- **False moats** — things that look defensible but aren't
- **Solo-founder death spirals** — workloads that scale linearly with growth
- **Platform dependencies** — single points of failure you're ignoring
- **Copycat velocity** — how fast competitors can reach "good enough"

The goal is simple: **prevent wasted years** on ideas that are technically correct but fundamentally replaceable.

## The Kill Test Framework

The assessment evaluates your idea across 12 dimensions:

1. **Inevitability Test** — Should this exist at all?
2. **Copycat Velocity Test** — 30/60/90 day competitive analysis
3. **Tech/AI Commoditization Test** — What survives when AI gets cheaper?
4. **Platform Hostage Test** — What single decision kills you?
5. **Data Moat Reality Test** — No fantasy allowed
6. **Workflow Entanglement Test** — Pain of removal score (1-10)
7. **Pricing Power Test** — Who feels pain vs. who controls budget?
8. **Solo-Founder Sustainability Test** — What quietly becomes human work?
9. **Failure Mode Test** — Name how this dies
10. **Moat Construction Path** — What's buildable in 12-24 months?
11. **Asymmetry Test** — Best case vs. worst case
12. **Final Verdict** — KILL, FLIP, BUILD, or BET

## Verdict Options

- **KILL** — Fundamentally weak, don't build
- **FLIP** — Pivot required to survive
- **BUILD** — Defensible with discipline
- **BET** — Risky but asymmetric upside

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **React:** v19

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-idea-validator.git
cd ai-idea-validator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
ai-idea-validator/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── contexts/         # React context providers
│   └── lib/              # Utility functions
├── template.md           # Kill test framework template
├── INPUT_TEMPLATE.json   # Structured input schema
└── public/               # Static assets
```

## Documentation

- **template.md** — The complete kill test framework with all 12 sections
- **INPUT_TEMPLATE.json** — JSON schema for structured idea submissions

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-idea-validator)

Or build and deploy manually:

```bash
npm run build
npm run start
```

## Philosophy

> Most failed products were **technically correct**.
> They failed because they were **replaceable**.

This tool exists to ensure that if you build something, it becomes **deeply annoying to turn off**.

## License

MIT
