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

## Architecture

### Routing (`app/`)

Expo Router file-based routing. Root layout (`app/_layout.tsx`) handles fonts, splash screen, theme (light/dark), and i18n initialization. Five tabs under `app/(tabs)/`: Home (counter), Learn (knowledge base), Journal (check-ins), Progress (stats/badges), Help (crisis resources). Modal routes: `counter/setup.tsx`, `journal/checkin.tsx`, `settings.tsx`.

### State Management (`src/stores/`)

Zustand stores with `persist` middleware backed by AsyncStorage. Each store uses a namespaced key (`puremind:trackers`, etc.). Stores: `useTrackerStore`, `useJournalStore`, `useAchievementStore`, `useSettingsStore`.

### Styling (NativeWind v4)

NativeWind v4 (Tailwind CSS for RN) with `className` props. Config: `tailwind.config.ts`, `global.css` (CSS variables for light/dark), `metro.config.js` (withNativeWind wrapper). Monochromatic black/white palette using shadcn-style CSS variables (background, foreground, card, primary, muted, destructive, border). Use `cn()` from `src/lib/utils.ts` for conditional classes.

### UI Components (`src/components/ui/`)

Reusable primitives inspired by shadcn/react-native-reusables: Text, Button, Card, Input, Badge, Separator. Use these instead of raw RN components for consistent styling. `Text` component auto-applies `text-foreground` color.

### Dark Mode

NativeWind's `useColorScheme` is bridged with Zustand `useSettingsStore` in `app/_layout.tsx`. `@react-navigation/native` ThemeProvider handles nav chrome. For SVG elements (which don't support `className`), use `useThemeValues()` hook from `src/hooks/useThemeValues.ts` to get resolved hex colors.

### i18n (`src/i18n/`)

i18next with react-i18next. English only for v1; Polish planned later. UI strings in `src/i18n/en.json`.

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/src/...` for source imports, `@/assets/...` for assets.

## UX Guidelines

This app serves people in addiction recovery. Language must be empathetic:

- Never use "failure" for relapses. Use "Starting fresh takes courage."
- Empty states should feel inviting, not judgmental.
- High-craving states should acknowledge strength and offer coping links.
- Unearned badges: "You're on your way" — never "Locked."

## Implementation Status

- **Phase 0 — Scaffold**: Done (project structure, stores, i18n, NativeWind v4, base UI components)
- **Phase 1 — Sobriety Counter MVP**: Partial (TrackerStore, Home screen, SobrietyRing, counter setup, reset flow — detail view TBD)
- **Phase 2 — Journal & Check-in**: TODO (store exists, tab shows list, but check-in flow and entry detail not built)
- **Phase 3 — Knowledge Base**: TODO (categories hardcoded in tab, no articles or navigation)
- **Phase 4 — Progress & Achievements**: Partial (AchievementStore + badge grid, but no charts or animations)
- **Phase 5 — Help Resources**: Done (6 resources with call/visit buttons)
- **Phase 6 — Quotes & Onboarding**: TODO
- **Phase 7 — Polish & Launch**: TODO
