# PureMind - GEMINI context

Sobriety tracking and addiction education app built with React Native and Expo. Focused on privacy, all data is stored locally on-device.

## Project Overview

*   **Main Technologies:** Expo SDK 55, React Native, TypeScript, NativeWind v4 (Tailwind CSS), Zustand, Expo Router, i18next, date-fns.
*   **Architecture:**
    *   **Routing:** File-based routing via `expo-router` in the `app/` directory.
    *   **State Management:** `zustand` with `persist` middleware (using `@react-native-async-storage/async-storage`) for on-device data persistence. Stores are located in `src/stores/`.
    *   **UI System:** Shadcn-style components located in `src/components/ui/`, utilizing `nativewind` for styling and `@rn-primitives` for accessible primitives.
    *   **Data Models:** TypeScript interfaces defining the application's domain logic in `src/models/`.
    *   **Internationalization:** `i18next` with `react-i18next` for multi-language support (starting with English).

## Building and Running

*   **Install Dependencies:** `npm install`
*   **Start Development Server:** `npx expo start`
*   **Platform Specific:**
    *   iOS: `npm run ios`
    *   Android: `npm run android`
    *   Web: `npm run web`
*   **Testing:**
    *   Run tests: `npm test`
    *   Watch mode: `npm run test:watch`

## Development Conventions

*   **Styling:** Use Tailwind CSS classes via `nativewind`. Leverage the `cn` utility from `@/src/lib/utils` for conditional class merging.
*   **Components:** Follow the atomic design/shadcn pattern. Keep UI primitives in `src/components/ui/` and feature-specific components in their respective subdirectories within `src/components/`.
*   **State:** Use Zustand for global state. Prefer specific stores (e.g., `useTrackerStore`, `useJournalStore`) over a single monolithic store.
*   **Dates:** Always use `date-fns` for date manipulation and formatting to ensure consistency. Store dates as ISO 8601 strings.
*   **Persistence:** All user data must remain local. Use `AsyncStorage` via Zustand's `persist` middleware.
*   **Type Safety:** Maintain strict TypeScript usage. Avoid `any` and define clear interfaces/types in `src/models/`.
*   **Testing:** Add unit tests in `src/__tests__/` for stores, utilities, and complex logic using `jest` and `jest-expo`.

## Key Files & Directories

*   `app/`: Expo Router entry points and screen layouts.
*   `src/stores/`: Zustand store definitions with persistence logic.
*   `src/models/`: TypeScript domain models (Tracker, Journal, Achievement).
*   `src/components/ui/`: Reusable UI primitives.
*   `src/lib/utils.ts`: Utility functions (e.g., `cn` for Tailwind).
*   `src/i18n/`: Internationalization configuration and translation files.
*   `global.css`: Tailwind CSS entry point and theme variables.
