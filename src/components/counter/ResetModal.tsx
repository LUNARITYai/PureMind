import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useTrackerStore } from '@/src/stores/useTrackerStore';
import { spacing, borderRadius, typography } from '@/src/theme';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean;
  onClose: () => void;
  trackerId: string;
}

export function ResetModal({ visible, onClose, trackerId }: Props) {
  const { t } = useTranslation();
  const theme = useThemeColors();
  const resetTracker = useTrackerStore((s) => s.resetTracker);
  const [note, setNote] = useState('');

  const handleReset = () => {
    resetTracker(trackerId, note.trim() || undefined);
    setNote('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: theme.surface }]}>
          <Text style={[typography.h2, { color: theme.text, textAlign: 'center' }]}>
            {t('counter.reset.title')}
          </Text>

          <Text style={[typography.body, styles.message, { color: theme.textSecondary }]}>
            {t('counter.reset.message')}
          </Text>

          <Text style={[typography.caption, { color: theme.textSecondary, marginTop: spacing.md }]}>
            {t('counter.reset.notePrompt')}
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
            value={note}
            onChangeText={setNote}
            placeholder="..."
            placeholderTextColor={theme.textSecondary}
            multiline
          />

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, { backgroundColor: theme.background, borderColor: theme.border, borderWidth: 1 }]}
              onPress={onClose}
            >
              <Text style={[typography.body, { color: theme.text, fontWeight: '600' }]}>
                {t('counter.reset.cancel')}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: theme.danger }]}
              onPress={handleReset}
            >
              <Text style={[typography.body, { color: '#FFFFFF', fontWeight: '600' }]}>
                {t('counter.reset.confirm')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modal: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
});
