import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { spacing, borderRadius, typography } from '@/src/theme';

const CATEGORIES = [
  { id: 'understanding', title: 'Understanding Addiction', description: 'What addiction is and how it works', icon: '🧠' },
  { id: 'coping', title: 'Coping Strategies', description: 'Practical tools for managing cravings', icon: '🛡️' },
  { id: 'brain-body', title: 'Brain & Body', description: 'How addiction affects your health', icon: '💪' },
  { id: 'recovery', title: 'Recovery Stages', description: 'What to expect on your journey', icon: '🌱' },
  { id: 'loved-ones', title: 'For Loved Ones', description: 'How to support someone in recovery', icon: '❤️' },
  { id: 'behavioral', title: 'Behavioral Addictions', description: 'Gaming, social media, gambling & more', icon: '📱' },
];

export default function KnowledgeScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h1, { color: theme.text, marginBottom: spacing.lg }]}>
        {t('knowledge.title')}
      </Text>

      {CATEGORIES.map((cat) => (
        <View
          key={cat.id}
          style={[styles.categoryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Text style={{ fontSize: 32 }}>{cat.icon}</Text>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={[typography.h3, { color: theme.text }]}>{cat.title}</Text>
            <Text style={[typography.caption, { color: theme.textSecondary, marginTop: 2 }]}>
              {cat.description}
            </Text>
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 18 }}>→</Text>
        </View>
      ))}

      <Text style={[typography.caption, { color: theme.textSecondary, textAlign: 'center', marginTop: spacing.lg }]}>
        More content coming soon. Your journey of learning never ends.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
});
