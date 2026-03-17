import { useTrackerStore } from '@/src/stores/useTrackerStore';

beforeEach(() => {
  useTrackerStore.setState({ trackers: [], primaryTrackerId: null });
});

describe('addTracker', () => {
  it('adds a tracker with the correct shape', () => {
    const { addTracker } = useTrackerStore.getState();
    const id = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    const { trackers } = useTrackerStore.getState();

    expect(trackers).toHaveLength(1);
    expect(trackers[0].id).toBe(id);
    expect(trackers[0].type).toBe('alcohol');
    expect(trackers[0].startDate).toBe('2024-01-01T00:00:00.000Z');
    expect(trackers[0].resets).toEqual([]);
    expect(trackers[0].isArchived).toBe(false);
    expect(typeof trackers[0].createdAt).toBe('string');
  });

  it('sets primaryTrackerId on first tracker', () => {
    const { addTracker } = useTrackerStore.getState();
    const id = addTracker('smoking', '2024-01-01T00:00:00.000Z');
    expect(useTrackerStore.getState().primaryTrackerId).toBe(id);
  });

  it('does not override primaryTrackerId when one exists', () => {
    const { addTracker } = useTrackerStore.getState();
    const first = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    addTracker('smoking', '2024-01-01T00:00:00.000Z');
    expect(useTrackerStore.getState().primaryTrackerId).toBe(first);
  });

  it('accepts a customLabel', () => {
    const { addTracker } = useTrackerStore.getState();
    addTracker('other', '2024-01-01T00:00:00.000Z', 'My custom habit');
    const { trackers } = useTrackerStore.getState();
    expect(trackers[0].customLabel).toBe('My custom habit');
  });
});

describe('resetTracker', () => {
  it('updates startDate and appends to resets[]', () => {
    const { addTracker, resetTracker } = useTrackerStore.getState();
    const originalDate = '2024-01-01T00:00:00.000Z';
    const id = addTracker('alcohol', originalDate);

    resetTracker(id, 'slipped up');

    const tracker = useTrackerStore.getState().trackers.find((t) => t.id === id)!;
    expect(tracker.startDate).not.toBe(originalDate);
    expect(tracker.resets).toHaveLength(1);
    expect(tracker.resets[0].previousStartDate).toBe(originalDate);
    expect(tracker.resets[0].note).toBe('slipped up');
    expect(typeof tracker.resets[0].durationDays).toBe('number');
  });
});

describe('deleteTracker', () => {
  it('removes the tracker', () => {
    const { addTracker, deleteTracker } = useTrackerStore.getState();
    const id = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    deleteTracker(id);
    expect(useTrackerStore.getState().trackers).toHaveLength(0);
  });

  it('clears primaryTrackerId when the primary is deleted', () => {
    const { addTracker, deleteTracker } = useTrackerStore.getState();
    const id = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    expect(useTrackerStore.getState().primaryTrackerId).toBe(id);
    deleteTracker(id);
    expect(useTrackerStore.getState().primaryTrackerId).toBeNull();
  });

  it('promotes the next tracker to primary when primary is deleted', () => {
    const { addTracker, deleteTracker } = useTrackerStore.getState();
    const first = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    const second = addTracker('smoking', '2024-01-01T00:00:00.000Z');
    deleteTracker(first);
    expect(useTrackerStore.getState().primaryTrackerId).toBe(second);
  });

  it('preserves primaryTrackerId when a non-primary is deleted', () => {
    const { addTracker, deleteTracker } = useTrackerStore.getState();
    const first = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    const second = addTracker('smoking', '2024-01-01T00:00:00.000Z');
    deleteTracker(second);
    expect(useTrackerStore.getState().primaryTrackerId).toBe(first);
  });
});

describe('setPrimary', () => {
  it('updates primaryTrackerId', () => {
    const { addTracker, setPrimary } = useTrackerStore.getState();
    const first = addTracker('alcohol', '2024-01-01T00:00:00.000Z');
    const second = addTracker('smoking', '2024-01-01T00:00:00.000Z');
    setPrimary(second);
    expect(useTrackerStore.getState().primaryTrackerId).toBe(second);
    setPrimary(first);
    expect(useTrackerStore.getState().primaryTrackerId).toBe(first);
  });
});
