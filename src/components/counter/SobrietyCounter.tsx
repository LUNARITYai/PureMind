import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useElapsedTime } from '@/src/hooks/useElapsedTime';
import { useThemeValues } from '@/src/hooks/useThemeValues';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { Tracker, ADDICTION_LABELS } from '@/src/models/tracker';
import { useTranslation } from 'react-i18next';
import { Text } from '@/src/components/ui/text';
import { Separator } from '@/src/components/ui/separator';
import { ResetModal } from './ResetModal';

const MILESTONES_DAYS = [1, 3, 7, 14, 30, 90, 180, 365];

interface Props {
  tracker: Tracker;
  isPrimary: boolean;
}

export function SobrietyCounter({ tracker, isPrimary }: Props) {
  const { t } = useTranslation();
  const colors = useThemeValues();
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
        className="rounded-xl border border-border bg-card p-4 mb-2"
        onLongPress={() => setShowReset(true)}
      >
        <View className="flex-row items-center gap-4">
          <Svg width={ringSize} height={ringSize}>
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={colors.border}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={colors.foreground}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${ringSize / 2}, ${ringSize / 2}`}
            />
          </Svg>
          <View className="flex-1">
            <Text className="text-sm text-muted-foreground">{label}</Text>
            <Text className="text-lg font-semibold">
              {elapsed.days} {t('home.days')}
            </Text>
            <Text className="text-xs text-muted-foreground">
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
      className="rounded-2xl border border-border bg-card p-6 items-center mb-6"
      onLongPress={() => setShowReset(true)}
    >
      <Text className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
        {label}
      </Text>

      <View className="relative items-center justify-center">
        <Svg width={ringSize} height={ringSize}>
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={colors.foreground}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${ringSize / 2}, ${ringSize / 2}`}
          />
        </Svg>
        <View className="absolute items-center justify-center">
          <Text className="text-[48px] font-bold font-mono leading-[56px]">
            {elapsed.days}
          </Text>
          <Text className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t('home.days')}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 mt-6">
        <TimeUnit value={pad(elapsed.hours)} label={t('home.hours')} />
        <Text className="text-lg font-semibold text-muted-foreground">:</Text>
        <TimeUnit value={pad(elapsed.minutes)} label={t('home.minutes')} />
        <Text className="text-lg font-semibold text-muted-foreground">:</Text>
        <TimeUnit value={pad(elapsed.seconds)} label={t('home.seconds')} />
      </View>

      <Separator className="mt-6" />

      <View className="flex-row justify-around w-full mt-4">
        <StatItem
          label={t('home.longestStreak')}
          value={`${getLongestStreak(tracker)} ${t('home.days')}`}
        />
        <StatItem
          label={t('home.totalResets')}
          value={`${tracker.resets.length}`}
        />
      </View>

      <Text className="text-xs text-muted-foreground text-center mt-2">
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

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <View className="items-center">
      <Text className="text-xl font-mono font-semibold">
        {value}
      </Text>
      <Text className="text-xs text-muted-foreground">{label}</Text>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center">
      <Text className="text-lg font-semibold">{value}</Text>
      <Text className="text-xs text-muted-foreground">{label}</Text>
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
