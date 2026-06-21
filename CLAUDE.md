# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PureMind is a React Native mobile app for sobriety tracking and addiction education. It uses Expo SDK 55 with Expo Router (file-based routing), TypeScript (strict), and targets iOS/Android/web. All user data stays on-device (AsyncStorage) — no network requests, no analytics, no tracking.

## Commands

- `npx expo start` — start the dev server
- `npx expo start --ios` / `--android` / `--web` — platform-specific
- `npx tsc --noEmit` — type-check the project
- `npm test` — run unit tests (jest-expo)
- `npm run test:watch` — run tests in watch mode
- `npm run lint` — run ESLint (flat config)
- `npm run lint:fix` — run ESLint with auto-fix
- `npm run format` — format with Prettier
- `npm run format:check` — check formatting
- `npm run typecheck` — alias for `npx tsc --noEmit`

## Architecture

### Routing (`app/`)

Expo Router file-based routing. Root layout (`app/_layout.tsx`) handles fonts, splash screen, theme (light/dark via NativeWind + Zustand bridge), and i18n initialization. Five tabs under `app/(tabs)/`: Home (counter), Learn (knowledge base), Journal (check-ins), Progress (stats/badges), Help (crisis resources). Modal/stack routes: `counter/setup.tsx`, `journal/checkin.tsx`, `journal/entry/[id].tsx` (placeholder), `knowledge/article/[slug].tsx` (placeholder), `settings.tsx`.

### State Management (`src/stores/`)

Zustand stores with `persist` middleware backed by AsyncStorage. Each store uses a namespaced key (`puremind:trackers`, etc.). Stores:

- `useTrackerStore` — sobriety trackers (add, reset, delete, active tracker)
- `useJournalStore` — journal entries / check-ins (add, update, delete)
- `useAchievementStore` — badges and milestones (unlock, check progress)
- `useSettingsStore` — theme preference (light/dark/system), language

### Styling (NativeWind v4)

NativeWind v4 (Tailwind CSS for RN) with `className` props. Config: `tailwind.config.ts`, `global.css` (CSS variables for light/dark), `metro.config.js` (withNativeWind wrapper). Monochromatic black/white palette using shadcn-style CSS variables (background, foreground, card, primary, muted, destructive, border, ring, secondary). Use `cn()` from `src/lib/utils.ts` for conditional classes.

### UI Components (`src/components/ui/`)

Reusable primitives inspired by shadcn/react-native-reusables: Text, Button, Card, Input, Badge, Separator. Use these instead of raw RN components for consistent styling. `Text` component auto-applies `text-foreground` color.

### Feature Components (`src/components/`)

Feature-specific components organized by domain:

- `counter/` — `SobrietyCounter.tsx` (ring visualization + elapsed time), `ResetModal.tsx` (reset confirmation)

### Dark Mode

NativeWind's `useColorScheme` is bridged with Zustand `useSettingsStore` in `app/_layout.tsx`. `@react-navigation/native` ThemeProvider handles nav chrome with custom `PureMindLightTheme` / `PureMindDarkTheme` objects. For SVG elements (which don't support `className`), use `useThemeValues()` hook from `src/hooks/useThemeValues.ts` to get resolved hex colors.

### Custom Hooks (`src/hooks/`)

- `useElapsedTime` — real-time elapsed time counter for sobriety trackers
- `useThemeValues` — resolves CSS variables to hex colors for non-NativeWind contexts (SVG, inline styles)

### i18n (`src/i18n/`)

i18next with react-i18next. English translations in `src/i18n/en.json`. Polish (`pl`) directory scaffolded but not yet populated. Config in `src/i18n/index.ts`.

### Content System (`src/content/`)

Localized content organized by language: `src/content/en/articles/`, `src/content/pl/` (empty). Articles directory scaffolded but empty — intended for knowledge base article data.

### Models (`src/models/`)

TypeScript interfaces for domain logic:

- `tracker.ts` — Tracker type (substance, start date, resets)
- `journal.ts` — JournalEntry type (mood, cravings, notes)
- `achievement.ts` — Achievement / Badge definitions and progress

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/src/...` for source imports, `@/assets/...` for assets.

### Utilities

- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/uuid.ts` — UUID generation utility

### Testing

Jest with `jest-expo` preset. Test setup in `src/__tests__/setup.ts`. Module name mapper for `@/` alias and AsyncStorage mock. Tests located in `src/__tests__/stores/`, `src/__tests__/models/`, `src/__tests__/utils/`.

### Code Quality

- ESLint flat config (`eslint.config.js`) with expo + prettier + strict TypeScript rules
- Prettier (`.prettierrc`) for formatting
- Husky + lint-staged for pre-commit hooks (ESLint fix + Prettier on staged `.ts/.tsx/.json/.md/.css`)
- Strict `import/order` enforcement with path group ordering (react → react-native → expo → @/ → rest)

## UX Guidelines

This app serves people in addiction recovery. Language must be empathetic:

- Never use "failure" for relapses. Use "Starting fresh takes courage."
- Empty states should feel inviting, not judgmental.
- High-craving states should acknowledge strength and offer coping links.
- Unearned badges: "You're on your way" — never "Locked."

## Implementation Status

- **Phase 0 — Scaffold**: ✅ Done (project structure, stores, i18n, NativeWind v4, base UI components, ESLint + Prettier + Husky)
- **Phase 1 — Sobriety Counter MVP**: 🔶 Partial (TrackerStore, Home screen, SobrietyCounter ring, counter setup modal, ResetModal — detail view TBD)
- **Phase 2 — Journal & Check-in**: 🔶 Partial (JournalStore exists, tab shows entry list, check-in flow built — entry detail route placeholder empty)
- **Phase 3 — Knowledge Base**: 🔶 Partial (categories rendered in tab, article route scaffolded — no article content or navigation logic)
- **Phase 4 — Progress & Achievements**: 🔶 Partial (AchievementStore + badge grid in tab — no charts, animations, or detailed stats)
- **Phase 5 — Help Resources**: ✅ Done (6 resources with call/visit buttons)
- **Phase 6 — Quotes & Onboarding**: ❌ TODO
- **Phase 7 — Polish & Launch**: ❌ TODO (i18n Polish translations, animations, app store prep)
