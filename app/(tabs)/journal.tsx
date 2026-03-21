import React from 'react';

import { ScrollView, View, Pressable } from 'react-native';

import { Link } from 'expo-router';

import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Text } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';
import { MOOD_EMOJIS, MOOD_LABELS } from '@/src/models/journal';
import { useJournalStore } from '@/src/stores/useJournalStore';

export default function JournalScreen() {
  const { t } = useTranslation();
  const entries = useJournalStore((s) => s.entries);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-6 pb-12">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[28px] font-bold leading-[34px]">{t('journal.title')}</Text>
        <Link href="/journal/checkin" asChild>
          <Pressable className="rounded-full bg-primary px-4 py-2">
            <Text className="text-base font-semibold text-primary-foreground">
              + {t('journal.checkIn')}
            </Text>
          </Pressable>
        </Link>
      </View>

      {entries.length === 0 ? (
        <View className="rounded-2xl border border-dashed border-border items-center p-8">
          <Text className="text-base text-muted-foreground text-center">
            {t('journal.emptyState')}
          </Text>
        </View>
      ) : (
        entries.map((entry) => (
          <View key={entry.id} className="rounded-xl border border-border bg-card p-4 mb-2">
            <View className="flex-row items-center">
              <Text className="text-[28px]">{MOOD_EMOJIS[entry.mood]}</Text>
              <View className="flex-1 ml-4">
                <Text className="font-semibold">{MOOD_LABELS[entry.mood]}</Text>
                <Text className="text-xs text-muted-foreground">
                  {format(new Date(entry.date), 'MMM d, yyyy · h:mm a')}
                </Text>
              </View>
              <View
                className={cn(
                  'rounded-full px-2 py-1',
                  entry.cravingIntensity > 7
                    ? 'bg-destructive/20'
                    : entry.cravingIntensity > 4
                      ? 'bg-foreground/10'
                      : 'bg-foreground/5',
                )}
              >
                <Text
                  className={cn(
                    'text-sm font-semibold',
                    entry.cravingIntensity > 7 ? 'text-destructive' : 'text-muted-foreground',
                  )}
                >
                  {entry.cravingIntensity}/10
                </Text>
              </View>
            </View>

            {entry.triggers.length > 0 && (
              <View className="flex-row flex-wrap gap-1 mt-2">
                {entry.triggers.map((trigger) => (
                  <View key={trigger} className="rounded-full bg-background px-2 py-0.5">
                    <Text className="text-xs text-muted-foreground">{trigger}</Text>
                  </View>
                ))}
              </View>
            )}

            {entry.notes && (
              <Text className="mt-2" numberOfLines={2}>
                {entry.notes}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
