import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { spacing, borderRadius, typography } from '@/src/theme';

interface HelpResource {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  available24h: boolean;
  country: string;
}

const RESOURCES: HelpResource[] = [
  {
    name: 'SAMHSA National Helpline',
    description: 'Free, confidential, 24/7 treatment referral and information service',
    phone: '1-800-662-4357',
    website: 'https://www.samhsa.gov/find-help/national-helpline',
    available24h: true,
    country: 'US',
  },
  {
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741 for free crisis counseling',
    phone: '741741',
    website: 'https://www.crisistextline.org',
    available24h: true,
    country: 'US',
  },
  {
    name: 'Alcoholics Anonymous',
    description: 'Find local AA meetings and support',
    website: 'https://www.aa.org',
    available24h: false,
    country: 'International',
  },
  {
    name: 'Narcotics Anonymous',
    description: 'Recovery support for drug addiction',
    website: 'https://www.na.org',
    available24h: false,
    country: 'International',
  },
  {
    name: 'SMART Recovery',
    description: 'Science-based addiction recovery support',
    website: 'https://www.smartrecovery.org',
    available24h: false,
    country: 'International',
  },
  {
    name: 'Gamblers Anonymous',
    description: 'Support for compulsive gambling',
    website: 'https://www.gamblersanonymous.org',
    available24h: false,
    country: 'International',
  },
];

export default function HelpScreen() {
  const { t } = useTranslation();
  const theme = useThemeColors();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h1, { color: theme.text, marginBottom: spacing.sm }]}>
        {t('help.title')}
      </Text>

      {/* Emergency banner */}
      <View style={[styles.emergencyBanner, { backgroundColor: theme.danger + '15', borderColor: theme.danger }]}>
        <Text style={[typography.h3, { color: theme.danger }]}>
          {t('help.emergency')}
        </Text>
        <Text style={[typography.caption, { color: theme.textSecondary, marginTop: spacing.xs }]}>
          {t('help.disclaimer')}
        </Text>
      </View>

      {RESOURCES.map((resource) => (
        <View
          key={resource.name}
          style={[styles.resourceCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={styles.resourceHeader}>
            <Text style={[typography.h3, { color: theme.text, flex: 1 }]}>
              {resource.name}
            </Text>
            {resource.available24h && (
              <View style={[styles.badge24h, { backgroundColor: theme.success + '20' }]}>
                <Text style={[typography.small, { color: theme.success, fontWeight: '600' }]}>
                  {t('help.available24h')}
                </Text>
              </View>
            )}
          </View>

          <Text style={[typography.body, { color: theme.textSecondary, marginTop: spacing.xs }]}>
            {resource.description}
          </Text>

          <View style={styles.actionRow}>
            {resource.phone && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: theme.primary }]}
                onPress={() => handleCall(resource.phone!)}
              >
                <Text style={[typography.caption, { color: '#FFFFFF', fontWeight: '600' }]}>
                  📞 {t('help.callNow')}
                </Text>
              </Pressable>
            )}
            {resource.website && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: theme.accent }]}
                onPress={() => handleWebsite(resource.website!)}
              >
                <Text style={[typography.caption, { color: '#FFFFFF', fontWeight: '600' }]}>
                  🌐 {t('help.visitWebsite')}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}

      <Text style={[typography.caption, { color: theme.textSecondary, textAlign: 'center', marginTop: spacing.lg }]}>
        You are not alone. Reaching out is a sign of strength.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  emergencyBanner: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  resourceCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  resourceHeader: { flexDirection: 'row', alignItems: 'center' },
  badge24h: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
});
