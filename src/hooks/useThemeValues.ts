import { useColorScheme } from 'nativewind';

const palette = {
  light: {
    foreground: '#0A0A0A',
    background: '#FFFFFF',
    card: '#FAFAFA',
    primary: '#171717',
    muted: '#A3A3A3',
    border: '#E5E5E5',
    destructive: '#EF4444',
    ring: '#0A0A0A',
  },
  dark: {
    foreground: '#FAFAFA',
    background: '#000000',
    card: '#0F0F0F',
    primary: '#FAFAFA',
    muted: '#A3A3A3',
    border: '#2E2E2E',
    destructive: '#EF4444',
    ring: '#D4D4D4',
  },
} as const;

export function useThemeValues() {
  const { colorScheme } = useColorScheme();
  return palette[colorScheme === 'dark' ? 'dark' : 'light'];
}
