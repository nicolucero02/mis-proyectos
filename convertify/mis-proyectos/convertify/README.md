# Convertify

Convertify is a premium dark-mode web app that analyzes landing page ideas and returns structured feedback focused on UX, conversion, and design. The current version uses realistic mock data and a clean service boundary so OpenAI can be plugged in later without rewriting the UI.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Project structure

```text
app/                    App Router entrypoints and global styles
components/             Reusable UI and Convertify-specific sections
data/                   Realistic mock analysis payloads
lib/                    Utility helpers and mock analysis selection logic
services/analysis/      Future API integration boundary
types/                  Shared TypeScript contracts
```

## OpenAI-ready architecture

The current analyzer lives in `services/analysis/analyzer.ts` behind an `Analyzer` interface. Replacing the mock implementation with an OpenAI-backed analyzer later should only require:

1. Adding the API client and request logic inside `services/analysis/`
2. Keeping the `LandingAnalysis` response contract stable
3. Swapping the exported `analyzer` implementation

## Git commands

Initialize and commit:

```bash
git init
git add .
git commit -m "init convertify MVP"
```

Push to GitHub after creating an empty remote repository:

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```
