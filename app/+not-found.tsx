import { View } from 'react-native';

import { Link, Stack } from 'expo-router';

import { Text } from '@/src/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-background">
        <Text className="text-xl font-bold">This screen doesn&apos;t exist.</Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm text-muted-foreground">Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}
