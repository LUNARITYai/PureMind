# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PureMind is a React Native mobile app for sobriety tracking and addiction education. It uses Expo SDK 55 with Expo Router (file-based routing), TypeScript (strict), and targets iOS/Android/web. All user data stays on-device (AsyncStorage) — no network requests, no analytics, no tracking.

## Commands

- `npx expo start` — start the dev server
- `npx expo start --ios` / `--android` / `--web` — platform-specific
- `npx tsc --noEmit` — type-check the project

No test framework is set up yet.

## Architecture

### Routing (`app/`)
Expo Router file-based routing. Root layout (`app/_layout.tsx`) handles fonts, splash screen, theme (light/dark), and i18n initialization. Five tabs under `app/(tabs)/`: Home (counter), Learn (knowledge base), Journal (check-ins), Progress (stats/badges), Help (crisis resources). Modal routes: `counter/setup.tsx`, `journal/checkin.tsx`, `settings.tsx`.

### State Management (`src/stores/`)
Zustand stores with `persist` middleware backed by AsyncStorage. Each store uses a namespaced key (`puremind:trackers`, etc.). Stores: `useTrackerStore`, `useJournalStore`, `useAchievementStore`, `useSettingsStore`.

### Theme (`src/theme/`)
Custom color palette in `colors.ts` with light/dark variants. `useThemeColors` hook resolves current theme colors based on user setting (light/dark/system). Fonts: SpaceMono (counter), system fonts elsewhere. Navigation themes are mapped in `app/_layout.tsx`.

### i18n (`src/i18n/`)
i18next with react-i18next. English only for v1; Polish planned later. UI strings in `src/i18n/en.json`.

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json`). Use `@/src/...` for source imports, `@/assets/...` for assets.

### Legacy Scaffold
`components/` and `constants/` at root are leftover from the Expo template. Active code lives under `src/components/`, `src/theme/`, etc.

## UX Guidelines

This app serves people in addiction recovery. Language must be empathetic:
- Never use "failure" for relapses. Use "Starting fresh takes courage."
- Empty states should feel inviting, not judgmental.
- High-craving states should acknowledge strength and offer coping links.
- Unearned badges: "You're on your way" — never "Locked."

## Implementation Phases

See `PLAN.md` for the full roadmap. The project is early — Phase 0 (scaffold) and Phase 1 (sobriety counter MVP) are in progress.
