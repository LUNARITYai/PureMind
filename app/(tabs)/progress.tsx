import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { useAchievementStore } from '@/src/stores/useAchievementStore';
import { useJournalStore } from '@/src/stores/useJournalStore';
import { ACHIEVEMENTS } from '@/src/models/achievement';
import { spacing, borderRadius, typography } from '@/src/theme';
import { useEffect } from 'react';

export default function ProgressScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const trackers = useTrackerStore((s) => s.trackers);
  const entries = useJournalStore((s) => s.entries);
  const earned = useAchievementStore((s) => s.earned);
  const evaluate = useAchievementStore((s) => s.evaluate);

  useEffect(() => {
    evaluate(trackers, entries);
  }, [trackers, entries]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h1, { color: theme.text, marginBottom: spacing.lg }]}>
        {t('progress.title')}
      </Text>

      <Text style={[typography.h2, { color: theme.text, marginBottom: spacing.md }]}>
        {t('progress.achievements')}
      </Text>

      <View style={styles.badgeGrid}>
        {ACHIEVEMENTS.map((achievement) => {
          const isEarned = earned.includes(achievement.id);
          return (
            <View
              key={achievement.id}
              style={[
                styles.badgeCard,
                {
                  backgroundColor: isEarned ? theme.primary + '15' : theme.surface,
                  borderColor: isEarned ? theme.primary : theme.border,
                },
              ]}
            >
              <View
                style={[
                  styles.badgeIcon,
                  {
                    backgroundColor: isEarned ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text style={{ fontSize: 20, opacity: isEarned ? 1 : 0.3 }}>
                  {isEarned ? '⭐' : '🔒'}
                </Text>
              </View>
              <Text
                style={[
                  typography.caption,
                  {
                    color: isEarned ? theme.text : theme.textSecondary,
                    fontWeight: isEarned ? '600' : '400',
                    textAlign: 'center',
                    marginTop: spacing.xs,
                  },
                ]}
                numberOfLines={2}
              >
                {achievement.title}
              </Text>
              <Text style={[typography.small, { color: theme.textSecondary, textAlign: 'center' }]}>
                {isEarned ? t('progress.earned') : achievement.description}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  badgeCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
