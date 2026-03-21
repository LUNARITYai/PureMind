import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays } from 'date-fns';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ACHIEVEMENTS } from '@/src/models/achievement';
import { type JournalEntry } from '@/src/models/journal';
import { type Tracker } from '@/src/models/tracker';

interface AchievementState {
  earned: string[]; // achievement IDs
  newlyEarned: string[]; // IDs not yet seen by user
  evaluate: (trackers: Tracker[], entries: JournalEntry[]) => void;
  dismissNew: (id: string) => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      earned: [],
      newlyEarned: [],

      evaluate: (trackers, entries) => {
        const now = new Date();
        const currentEarned = get().earned;
        const freshlyEarned: string[] = [];

        for (const achievement of ACHIEVEMENTS) {
          if (currentEarned.includes(achievement.id)) continue;

          const { condition } = achievement;
          let met = false;

          if (condition.type === 'streak_days') {
            met = trackers.some((t) => {
              const days = differenceInDays(now, new Date(t.startDate));
              return days >= condition.days;
            });
          } else if (condition.type === 'checkins_count') {
            met = entries.length >= condition.count;
          } else if (condition.type === 'journal_entries') {
            const withNotes = entries.filter((e) => e.notes && e.notes.trim().length > 0);
            met = withNotes.length >= condition.count;
          }

          if (met) {
            freshlyEarned.push(achievement.id);
          }
        }

        if (freshlyEarned.length > 0) {
          set((state) => ({
            earned: [...state.earned, ...freshlyEarned],
            newlyEarned: [...state.newlyEarned, ...freshlyEarned],
          }));
        }
      },

      dismissNew: (id) => {
        set((state) => ({
          newlyEarned: state.newlyEarned.filter((i) => i !== id),
        }));
      },
    }),
    {
      name: 'puremind:achievements',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
