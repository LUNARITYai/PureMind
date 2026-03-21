import { ScrollView, View } from 'react-native';

import { Link } from 'expo-router';

import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { SobrietyCounter } from '@/src/components/counter/SobrietyCounter';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { useTrackerStore } from '@/src/stores/useTrackerStore';

export default function HomeScreen() {
  const { t } = useTranslation();
  const trackers = useTrackerStore(useShallow((s) => s.trackers.filter((t) => !t.isArchived)));
  const primaryId = useTrackerStore((s) => s.primaryTrackerId);

  const primaryTracker = trackers.find((t) => t.id === primaryId);
  const otherTrackers = trackers.filter((t) => t.id !== primaryId);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-6 pb-12">
      <Text className="text-[28px] font-bold leading-[34px] mb-6">{t('home.title')}</Text>

      {primaryTracker ? (
        <SobrietyCounter tracker={primaryTracker} isPrimary />
      ) : (
        <View className="rounded-2xl border border-dashed border-border items-center p-8 mb-6">
          <Text className="text-lg font-semibold text-center">{t('home.noTrackers')}</Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            {t('home.noTrackersSubtitle')}
          </Text>
        </View>
      )}

      {otherTrackers.map((tracker) => (
        <SobrietyCounter key={tracker.id} tracker={tracker} isPrimary={false} />
      ))}

      <Link href="/counter/setup" asChild>
        <Button className="mt-4">
          <Text>+ {t('home.addTracker')}</Text>
        </Button>
      </Link>
    </ScrollView>
  );
}
