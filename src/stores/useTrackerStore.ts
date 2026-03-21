import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays } from 'date-fns';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { type Tracker, type AddictionType } from '@/src/models/tracker';

const uuid = () => crypto.randomUUID();

interface TrackerState {
  trackers: Tracker[];
  primaryTrackerId: string | null;
  addTracker: (type: AddictionType, startDate: string, customLabel?: string) => string;
  resetTracker: (id: string, note?: string) => void;
  deleteTracker: (id: string) => void;
  setPrimary: (id: string) => void;
  getTracker: (id: string) => Tracker | undefined;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set, get) => ({
      trackers: [],
      primaryTrackerId: null,

      addTracker: (type, startDate, customLabel) => {
        const id = uuid();
        const tracker: Tracker = {
          id,
          type,
          customLabel,
          startDate,
          resets: [],
          createdAt: new Date().toISOString(),
          isArchived: false,
        };
        set((state) => ({
          trackers: [...state.trackers, tracker],
          primaryTrackerId: state.primaryTrackerId ?? id,
        }));
        return id;
      },

      resetTracker: (id, note) => {
        const now = new Date().toISOString();
        set((state) => ({
          trackers: state.trackers.map((t) => {
            if (t.id !== id) return t;
            const durationDays = differenceInDays(new Date(), new Date(t.startDate));
            return {
              ...t,
              startDate: now,
              resets: [
                ...t.resets,
                {
                  id: uuid(),
                  date: now,
                  previousStartDate: t.startDate,
                  note,
                  durationDays,
                },
              ],
            };
          }),
        }));
      },

      deleteTracker: (id) => {
        set((state) => {
          const remaining = state.trackers.filter((t) => t.id !== id);
          return {
            trackers: remaining,
            primaryTrackerId:
              state.primaryTrackerId === id ? (remaining[0]?.id ?? null) : state.primaryTrackerId,
          };
        });
      },

      setPrimary: (id) => {
        set({ primaryTrackerId: id });
      },

      getTracker: (id) => {
        return get().trackers.find((t) => t.id === id);
      },
    }),
    {
      name: 'puremind:trackers',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
