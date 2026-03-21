import React from 'react';

import { ScrollView, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Text } from '@/src/components/ui/text';

const CATEGORIES = [
  {
    id: 'understanding',
    title: 'Understanding Addiction',
    description: 'What addiction is and how it works',
    icon: '🧠',
  },
  {
    id: 'coping',
    title: 'Coping Strategies',
    description: 'Practical tools for managing cravings',
    icon: '🛡️',
  },
  {
    id: 'brain-body',
    title: 'Brain & Body',
    description: 'How addiction affects your health',
    icon: '💪',
  },
  {
    id: 'recovery',
    title: 'Recovery Stages',
    description: 'What to expect on your journey',
    icon: '🌱',
  },
  {
    id: 'loved-ones',
    title: 'For Loved Ones',
    description: 'How to support someone in recovery',
    icon: '❤️',
  },
  {
    id: 'behavioral',
    title: 'Behavioral Addictions',
    description: 'Gaming, social media, gambling & more',
    icon: '📱',
  },
];

export default function KnowledgeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-6 pb-12">
      <Text className="text-[28px] font-bold leading-[34px] mb-6">{t('knowledge.title')}</Text>

      {CATEGORIES.map((cat) => (
        <View
          key={cat.id}
          className="flex-row items-center rounded-xl border border-border bg-card p-4 mb-2"
        >
          <Text className="text-[32px]">{cat.icon}</Text>
          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold">{cat.title}</Text>
            <Text className="text-sm text-muted-foreground mt-0.5">{cat.description}</Text>
          </View>
          <Text className="text-muted-foreground text-lg">→</Text>
        </View>
      ))}

      <Text className="text-sm text-muted-foreground text-center mt-6">
        More content coming soon. Your journey of learning never ends.
      </Text>
    </ScrollView>
  );
}
