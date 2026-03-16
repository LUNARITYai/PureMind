import { useColorScheme } from 'react-native';
import { colors, ThemeColors } from '@/src/theme/colors';
import { useSettingsStore } from '@/src/stores/useSettingsStore';

export function useThemeColors(): ThemeColors {
  const systemScheme = useColorScheme();
  const themeSetting = useSettingsStore((s) => s.theme);

  const resolvedScheme: 'light' | 'dark' =
    themeSetting === 'system'
      ? (systemScheme === 'dark' ? 'dark' : 'light')
      : themeSetting;

  return colors[resolvedScheme];
}
