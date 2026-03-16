export type Mood = 1 | 2 | 3 | 4 | 5;

export interface JournalEntry {
  id: string;
  date: string; // ISO 8601
  mood: Mood;
  cravingIntensity: number; // 0-10
  triggers: TriggerTag[];
  notes?: string;
  createdAt: string;
}

export type TriggerTag =
  | 'stress'
  | 'loneliness'
  | 'boredom'
  | 'social_pressure'
  | 'celebration'
  | 'anger'
  | 'sadness'
  | 'anxiety'
  | 'physical_pain'
  | 'habit_cue'
  | 'relationship'
  | 'work';

export const TRIGGER_LABELS: Record<TriggerTag, string> = {
  stress: 'Stress',
  loneliness: 'Loneliness',
  boredom: 'Boredom',
  social_pressure: 'Social Pressure',
  celebration: 'Celebration',
  anger: 'Anger',
  sadness: 'Sadness',
  anxiety: 'Anxiety',
  physical_pain: 'Physical Pain',
  habit_cue: 'Habit Cue',
  relationship: 'Relationship',
  work: 'Work',
};

export const MOOD_LABELS: Record<Mood, string> = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

export const MOOD_EMOJIS: Record<Mood, string> = {
  1: '😔',
  2: '😟',
  3: '😐',
  4: '🙂',
  5: '😊',
};
