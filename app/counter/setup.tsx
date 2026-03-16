import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { AddictionType, ADDICTION_LABELS } from '@/src/models/tracker';
import { spacing, borderRadius, typography } from '@/src/theme';

const ADDICTION_TYPES: AddictionType[] = [
  'alcohol', 'drugs', 'smoking', 'gambling',
  'pornography', 'social_media', 'gaming', 'shopping', 'other',
];

export default function CounterSetupScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const router = useRouter();
  const addTracker = useTrackerStore((s) => s.addTracker);

  const [selectedType, setSelectedType] = useState<AddictionType | null>(null);
  const [customLabel, setCustomLabel] = useState('');
  const [useCustomDate, setUseCustomDate] = useState(false);

  const handleCreate = () => {
    if (!selectedType) return;
    const startDate = new Date().toISOString();
    addTracker(selectedType, startDate, customLabel.trim() || undefined);
    router.back();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h2, { color: theme.text, marginBottom: spacing.lg }]}>
        {t('counter.selectType')}
      </Text>

      <View style={styles.typeGrid}>
        {ADDICTION_TYPES.map((type) => (
          <Pressable
            key={type}
            style={[
              styles.typeChip,
              {
                backgroundColor: selectedType === type ? theme.primary : theme.surface,
                borderColor: selectedType === type ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                typography.body,
                {
                  color: selectedType === type ? '#FFFFFF' : theme.text,
                  fontWeight: selectedType === type ? '600' : '400',
                },
              ]}
            >
              {ADDICTION_LABELS[type]}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedType === 'other' && (
        <View style={{ marginTop: spacing.md }}>
          <Text style={[typography.caption, { color: theme.textSecondary }]}>
            {t('counter.customLabel')}
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
            value={customLabel}
            onChangeText={setCustomLabel}
            placeholder="e.g., Sugar, Caffeine..."
            placeholderTextColor={theme.textSecondary}
          />
        </View>
      )}

      <Pressable
        style={[
          styles.createButton,
          {
            backgroundColor: selectedType ? theme.primary : theme.border,
            opacity: selectedType ? 1 : 0.5,
          },
        ]}
        onPress={handleCreate}
        disabled={!selectedType}
      >
        <Text style={[typography.body, { color: '#FFFFFF', fontWeight: '700' }]}>
          {t('counter.create')}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  typeChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: 16,
  },
  createButton: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
});
