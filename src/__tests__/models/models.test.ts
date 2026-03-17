import {
  AddictionType,
  ADDICTION_LABELS,
  ADDICTION_ICONS,
} from '@/src/models/tracker';
import {
  Mood,
  TriggerTag,
  MOOD_LABELS,
  MOOD_EMOJIS,
  TRIGGER_LABELS,
} from '@/src/models/journal';
import { ACHIEVEMENTS } from '@/src/models/achievement';

const ADDICTION_TYPES: AddictionType[] = [
  'alcohol',
  'drugs',
  'smoking',
  'gambling',
  'pornography',
  'social_media',
  'gaming',
  'shopping',
  'other',
];

const MOODS: Mood[] = [1, 2, 3, 4, 5];

const TRIGGER_TAGS: TriggerTag[] = [
  'stress',
  'loneliness',
  'boredom',
  'social_pressure',
  'celebration',
  'anger',
  'sadness',
  'anxiety',
  'physical_pain',
  'habit_cue',
  'relationship',
  'work',
];

describe('ADDICTION_LABELS', () => {
  it('covers every AddictionType', () => {
    for (const type of ADDICTION_TYPES) {
      expect(ADDICTION_LABELS[type]).toBeDefined();
      expect(typeof ADDICTION_LABELS[type]).toBe('string');
    }
  });
});

describe('ADDICTION_ICONS', () => {
  it('covers every AddictionType', () => {
    for (const type of ADDICTION_TYPES) {
      expect(ADDICTION_ICONS[type]).toBeDefined();
      expect(typeof ADDICTION_ICONS[type]).toBe('string');
    }
  });
});

describe('MOOD_LABELS', () => {
  it('covers moods 1–5', () => {
    for (const mood of MOODS) {
      expect(MOOD_LABELS[mood]).toBeDefined();
      expect(typeof MOOD_LABELS[mood]).toBe('string');
    }
  });
});

describe('MOOD_EMOJIS', () => {
  it('covers moods 1–5', () => {
    for (const mood of MOODS) {
      expect(MOOD_EMOJIS[mood]).toBeDefined();
      expect(typeof MOOD_EMOJIS[mood]).toBe('string');
    }
  });
});

describe('TRIGGER_LABELS', () => {
  it('covers all 12 TriggerTag values', () => {
    expect(TRIGGER_TAGS).toHaveLength(12);
    for (const tag of TRIGGER_TAGS) {
      expect(TRIGGER_LABELS[tag]).toBeDefined();
      expect(typeof TRIGGER_LABELS[tag]).toBe('string');
    }
  });
});

describe('ACHIEVEMENTS', () => {
  it('has exactly 12 entries', () => {
    expect(ACHIEVEMENTS).toHaveLength(12);
  });

  it('each entry has required fields and valid condition.type', () => {
    const validConditionTypes = ['streak_days', 'checkins_count', 'journal_entries'];
    for (const a of ACHIEVEMENTS) {
      expect(typeof a.id).toBe('string');
      expect(typeof a.title).toBe('string');
      expect(typeof a.description).toBe('string');
      expect(typeof a.icon).toBe('string');
      expect(validConditionTypes).toContain(a.condition.type);
    }
  });
});
