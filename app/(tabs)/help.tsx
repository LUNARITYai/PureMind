import React from 'react';
import { ScrollView, View, Pressable, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';

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

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-12"
    >
      <Text className="text-[28px] font-bold leading-[34px] mb-2">
        {t('help.title')}
      </Text>

      {/* Emergency banner */}
      <View className="rounded-xl border border-destructive bg-destructive/10 p-4 mb-6">
        <Text className="text-lg font-semibold text-destructive">
          {t('help.emergency')}
        </Text>
        <Text className="text-sm text-muted-foreground mt-1">
          {t('help.disclaimer')}
        </Text>
      </View>

      {RESOURCES.map((resource) => (
        <View
          key={resource.name}
          className="rounded-xl border border-border bg-card p-4 mb-2"
        >
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold flex-1">
              {resource.name}
            </Text>
            {resource.available24h && (
              <View className="rounded-full bg-foreground/10 px-2 py-0.5">
                <Text className="text-xs font-semibold text-muted-foreground">
                  {t('help.available24h')}
                </Text>
              </View>
            )}
          </View>

          <Text className="text-base text-muted-foreground mt-1">
            {resource.description}
          </Text>

          <View className="flex-row gap-2 mt-4">
            {resource.phone && (
              <Pressable
                className="rounded-full bg-primary px-4 py-2"
                onPress={() => handleCall(resource.phone!)}
              >
                <Text className="text-sm font-semibold text-primary-foreground">
                  📞 {t('help.callNow')}
                </Text>
              </Pressable>
            )}
            {resource.website && (
              <Pressable
                className="rounded-full border border-border px-4 py-2"
                onPress={() => handleWebsite(resource.website!)}
              >
                <Text className="text-sm font-semibold text-foreground">
                  🌐 {t('help.visitWebsite')}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}

      <Text className="text-sm text-muted-foreground text-center mt-6">
        You are not alone. Reaching out is a sign of strength.
      </Text>
    </ScrollView>
  );
}
