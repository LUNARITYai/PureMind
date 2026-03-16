import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useJournalStore } from '@/src/stores/useJournalStore';
import { MOOD_EMOJIS, MOOD_LABELS } from '@/src/models/journal';
import { spacing, borderRadius, typography } from '@/src/theme';
import { format } from 'date-fns';

export default function JournalScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const entries = useJournalStore((s) => s.entries);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[typography.h1, { color: theme.text }]}>{t('journal.title')}</Text>
        <Link href="/journal/checkin" asChild>
          <Pressable style={[styles.checkInButton, { backgroundColor: theme.primary }]}>
            <Text style={[typography.body, { color: '#FFFFFF', fontWeight: '600' }]}>
              + {t('journal.checkIn')}
            </Text>
          </Pressable>
        </Link>
      </View>

      {entries.length === 0 ? (
        <View style={[styles.emptyState, { borderColor: theme.border }]}>
          <Text style={[typography.body, { color: theme.textSecondary, textAlign: 'center' }]}>
            {t('journal.emptyState')}
          </Text>
        </View>
      ) : (
        entries.map((entry) => (
          <View
            key={entry.id}
            style={[styles.entryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <View style={styles.entryHeader}>
              <Text style={{ fontSize: 28 }}>{MOOD_EMOJIS[entry.mood]}</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.body, { color: theme.text, fontWeight: '600' }]}>
                  {MOOD_LABELS[entry.mood]}
                </Text>
                <Text style={[typography.small, { color: theme.textSecondary }]}>
                  {format(new Date(entry.date), 'MMM d, yyyy · h:mm a')}
                </Text>
              </View>
              <View style={[styles.cravingBadge, {
                backgroundColor: entry.cravingIntensity > 7
                  ? theme.danger + '20'
                  : entry.cravingIntensity > 4
                    ? theme.warning + '20'
                    : theme.success + '20'
              }]}>
                <Text style={[typography.caption, {
                  color: entry.cravingIntensity > 7
                    ? theme.danger
                    : entry.cravingIntensity > 4
                      ? theme.warning
                      : theme.success,
                  fontWeight: '600',
                }]}>
                  {entry.cravingIntensity}/10
                </Text>
              </View>
            </View>

            {entry.triggers.length > 0 && (
              <View style={styles.triggerRow}>
                {entry.triggers.map((trigger) => (
                  <View key={trigger} style={[styles.triggerChip, { backgroundColor: theme.background }]}>
                    <Text style={[typography.small, { color: theme.textSecondary }]}>
                      {trigger}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {entry.notes && (
              <Text
                style={[typography.body, { color: theme.text, marginTop: spacing.sm }]}
                numberOfLines={2}
              >
                {entry.notes}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkInButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  emptyState: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  entryCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  entryHeader: { flexDirection: 'row', alignItems: 'center' },
  cravingBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  triggerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  triggerChip: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
});
