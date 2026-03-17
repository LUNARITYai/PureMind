import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useColorScheme } from 'nativewind';
import 'react-native-reanimated';
import '@/src/i18n';
import { useSettingsStore } from '@/src/stores/useSettingsStore';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const PureMindLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A0A0A',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0A0A0A',
    border: '#E5E5E5',
    notification: '#EF4444',
  },
};

const PureMindDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFFFFF',
    background: '#000000',
    card: '#000000',
    text: '#FFFFFF',
    border: 'transparent',
    notification: '#EF4444',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const systemScheme = useRNColorScheme();
  const themeSetting = useSettingsStore((s) => s.theme);
  const { setColorScheme } = useColorScheme();

  const isDark =
    themeSetting === 'system' ? systemScheme === 'dark' : themeSetting === 'dark';

  useEffect(() => {
    setColorScheme(isDark ? 'dark' : 'light');
  }, [isDark, setColorScheme]);

  return (
    <View className={isDark ? 'dark flex-1' : 'flex-1'}>
      <ThemeProvider value={isDark ? PureMindDarkTheme : PureMindLightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="counter/setup"
            options={{ title: 'New Tracker', presentation: 'modal' }}
          />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
