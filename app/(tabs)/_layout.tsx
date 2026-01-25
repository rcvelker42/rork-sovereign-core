import { Tabs } from 'expo-router';
import { Home, Archive, BookOpen } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent.gold,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarStyle: {
          backgroundColor: Colors.background.secondary,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          letterSpacing: 0.5,
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(dashboard)"
        options={{
          title: 'Command',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(archive)"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color, size }) => <Archive size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(ledger)"
        options={{
          title: 'Ledger',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
