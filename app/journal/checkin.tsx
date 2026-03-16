import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useJournalStore } from '@/src/stores/useJournalStore';
import { Mood, TriggerTag, MOOD_EMOJIS, MOOD_LABELS, TRIGGER_LABELS } from '@/src/models/journal';
import { spacing, borderRadius, typography } from '@/src/theme';

const MOODS: Mood[] = [1, 2, 3, 4, 5];
const TRIGGERS: TriggerTag[] = [
  'stress', 'loneliness', 'boredom', 'social_pressure', 'celebration',
  'anger', 'sadness', 'anxiety', 'physical_pain', 'habit_cue', 'relationship', 'work',
];

export default function CheckInScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const router = useRouter();
  const addCheckIn = useJournalStore((s) => s.addCheckIn);

  const [mood, setMood] = useState<Mood | null>(null);
  const [craving, setCraving] = useState(0);
  const [triggers, setTriggers] = useState<TriggerTag[]>([]);
  const [notes, setNotes] = useState('');

  const toggleTrigger = (tag: TriggerTag) => {
    setTriggers((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    if (!mood) return;
    addCheckIn({ mood, cravingIntensity: craving, triggers, notes: notes.trim() || undefined });
    router.back();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Mood */}
      <Text style={[typography.h2, { color: theme.text }]}>{t('journal.mood')}</Text>
      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Pressable
            key={m}
            style={[
              styles.moodButton,
              {
                backgroundColor: mood === m ? theme.primaryLight : theme.surface,
                borderColor: mood === m ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setMood(m)}
          >
            <Text style={{ fontSize: 32 }}>{MOOD_EMOJIS[m]}</Text>
            <Text style={[typography.small, { color: mood === m ? theme.primary : theme.textSecondary }]}>
              {MOOD_LABELS[m]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Craving */}
      <Text style={[typography.h2, { color: theme.text, marginTop: spacing.lg }]}>
        {t('journal.craving')}
      </Text>
      <View style={styles.cravingRow}>
        {Array.from({ length: 11 }, (_, i) => (
          <Pressable
            key={i}
            style={[
              styles.cravingDot,
              {
                backgroundColor: i <= craving
                  ? i > 7 ? theme.danger : i > 4 ? theme.warning : theme.success
                  : theme.border,
              },
            ]}
            onPress={() => setCraving(i)}
          >
            <Text style={[typography.small, { color: i <= craving ? '#FFF' : theme.textSecondary }]}>
              {i}
            </Text>
          </Pressable>
        ))}
      </View>
      {craving > 7 && (
        <Text style={[typography.caption, { color: theme.warning, marginTop: spacing.sm }]}>
          {t('journal.highCraving')}
        </Text>
      )}

      {/* Triggers */}
      <Text style={[typography.h2, { color: theme.text, marginTop: spacing.lg }]}>
        {t('journal.triggers')}
      </Text>
      <View style={styles.triggerGrid}>
        {TRIGGERS.map((tag) => (
          <Pressable
            key={tag}
            style={[
              styles.triggerChip,
              {
                backgroundColor: triggers.includes(tag) ? theme.primary : theme.surface,
                borderColor: triggers.includes(tag) ? theme.primary : theme.border,
              },
            ]}
            onPress={() => toggleTrigger(tag)}
          >
            <Text
              style={[
                typography.caption,
                { color: triggers.includes(tag) ? '#FFFFFF' : theme.text },
              ]}
            >
              {TRIGGER_LABELS[tag]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Notes */}
      <Text style={[typography.h2, { color: theme.text, marginTop: spacing.lg }]}>
        {t('journal.notes')}
      </Text>
      <TextInput
        style={[styles.notesInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        value={notes}
        onChangeText={setNotes}
        placeholder={t('journal.notesPlaceholder')}
        placeholderTextColor={theme.textSecondary}
        multiline
      />

      {/* Save */}
      <Pressable
        style={[
          styles.saveButton,
          { backgroundColor: mood ? theme.primary : theme.border, opacity: mood ? 1 : 0.5 },
        ]}
        onPress={handleSave}
        disabled={!mood}
      >
        <Text style={[typography.body, { color: '#FFFFFF', fontWeight: '700' }]}>
          {t('journal.save')}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  moodRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  cravingRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  cravingDot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 32,
    maxHeight: 32,
  },
  triggerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  triggerChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  notesInput: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  saveButton: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
});
