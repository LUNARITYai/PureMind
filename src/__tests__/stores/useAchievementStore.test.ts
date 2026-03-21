import { type JournalEntry } from '@/src/models/journal';
import { type Tracker } from '@/src/models/tracker';
import { useAchievementStore } from '@/src/stores/useAchievementStore';

beforeEach(() => {
  useAchievementStore.setState({ earned: [], newlyEarned: [] });
});

function makeTracker(startDate: string): Tracker {
  return {
    id: 'test-tracker',
    type: 'alcohol',
    startDate,
    resets: [],
    createdAt: new Date().toISOString(),
    isArchived: false,
  };
}

function makeEntry(overrides: Partial<JournalEntry> = {}): JournalEntry {
  const now = new Date().toISOString();
  return {
    id: Math.random().toString(),
    date: now,
    mood: 3,
    cravingIntensity: 5,
    triggers: [],
    createdAt: now,
    ...overrides,
  };
}

describe('evaluate', () => {
  it('earns day_1 (not day_3) for a tracker started 25h ago', () => {
    const startDate = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    const tracker = makeTracker(startDate);
    useAchievementStore.getState().evaluate([tracker], []);
    const { earned, newlyEarned } = useAchievementStore.getState();
    expect(earned).toContain('day_1');
    expect(earned).not.toContain('day_3');
    expect(newlyEarned).toContain('day_1');
  });

  it('earns checkin_7 with 7 entries', () => {
    const entries = Array.from({ length: 7 }, () => makeEntry());
    useAchievementStore.getState().evaluate([], entries);
    const { earned } = useAchievementStore.getState();
    expect(earned).toContain('checkin_7');
    expect(earned).not.toContain('checkin_30');
  });

  it('earns journal_5 with 5 entries that have notes', () => {
    const entries = Array.from({ length: 5 }, () => makeEntry({ notes: 'Some reflection' }));
    useAchievementStore.getState().evaluate([], entries);
    const { earned } = useAchievementStore.getState();
    expect(earned).toContain('journal_5');
  });

  it('does not add already-earned achievements to newlyEarned again', () => {
    useAchievementStore.setState({ earned: ['day_1'], newlyEarned: [] });
    const startDate = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    useAchievementStore.getState().evaluate([makeTracker(startDate)], []);
    const { newlyEarned } = useAchievementStore.getState();
    expect(newlyEarned).not.toContain('day_1');
  });

  it('earns nothing with empty inputs', () => {
    useAchievementStore.getState().evaluate([], []);
    const { earned, newlyEarned } = useAchievementStore.getState();
    expect(earned).toHaveLength(0);
    expect(newlyEarned).toHaveLength(0);
  });
});
