interface AchievementEvaluationCoordinator {
  trackersHydrated: () => void;
  journalHydrated: () => void;
  dataChanged: () => void;
  appForegrounded: () => void;
}

export function createAchievementEvaluationCoordinator(
  evaluate: () => void,
): AchievementEvaluationCoordinator {
  let trackersReady = false;
  let journalReady = false;

  const evaluateWhenReady = () => {
    if (trackersReady && journalReady) evaluate();
  };

  return {
    trackersHydrated: () => {
      trackersReady = true;
      evaluateWhenReady();
    },
    journalHydrated: () => {
      journalReady = true;
      evaluateWhenReady();
    },
    dataChanged: evaluateWhenReady,
    appForegrounded: evaluateWhenReady,
  };
}
