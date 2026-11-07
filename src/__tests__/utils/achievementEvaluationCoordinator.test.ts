import { createAchievementEvaluationCoordinator } from '@/src/lib/achievementEvaluationCoordinator';

describe('achievement evaluation coordinator', () => {
  it('waits for both stores to hydrate before evaluating', () => {
    const evaluate = jest.fn();
    const coordinator = createAchievementEvaluationCoordinator(evaluate);

    coordinator.trackersHydrated();
    coordinator.dataChanged();
    expect(evaluate).not.toHaveBeenCalled();

    coordinator.journalHydrated();
    expect(evaluate).toHaveBeenCalledTimes(1);
  });

  it('evaluates on data changes and foreground returns after hydration', () => {
    const evaluate = jest.fn();
    const coordinator = createAchievementEvaluationCoordinator(evaluate);

    coordinator.trackersHydrated();
    coordinator.journalHydrated();
    coordinator.dataChanged();
    coordinator.appForegrounded();

    expect(evaluate).toHaveBeenCalledTimes(3);
  });
});
