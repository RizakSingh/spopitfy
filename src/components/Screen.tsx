import { YStack } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'

export default function Screen({ children }: any) {
  return (
    <LinearGradient
          colors={['#0a0000', '#1a0000', '#853131']}
      style={{ flex: 1 }}
    >
      <YStack flex={1} padding="$4">
        {children}
      </YStack>
    </LinearGradient>
  )
}