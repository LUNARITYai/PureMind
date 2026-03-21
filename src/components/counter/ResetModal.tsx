import React, { useState } from 'react';

import { Modal, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { useTrackerStore } from '@/src/stores/useTrackerStore';

interface Props {
  visible: boolean;
  onClose: () => void;
  trackerId: string;
}

export function ResetModal({ visible, onClose, trackerId }: Props) {
  const { t } = useTranslation();
  const resetTracker = useTrackerStore((s) => s.resetTracker);
  const [note, setNote] = useState('');

  const handleReset = () => {
    resetTracker(trackerId, note.trim() || undefined);
    setNote('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center p-6 bg-black/50">
        <View className="rounded-2xl bg-card p-6">
          <Text className="text-2xl font-semibold text-center">{t('counter.reset.title')}</Text>

          <Text className="text-base text-muted-foreground text-center mt-4 leading-[22px]">
            {t('counter.reset.message')}
          </Text>

          <Text className="text-sm text-muted-foreground mt-4">
            {t('counter.reset.notePrompt')}
          </Text>
          <Input
            className="mt-2 min-h-[80px] py-3"
            style={{ textAlignVertical: 'top' }}
            value={note}
            onChangeText={setNote}
            placeholder="..."
            multiline
          />

          <View className="flex-row gap-2 mt-6">
            <Button variant="outline" className="flex-1" onPress={onClose}>
              <Text>{t('counter.reset.cancel')}</Text>
            </Button>
            <Button variant="destructive" className="flex-1" onPress={handleReset}>
              <Text>{t('counter.reset.confirm')}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
