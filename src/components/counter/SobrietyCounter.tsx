import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useElapsedTime } from '@/src/hooks/useElapsedTime';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { Tracker, ADDICTION_LABELS } from '@/src/models/tracker';
import { spacing, borderRadius, typography } from '@/src/theme';
import { useTranslation } from 'react-i18next';
import { ResetModal } from './ResetModal';

const MILESTONES_DAYS = [1, 3, 7, 14, 30, 90, 180, 365];

interface Props {
  tracker: Tracker;
  isPrimary: boolean;
}

export function SobrietyCounter({ tracker, isPrimary }: Props) {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const elapsed = useElapsedTime(tracker.startDate);
  const [showReset, setShowReset] = useState(false);

  const nextMilestone = MILESTONES_DAYS.find((m) => m > elapsed.days) ?? elapsed.days + 30;
  const prevMilestone = [...MILESTONES_DAYS].reverse().find((m) => m <= elapsed.days) ?? 0;
  const progress = nextMilestone > prevMilestone
    ? (elapsed.days - prevMilestone) / (nextMilestone - prevMilestone)
    : 0;

  const ringSize = isPrimary ? 200 : 100;
  const strokeWidth = isPrimary ? 10 : 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(progress, 1));

  const pad = (n: number) => n.toString().padStart(2, '0');

  const label = tracker.customLabel || ADDICTION_LABELS[tracker.type];

  if (!isPrimary) {
    return (
      <Pressable
        style={[styles.smallCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onLongPress={() => setShowReset(true)}
      >
        <View style={styles.smallRow}>
          <Svg width={ringSize} height={ringSize}>
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={theme.border}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={theme.primary}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${ringSize / 2}, ${ringSize / 2}`}
            />
          </Svg>
          <View style={styles.smallInfo}>
            <Text style={[typography.caption, { color: theme.textSecondary }]}>{label}</Text>
            <Text style={[typography.h3, { color: theme.text }]}>
              {elapsed.days} {t('home.days')}
            </Text>
            <Text style={[typography.small, { color: theme.textSecondary }]}>
              {pad(elapsed.hours)}:{pad(elapsed.minutes)}:{pad(elapsed.seconds)}
            </Text>
          </View>
        </View>
        <ResetModal
          visible={showReset}
          onClose={() => setShowReset(false)}
          trackerId={tracker.id}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.primaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onLongPress={() => setShowReset(true)}
    >
      <Text style={[typography.caption, styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>

      <View style={styles.ringContainer}>
        <Svg width={ringSize} height={ringSize}>
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={theme.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={theme.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${ringSize / 2}, ${ringSize / 2}`}
          />
        </Svg>
        <View style={styles.counterOverlay}>
          <Text style={[typography.counter, { color: theme.text }]}>
            {elapsed.days}
          </Text>
          <Text style={[typography.counterLabel, { color: theme.textSecondary }]}>
            {t('home.days')}
          </Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        <TimeUnit value={pad(elapsed.hours)} label={t('home.hours')} theme={theme} />
        <Text style={[typography.h3, { color: theme.textSecondary }]}>:</Text>
        <TimeUnit value={pad(elapsed.minutes)} label={t('home.minutes')} theme={theme} />
        <Text style={[typography.h3, { color: theme.textSecondary }]}>:</Text>
        <TimeUnit value={pad(elapsed.seconds)} label={t('home.seconds')} theme={theme} />
      </View>

      <View style={styles.statsRow}>
        <StatItem
          label={t('home.longestStreak')}
          value={`${getLongestStreak(tracker)} ${t('home.days')}`}
          theme={theme}
        />
        <StatItem
          label={t('home.totalResets')}
          value={`${tracker.resets.length}`}
          theme={theme}
        />
      </View>

      <Text style={[typography.small, { color: theme.textSecondary, textAlign: 'center', marginTop: spacing.sm }]}>
        Next milestone: {nextMilestone} {t('home.days')}
      </Text>

      <ResetModal
        visible={showReset}
        onClose={() => setShowReset(false)}
        trackerId={tracker.id}
      />
    </Pressable>
  );
}

function TimeUnit({ value, label, theme }: { value: string; label: string; theme: any }) {
  return (
    <View style={styles.timeUnit}>
      <Text style={[{ fontSize: 20, fontFamily: 'SpaceMono', fontWeight: '600', color: theme.text }]}>
        {value}
      </Text>
      <Text style={[typography.small, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );
}

function StatItem({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={styles.statItem}>
      <Text style={[typography.h3, { color: theme.text }]}>{value}</Text>
      <Text style={[typography.small, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );
}

function getLongestStreak(tracker: Tracker): number {
  const currentDays = Math.floor(
    (Date.now() - new Date(tracker.startDate).getTime()) / 86400000
  );
  const resetStreaks = tracker.resets.map((r) => r.durationDays);
  return Math.max(currentDays, ...resetStreaks, 0);
}

const styles = StyleSheet.create({
  primaryCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  label: { marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 },
  ringContainer: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  counterOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  timeUnit: { alignItems: 'center' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  statItem: { alignItems: 'center' },
  smallCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  smallRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  smallInfo: { flex: 1 },
});
