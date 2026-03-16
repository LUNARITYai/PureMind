# PureMind — Sobriety Tracking & Addiction Education

PureMind is a React Native mobile application built with Expo, designed to help users track their sobriety across various addictions while providing a knowledge base for education and recovery support. The project prioritizes user privacy (on-device data storage) and empathy-driven user experience.

## Project Overview

- **Core Technologies:** Expo (SDK 55), React Native (0.83), TypeScript, Zustand, i18next, Expo Router, AsyncStorage.
- **Key Features:**
    - Real-time sobriety counter with live elapsed time.
    - Multiple addiction trackers support.
    - Addiction education knowledge base (Markdown articles).
    - Journaling and check-in system for mood/craving tracking.
    - Progress visualization (streak, graphs, badges).
    - Crisis help resources.
- **Privacy First:** All user data is stored locally via `AsyncStorage`. No external network requests, analytics, or tracking are used.

## Building and Running

### Development Commands
- `npx expo start`: Start the Expo development server (Metro bundler).
- `npx expo start --ios`: Launch the app on an iOS simulator.
- `npx expo start --android`: Launch the app on an Android emulator.
- `npx expo start --web`: Launch the app as a progressive web app.
- `npx tsc --noEmit`: Run TypeScript type-checking.

### Requirements
- **Node.js:** Current LTS recommended.
- **Expo Go:** Installed on a physical device or simulators configured (Xcode/Android Studio).

## Architecture & Structure

The project follows a modular structure leveraging Expo Router for file-based navigation.

```text
PureMind/
├── app/                  # Expo Router routes (navigation screens)
│   ├── (tabs)/           # Main tab bar routes (Home, Journal, Knowledge, etc.)
│   ├── counter/          # Sobriety tracker setup and details
│   ├── journal/          # Check-in flow and entry views
│   └── _layout.tsx       # Root layout (Providers, Splash, Fonts, Theme)
├── src/
│   ├── components/       # Reusable UI and domain components (organized by feature)
│   ├── stores/           # Zustand state management (with persistence)
│   ├── theme/            # Design tokens (colors, typography, spacing)
│   ├── i18n/             # Localization (i18next setup and translations)
│   ├── models/           # TypeScript interfaces and types
│   ├── hooks/            # Custom React hooks (useThemeColors, useElapsedTime)
│   └── content/          # Static content (articles, resources)
├── assets/               # Fonts, images, and animations
└── app.json              # Expo configuration
```

## Development Conventions

### Path Aliases
- Use `@/` to reference the project root.
- Imports should follow the pattern: `import { ... } from '@/src/stores/useTrackerStore';`

### State Management
- Use **Zustand** stores located in `src/stores/`.
- Ensure persistence is handled using `persist` middleware with `AsyncStorage`.
- Name stores following the `useXStore` pattern.

### Styling & Theme
- Utilize the `useThemeColors` hook from `src/hooks/` to access light/dark mode colors.
- Define design tokens in `src/theme/`.

### UX & Language (Critical)
The application serves people in recovery. Language must be empathetic and supportive:
- **Relapses:** Never use the word "failure". Use "Starting fresh takes courage" or "Your progress is never truly lost."
- **Badges:** Use "You're on your way" for unearned achievements instead of "Locked."
- **Empty States:** Should feel inviting and safe, not judgmental.

### Coding Standards
- **TypeScript:** Strict mode is enabled. Always define interfaces/types for props and state.
- **Routing:** Use `router` from `expo-router` for navigation.
- **Local Settings:** Managed via `useSettingsStore`.
