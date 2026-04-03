# Buildify

Buildify is a premium Next.js MVP that turns raw startup ideas into polished product concepts using a local mock generator. The project is structured to swap the mock layer for OpenAI later without changing the UI.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## Project structure

```text
app/
components/
lib/
  mocks/
  openai/
types/
```

## Notes

- `lib/mocks/generate-concept.ts` simulates product concept generation.
- `lib/openai/client.ts` is the future integration point for the OpenAI API.
- The UI includes tone selection, loading states, regenerate, and copy actions.

## GitHub

Suggested commands after creating a new GitHub repo:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```
