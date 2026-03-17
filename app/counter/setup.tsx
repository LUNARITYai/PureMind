import React, { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { AddictionType, ADDICTION_LABELS } from '@/src/models/tracker';
import { Text } from '@/src/components/ui/text';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

const ADDICTION_TYPES: AddictionType[] = [
  'alcohol', 'drugs', 'smoking', 'gambling',
  'pornography', 'social_media', 'gaming', 'shopping', 'other',
];

export default function CounterSetupScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const addTracker = useTrackerStore((s) => s.addTracker);

  const [selectedType, setSelectedType] = useState<AddictionType | null>(null);
  const [customLabel, setCustomLabel] = useState('');

  const handleCreate = () => {
    if (!selectedType) return;
    const startDate = new Date().toISOString();
    addTracker(selectedType, startDate, customLabel.trim() || undefined);
    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-12"
    >
      <Text className="text-2xl font-semibold mb-6">
        {t('counter.selectType')}
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {ADDICTION_TYPES.map((type) => (
          <Pressable
            key={type}
            className={cn(
              'rounded-full border px-4 py-2',
              selectedType === type
                ? 'bg-primary border-primary'
                : 'bg-card border-border'
            )}
            onPress={() => setSelectedType(type)}
          >
            <Text
              className={cn(
                'text-base',
                selectedType === type
                  ? 'text-primary-foreground font-semibold'
                  : 'text-foreground'
              )}
            >
              {ADDICTION_LABELS[type]}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedType === 'other' && (
        <View className="mt-4">
          <Text className="text-sm text-muted-foreground mb-2">
            {t('counter.customLabel')}
          </Text>
          <Input
            value={customLabel}
            onChangeText={setCustomLabel}
            placeholder="e.g., Sugar, Caffeine..."
          />
        </View>
      )}

      <Button
        className="mt-8"
        onPress={handleCreate}
        disabled={!selectedType}
      >
        <Text>{t('counter.create')}</Text>
      </Button>
    </ScrollView>
  );
}
