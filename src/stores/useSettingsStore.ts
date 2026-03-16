import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';
type Locale = 'en' | 'pl';

interface SettingsState {
  theme: ThemeMode;
  locale: Locale;
  notificationsEnabled: boolean;
  dailyCheckInReminder: string | null; // "HH:mm" or null
  hasCompletedOnboarding: boolean;
  setTheme: (theme: ThemeMode) => void;
  setLocale: (locale: Locale) => void;
  setNotifications: (enabled: boolean) => void;
  setDailyReminder: (time: string | null) => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      locale: 'en',
      notificationsEnabled: false,
      dailyCheckInReminder: null,
      hasCompletedOnboarding: false,

      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
      setNotifications: (enabled) => set({ notificationsEnabled: enabled }),
      setDailyReminder: (time) => set({ dailyCheckInReminder: time }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'puremind:settings',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
