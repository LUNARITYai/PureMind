import React, { useState } from 'react';

import { ScrollView, View, Pressable } from 'react-native';

import { useRouter } from 'expo-router';

import { useTranslation } from 'react-i18next';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';
import {
  type Mood,
  type TriggerTag,
  MOOD_EMOJIS,
  MOOD_LABELS,
  TRIGGER_LABELS,
} from '@/src/models/journal';
import { useJournalStore } from '@/src/stores/useJournalStore';

const MOODS: Mood[] = [1, 2, 3, 4, 5];
const TRIGGERS: TriggerTag[] = [
  'stress',
  'loneliness',
  'boredom',
  'social_pressure',
  'celebration',
  'anger',
  'sadness',
  'anxiety',
  'physical_pain',
  'habit_cue',
  'relationship',
  'work',
];

export default function CheckInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const addCheckIn = useJournalStore((s) => s.addCheckIn);

  const [mood, setMood] = useState<Mood | null>(null);
  const [craving, setCraving] = useState(0);
  const [triggers, setTriggers] = useState<TriggerTag[]>([]);
  const [notes, setNotes] = useState('');

  const toggleTrigger = (tag: TriggerTag) => {
    setTriggers((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSave = () => {
    if (!mood) return;
    addCheckIn({ mood, cravingIntensity: craving, triggers, notes: notes.trim() || undefined });
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-6 pb-12">
      {/* Mood */}
      <Text className="text-2xl font-semibold">{t('journal.mood')}</Text>
      <View className="flex-row gap-2 mt-4">
        {MOODS.map((m) => (
          <Pressable
            key={m}
            className={cn(
              'flex-1 items-center py-4 rounded-xl border',
              mood === m ? 'bg-primary/10 border-primary' : 'bg-card border-border',
            )}
            onPress={() => setMood(m)}
          >
            <Text className="text-[32px]">{MOOD_EMOJIS[m]}</Text>
            <Text
              className={cn(
                'text-xs mt-1',
                mood === m ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {MOOD_LABELS[m]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Craving */}
      <Text className="text-2xl font-semibold mt-6">{t('journal.craving')}</Text>
      <View className="flex-row gap-1 mt-4">
        {Array.from({ length: 11 }, (_, i) => (
          <Pressable
            key={i}
            className={cn(
              'flex-1 aspect-square max-w-[32px] max-h-[32px] rounded-full items-center justify-center',
              i <= craving
                ? i > 7
                  ? 'bg-destructive'
                  : i > 4
                    ? 'bg-muted-foreground'
                    : 'bg-foreground'
                : 'bg-border',
            )}
            onPress={() => setCraving(i)}
          >
            <Text
              className={cn('text-xs', i <= craving ? 'text-background' : 'text-muted-foreground')}
            >
              {i}
            </Text>
          </Pressable>
        ))}
      </View>
      {craving > 7 && (
        <Text className="text-sm text-destructive mt-2">{t('journal.highCraving')}</Text>
      )}

      {/* Triggers */}
      <Text className="text-2xl font-semibold mt-6">{t('journal.triggers')}</Text>
      <View className="flex-row flex-wrap gap-2 mt-4">
        {TRIGGERS.map((tag) => (
          <Pressable
            key={tag}
            className={cn(
              'rounded-full border px-4 py-2',
              triggers.includes(tag) ? 'bg-primary border-primary' : 'bg-card border-border',
            )}
            onPress={() => toggleTrigger(tag)}
          >
            <Text
              className={cn(
                'text-sm',
                triggers.includes(tag) ? 'text-primary-foreground' : 'text-foreground',
              )}
            >
              {TRIGGER_LABELS[tag]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Notes */}
      <Text className="text-2xl font-semibold mt-6">{t('journal.notes')}</Text>
      <Input
        className="mt-4 min-h-[120px] py-3"
        style={{ textAlignVertical: 'top' }}
        value={notes}
        onChangeText={setNotes}
        placeholder={t('journal.notesPlaceholder')}
        multiline
      />

      {/* Save */}
      <Button className="mt-8" onPress={handleSave} disabled={!mood}>
        <Text>{t('journal.save')}</Text>
      </Button>
    </ScrollView>
  );
}
