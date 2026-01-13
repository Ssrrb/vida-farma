# Repository Guidelines

## Project Structure & Module Organization
- `index.html`, `index.tsx`, and `App.tsx` are the main Vite/React entry points.
- UI building blocks live in `components/` (e.g., `components/ProductCard.tsx`, `components/Checkout.tsx`).
- Shared types/constants are in `types.ts` and `constants.ts`.
- Client-side services live in `services/` (e.g., `services/geminiService.ts`).
- Static assets are in `public/` and global styles in `index.css`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the local Vite dev server.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: serve the production build locally for smoke checks.

## Coding Style & Naming Conventions
- Use TypeScript + React functional components with `.tsx` files.
- Keep indentation at 2 spaces and follow existing formatting in `components/`.
- Component files use PascalCase (`ProductGrid.tsx`), functions/variables use camelCase.
- No lint/format scripts are defined; keep formatting consistent and run `npm run build` to catch type errors.

## Testing Guidelines
- No automated test framework is configured yet. If you add tests, place them near the feature or in a `tests/` folder and document new commands here.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative summaries; some use a `feat:` prefix.
- Recommended format: `type: concise summary` (e.g., `feat: add cart drawer state`).
- PRs should include a clear description, steps to verify (`npm run dev` or `npm run preview`), and screenshots for UI changes.

## Security & Configuration Tips
- Set `GEMINI_API_KEY` in `.env.local` (see `README.md`) and do not commit secrets.
- Keep API-related logic in `services/` to isolate credential usage.
