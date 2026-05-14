# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 15 + TypeScript portfolio app using the App Router.

- `app/`: routes, global layout, styles, and API handlers (for example `app/api/contact/route.ts`).
- `components/`: reusable UI and behavior modules (`kebab-case` filenames, typically one component per file).
- `data/`: static content sources (for example `data/projects.ts`).
- `app/*.png|*.jpeg`: local visual assets used by pages/sections.
- Root config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `package.json`.

## Build, Test, and Development Commands
Use `npm` scripts from the repository root:

- `npm run dev`: starts local development server (`next dev`).
- `npm run dev:clean`: clears Next.js/cache artifacts, then starts dev server.
- `npm run build`: production build (`next build`).
- `npm run start`: runs built app (`next start`).
- `npm run lint`: runs Next.js lint checks.
- `npm run clean`: removes `.next` and `node_modules/.cache`.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; include semicolons; keep imports grouped and minimal.
- Components/hooks/files: `kebab-case` (examples: `portfolio-home.tsx`, `use-project-card-motion.ts`).
- Route files follow Next.js conventions: `page.tsx`, `layout.tsx`, `route.ts`.
- Use path alias `@/` for internal imports.
- Styling is primarily in `app/globals.css` with Tailwind-enabled setup; prefer existing tokens and utility patterns before adding new globals.

## Testing Guidelines
There is currently no dedicated automated test suite in this repository.

Minimum validation before opening a PR:
1. Run `npm run lint`.
2. Run `npm run build`.
3. Manually smoke-test key routes: `/`, `/about`, `/projects`, and contact flow (`/api/contact` integration).

If you add non-trivial logic, include targeted tests and document how to run them.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects (examples: `Add Sempre Bela project card`, `Update portfolio contact flow`).

- Keep commit titles concise and action-first (`Add`, `Update`, `Refine`, `Fix`).
- PRs should include: objective, scope, before/after screenshots for UI changes, manual test notes, and linked issue/task when applicable.
- Keep changes focused; avoid unrelated refactors in the same PR.
