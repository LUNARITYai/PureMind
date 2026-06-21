# AGENTS.md

Universal context for AI coding agents working on PureMind.

## What is PureMind?

A privacy-first sobriety tracking and addiction education app. Built with React Native + Expo for iOS, Android, and web. **All user data stays on-device** — no backend, no network requests, no analytics, no tracking.

## Tech Stack

| Layer         | Technology                                                         |
| ------------- | ------------------------------------------------------------------ |
| Framework     | Expo SDK 55, React Native 0.83                                     |
| Language      | TypeScript (strict mode)                                           |
| Routing       | Expo Router (file-based, `app/` directory)                         |
| Styling       | NativeWind v4 (Tailwind CSS for RN), CSS variables in `global.css` |
| State         | Zustand 5 + `persist` middleware → AsyncStorage                    |
| Animations    | React Native Reanimated 4                                          |
| i18n          | i18next + react-i18next                                            |
| Dates         | date-fns                                                           |
| UI Components | Shadcn-style primitives (`src/components/ui/`)                     |
| Testing       | Jest + jest-expo                                                   |
| Code Quality  | ESLint (flat config) + Prettier + Husky + lint-staged              |

## Quick Commands

```bash
npm install              # Install dependencies
npx expo start           # Start dev server
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run web              # Web browser
npm test                 # Run tests
npm run test:watch       # Tests in watch mode
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier format
npm run format:check     # Prettier check
npm run typecheck        # TypeScript type-check (tsc --noEmit)
```

## Project Structure

```
app/                          # Expo Router — screens & navigation
├── +not-found.tsx            # 404 Not Found screen
├── _layout.tsx               # Root layout (fonts, splash, theme, i18n)
├── (tabs)/                   # Tab navigator
│   ├── _layout.tsx           # Tab bar config (5 tabs)
│   ├── index.tsx             # Home — sobriety counter
│   ├── knowledge.tsx         # Learn — knowledge base categories
│   ├── journal.tsx           # Journal — entry list
│   ├── progress.tsx          # Progress — badges & stats
│   └── help.tsx              # Help — crisis resources
├── counter/setup.tsx         # Modal: new tracker setup
├── journal/checkin.tsx       # Modal: journal check-in
├── journal/entry/            # Dynamic: entry detail (placeholder)
├── knowledge/article/        # Dynamic: article detail (placeholder)
└── settings.tsx              # Settings screen

src/
├── components/
│   ├── ui/                   # Reusable primitives (Text, Button, Card, Input, Badge, Separator)
│   └── counter/              # Feature: SobrietyCounter ring, ResetModal
├── stores/                   # Zustand stores with persistence
│   ├── useTrackerStore.ts    # Sobriety trackers
│   ├── useJournalStore.ts    # Journal entries
│   ├── useAchievementStore.ts # Badges & milestones
│   └── useSettingsStore.ts   # Theme & language preferences
├── models/                   # TypeScript domain interfaces
│   ├── tracker.ts
│   ├── journal.ts
│   └── achievement.ts
├── hooks/                    # Custom React hooks
│   ├── useElapsedTime.ts     # Real-time elapsed timer
│   └── useThemeValues.ts     # CSS var → hex resolver
├── lib/
│   ├── utils.ts              # cn() — clsx + tailwind-merge
│   └── uuid.ts               # UUID generation
├── i18n/                     # Internationalization
│   ├── index.ts              # i18next config
│   └── en.json               # English translations
├── content/                  # Localized article content
│   ├── en/articles/          # English articles (empty)
│   └── pl/                   # Polish content (empty)
├── __tests__/                # Unit tests
│   ├── setup.ts
│   ├── stores/
│   ├── models/
│   └── utils/
└── utils/                    # General utilities (empty)
```

## Architecture Decisions

### Data Persistence

All stores use Zustand's `persist` middleware with `AsyncStorage`. Each store has a namespaced key:

- `puremind:trackers`
- `puremind:journal`
- `puremind:achievements`
- `puremind:settings`

### Theme System

Monochromatic black/white palette defined via CSS custom properties in `global.css` (HSL values). Light and dark modes controlled through:

1. `useSettingsStore` — user preference (`light` / `dark` / `system`)
2. NativeWind's `useColorScheme` — bridged in root layout
3. `@react-navigation/native` ThemeProvider — custom `PureMindLightTheme` / `PureMindDarkTheme`

For SVG/inline styles that can't use `className`, use `useThemeValues()` hook.

### Path Aliases

`@/*` → project root (via `tsconfig.json`). Always use `@/src/...` for source imports.

### Import Ordering (ESLint enforced)

`react` → `react-native` → `expo*` → `@/*` → relative → types

### UI Component Pattern

Shadcn-style primitives in `src/components/ui/`. Always use these instead of raw React Native components for consistent theming. The `Text` component auto-applies `text-foreground` color.

## Conventions

- **TypeScript:** Strict mode. No `any`. Use `interface` (enforced by ESLint rule). Use inline type imports (`import { type Foo }`).
- **Dates:** Always use `date-fns`. Store as ISO 8601 strings.
- **State:** One Zustand store per domain. Never create a monolithic store.
- **Styling:** Use NativeWind `className`. Use `cn()` for conditional merging.
- **Testing:** Jest + jest-expo. Tests in `src/__tests__/`. AsyncStorage is auto-mocked.
- **Privacy:** Never add network requests, analytics, or tracking. All data stays local.

## UX Principles

This app serves people in addiction recovery. **Empathetic language is mandatory:**

| ❌ Don't                     | ✅ Do                                |
| ---------------------------- | ------------------------------------ |
| "Failed" / "Failure"         | "Starting fresh takes courage"       |
| "Locked" badge               | "You're on your way"                 |
| Empty/cold empty states      | Warm, inviting empty states          |
| Ignoring high-craving states | Acknowledge strength, link to coping |

## Implementation Status

| Phase | Description             | Status     | Notes                                        |
| ----- | ----------------------- | ---------- | -------------------------------------------- |
| 0     | Scaffold                | ✅ Done    | Structure, stores, i18n, UI, linting         |
| 1     | Sobriety Counter MVP    | 🔶 Partial | Core works — detail view TBD                 |
| 2     | Journal & Check-in      | 🔶 Partial | Store + list + check-in — entry detail empty |
| 3     | Knowledge Base          | 🔶 Partial | Categories in tab — no article content       |
| 4     | Progress & Achievements | 🔶 Partial | Store + badge grid — no charts/animations    |
| 5     | Help Resources          | ✅ Done    | 6 resources with call/visit buttons          |
| 6     | Quotes & Onboarding     | ❌ TODO    |                                              |
| 7     | Polish & Launch         | ❌ TODO    | Polish translations, animations, app store   |
