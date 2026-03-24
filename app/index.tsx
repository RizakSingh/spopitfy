import { Redirect } from 'expo-router'
import { useAuth } from '../src/hooks/useAuth'
import { ActivityIndicator } from 'react-native'

export default function Index() {
  const { user, loading } = useAuth()

  if (loading) return <ActivityIndicator />

  if (!user) return <Redirect href="/(auth)/login" />

  return <Redirect href="/(tabs)/home" />
}