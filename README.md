# PureMind

Sobriety tracking and addiction education app. Track your clean days, journal your mood and cravings, learn about recovery, and find help when you need it. All data stays on your device.

## Setup

```bash
npm install
npx expo start
```

Platform-specific:

```bash
npx expo start --ios
npx expo start --android
npx expo start --web
```

## Requirements

- Node.js (LTS)
- Expo Go on a physical device, or Xcode / Android Studio for simulators

## Stack

- **Expo SDK 55** with Expo Router (file-based routing)
- **TypeScript** (strict)
- **NativeWind v4** (Tailwind CSS for React Native, shadcn-style components)
- **Zustand** + AsyncStorage (state management, on-device persistence)
- **i18next** (internationalization — English for v1)
- **date-fns** (date utilities)
- **react-native-reanimated** + **react-native-svg** (animations, counter ring)

## Testing

```bash
npm test
npm run test:watch
```

## Privacy

All user data is stored locally on-device via AsyncStorage. No network requests, no analytics, no tracking. Your data never leaves your device.

## License

All rights reserved.
