import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs  // ✅ TamaguiProvider hata diya — root layout mein already hai
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0a0000', borderTopColor: '#ff1a1a22' },
        tabBarActiveTintColor: '#ff1a1a',
        tabBarInactiveTintColor: '#663333',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="camera" options={{ title: 'Camera' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}