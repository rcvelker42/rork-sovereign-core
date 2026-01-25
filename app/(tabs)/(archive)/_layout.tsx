import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function ArchiveLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background.primary },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="[principleId]" 
        options={{
          headerShown: true,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}
