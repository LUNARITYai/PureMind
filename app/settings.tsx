import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { spacing, borderRadius, typography } from '@/src/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const currentTheme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const themeOptions = ['system', 'light', 'dark'] as const;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h2, { color: theme.text, marginBottom: spacing.md }]}>
        {t('settings.theme')}
      </Text>
      <View style={styles.optionRow}>
        {themeOptions.map((opt) => (
          <Pressable
            key={opt}
            style={[
              styles.optionButton,
              {
                backgroundColor: currentTheme === opt ? theme.primary : theme.surface,
                borderColor: currentTheme === opt ? theme.primary : theme.border,
              },
            ]}
            onPress={() => setTheme(opt)}
          >
            <Text
              style={[
                typography.body,
                {
                  color: currentTheme === opt ? '#FFFFFF' : theme.text,
                  fontWeight: currentTheme === opt ? '600' : '400',
                },
              ]}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.privacyBanner, { backgroundColor: theme.success + '15', borderColor: theme.success }]}>
        <Text style={[typography.body, { color: theme.success, fontWeight: '600' }]}>
          🔒 {t('settings.privacy')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  optionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  optionButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  privacyBanner: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
});
