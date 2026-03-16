import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { spacing, borderRadius, typography } from '@/src/theme';
import { SobrietyCounter } from '@/src/components/counter/SobrietyCounter';

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const trackers = useTrackerStore(useShallow((s) => s.trackers.filter((t) => !t.isArchived)));
  const primaryId = useTrackerStore((s) => s.primaryTrackerId);

  const primaryTracker = trackers.find((t) => t.id === primaryId);
  const otherTrackers = trackers.filter((t) => t.id !== primaryId);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h1, styles.title, { color: theme.text }]}>
        {t('home.title')}
      </Text>

      {primaryTracker ? (
        <SobrietyCounter tracker={primaryTracker} isPrimary />
      ) : (
        <View style={[styles.emptyState, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[typography.h3, { color: theme.text, textAlign: 'center' }]}>
            {t('home.noTrackers')}
          </Text>
          <Text style={[typography.body, styles.emptySubtitle, { color: theme.textSecondary }]}>
            {t('home.noTrackersSubtitle')}
          </Text>
        </View>
      )}

      {otherTrackers.map((tracker) => (
        <SobrietyCounter key={tracker.id} tracker={tracker} isPrimary={false} />
      ))}

      <Link href="/counter/setup" asChild>
        <Pressable style={StyleSheet.flatten([styles.addButton, { backgroundColor: theme.primary }])}>
          <Text style={[typography.body, { color: '#FFFFFF', fontWeight: '600' }]}>
            + {t('home.addTracker')}
          </Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { marginBottom: spacing.lg },
  emptyState: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptySubtitle: { marginTop: spacing.sm, textAlign: 'center' },
  addButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
