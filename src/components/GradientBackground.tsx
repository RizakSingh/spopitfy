import { LinearGradient } from 'expo-linear-gradient'
import { YStack } from 'tamagui'

export default function GradientBackground({ children }: any) {
  return (
    <LinearGradient
      colors={['#000000', '#1a0000', '#a13636']}
      style={{ flex: 1 }}
    >
      <YStack flex={1}>{children}</YStack>
    </LinearGradient>
  )
}