import { useJournalStore } from '@/src/stores/useJournalStore';

beforeEach(() => {
  useJournalStore.setState({ entries: [] });
});

describe('addCheckIn', () => {
  it('adds an entry with the correct shape', () => {
    const { addCheckIn } = useJournalStore.getState();
    const id = addCheckIn({ mood: 4, cravingIntensity: 3, triggers: ['stress'] });
    const { entries } = useJournalStore.getState();

    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe(id);
    expect(entries[0].mood).toBe(4);
    expect(entries[0].cravingIntensity).toBe(3);
    expect(entries[0].triggers).toEqual(['stress']);
    expect(typeof entries[0].date).toBe('string');
    expect(typeof entries[0].createdAt).toBe('string');
  });

  it('prepends entries (most recent first)', () => {
    const { addCheckIn } = useJournalStore.getState();
    const first = addCheckIn({ mood: 3, cravingIntensity: 2, triggers: [] });
    const second = addCheckIn({ mood: 5, cravingIntensity: 1, triggers: [] });
    const { entries } = useJournalStore.getState();

    expect(entries[0].id).toBe(second);
    expect(entries[1].id).toBe(first);
  });
});

describe('deleteEntry', () => {
  it('removes the entry by id', () => {
    const { addCheckIn, deleteEntry } = useJournalStore.getState();
    const id = addCheckIn({ mood: 3, cravingIntensity: 5, triggers: [] });
    deleteEntry(id);
    expect(useJournalStore.getState().entries).toHaveLength(0);
  });

  it('does not affect other entries', () => {
    const { addCheckIn, deleteEntry } = useJournalStore.getState();
    const first = addCheckIn({ mood: 2, cravingIntensity: 4, triggers: [] });
    const second = addCheckIn({ mood: 4, cravingIntensity: 2, triggers: [] });
    deleteEntry(first);
    const { entries } = useJournalStore.getState();
    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe(second);
  });
});
