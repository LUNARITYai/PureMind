import React, { useEffect } from 'react';

import { ScrollView, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Text } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';
import { ACHIEVEMENTS } from '@/src/models/achievement';
import { useAchievementStore } from '@/src/stores/useAchievementStore';
import { useJournalStore } from '@/src/stores/useJournalStore';
import { useTrackerStore } from '@/src/stores/useTrackerStore';

export default function ProgressScreen() {
  const { t } = useTranslation();
  const trackers = useTrackerStore((s) => s.trackers);
  const entries = useJournalStore((s) => s.entries);
  const earned = useAchievementStore((s) => s.earned);
  const evaluate = useAchievementStore((s) => s.evaluate);

  useEffect(() => {
    evaluate(trackers, entries);
  }, [trackers, entries, evaluate]);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-6 pb-12">
      <Text className="text-[28px] font-bold leading-[34px] mb-6">{t('progress.title')}</Text>

      <Text className="text-2xl font-semibold mb-4">{t('progress.achievements')}</Text>

      <View className="flex-row flex-wrap gap-2">
        {ACHIEVEMENTS.map((achievement) => {
          const isEarned = earned.includes(achievement.id);
          return (
            <View
              key={achievement.id}
              className={cn(
                'w-[48%] items-center rounded-xl border p-4',
                isEarned ? 'bg-primary/10 border-primary' : 'bg-card border-border',
              )}
            >
              <View
                className={cn(
                  'w-12 h-12 rounded-full items-center justify-center',
                  isEarned ? 'bg-primary' : 'bg-border',
                )}
              >
                <Text className={cn('text-xl', !isEarned && 'opacity-30')}>
                  {isEarned ? '⭐' : '🔒'}
                </Text>
              </View>
              <Text
                className={cn(
                  'text-sm text-center mt-1',
                  isEarned ? 'font-semibold' : 'text-muted-foreground',
                )}
                numberOfLines={2}
              >
                {achievement.title}
              </Text>
              <Text className="text-xs text-muted-foreground text-center">
                {isEarned ? t('progress.earned') : achievement.description}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
