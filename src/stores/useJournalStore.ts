import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, Mood, TriggerTag } from '@/src/models/journal';

const uuid = () => crypto.randomUUID();

interface CheckInData {
  mood: Mood;
  cravingIntensity: number;
  triggers: TriggerTag[];
  notes?: string;
}

interface JournalState {
  entries: JournalEntry[];
  addCheckIn: (data: CheckInData) => string;
  updateEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => JournalEntry | undefined;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      addCheckIn: (data) => {
        const id = uuid();
        const now = new Date().toISOString();
        const entry: JournalEntry = {
          id,
          date: now,
          mood: data.mood,
          cravingIntensity: data.cravingIntensity,
          triggers: data.triggers,
          notes: data.notes,
          createdAt: now,
        };
        set((state) => ({
          entries: [entry, ...state.entries],
        }));
        return id;
      },

      updateEntry: (id, updates) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
      },

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        }));
      },

      getEntry: (id) => {
        return get().entries.find((e) => e.id === id);
      },
    }),
    {
      name: 'puremind:journal',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
