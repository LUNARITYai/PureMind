import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { Text } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const currentTheme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const themeOptions = ['system', 'light', 'dark'] as const;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-12"
    >
      <Text className="text-2xl font-semibold mb-4">
        {t('settings.theme')}
      </Text>

      <View className="flex-row gap-2 mb-8">
        {themeOptions.map((opt) => (
          <Pressable
            key={opt}
            className={cn(
              'flex-1 items-center rounded-xl border p-4',
              currentTheme === opt
                ? 'bg-primary border-primary'
                : 'bg-card border-border'
            )}
            onPress={() => setTheme(opt)}
          >
            <Text
              className={cn(
                'text-base',
                currentTheme === opt
                  ? 'text-primary-foreground font-semibold'
                  : 'text-foreground'
              )}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="rounded-xl border border-border bg-card p-4">
        <Text className="font-semibold text-muted-foreground">
          🔒 {t('settings.privacy')}
        </Text>
      </View>
    </ScrollView>
  );
}
