import React from 'react';
import { Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useColorScheme } from 'nativewind';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';

  const activeTint = isDark ? '#FFFFFF' : '#0A0A0A';
  const inactiveTint = isDark ? '#555555' : '#737373';
  const tabBarBg = isDark ? '#000000' : '#FFFFFF';
  const borderColor = isDark ? 'transparent' : '#E5E5E5';
  const headerBg = isDark ? '#000000' : '#FFFFFF';
  const headerTint = isDark ? '#FFFFFF' : '#0A0A0A';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: borderColor,
        },
        headerStyle: {
          backgroundColor: headerBg,
        },
        headerTintColor: headerTint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'timer', android: 'timer', web: 'timer' }}
              tintColor={color}
              size={24}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/settings')}
              style={{ marginRight: 16 }}
            >
              <SymbolView
                name={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
                tintColor={headerTint}
                size={22}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="knowledge"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'book', android: 'book', web: 'book' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'pencil.and.list.clipboard', android: 'edit_note', web: 'edit' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'chart.bar', android: 'bar_chart', web: 'bar_chart' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'heart', android: 'favorite', web: 'favorite' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
