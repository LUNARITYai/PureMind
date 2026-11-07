import { useEffect } from 'react';

import { AppState } from 'react-native';

import { createAchievementEvaluationCoordinator } from '@/src/lib/achievementEvaluationCoordinator';
import { useAchievementStore } from '@/src/stores/useAchievementStore';
import { useJournalStore } from '@/src/stores/useJournalStore';
import { useTrackerStore } from '@/src/stores/useTrackerStore';

export function AchievementEvaluationCoordinator() {
  useEffect(() => {
    const evaluate = () => {
      useAchievementStore
        .getState()
        .evaluate(useTrackerStore.getState().trackers, useJournalStore.getState().entries);
    };
    const coordinator = createAchievementEvaluationCoordinator(evaluate);

    const unsubscribeTrackers = useTrackerStore.subscribe(() => coordinator.dataChanged());
    const unsubscribeJournal = useJournalStore.subscribe(() => coordinator.dataChanged());
    const unsubscribeTrackerHydration = useTrackerStore.persist.onFinishHydration(
      coordinator.trackersHydrated,
    );
    const unsubscribeJournalHydration = useJournalStore.persist.onFinishHydration(
      coordinator.journalHydrated,
    );

    if (useTrackerStore.persist.hasHydrated()) coordinator.trackersHydrated();
    if (useJournalStore.persist.hasHydrated()) coordinator.journalHydrated();

    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') coordinator.appForegrounded();
    });

    return () => {
      unsubscribeTrackers();
      unsubscribeJournal();
      unsubscribeTrackerHydration();
      unsubscribeJournalHydration();
      appStateSubscription.remove();
    };
  }, []);

  return null;
}
