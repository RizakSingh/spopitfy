import { YStack, Text, Button } from 'tamagui'
import { router } from 'expo-router'
import AppButton from '../../src/components/AppButton'
export default function HomeScreen() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="$6" color="#ff1a1a">
        🔥 Your Streak: 0
      </Text>

      <Button
        onPress={() => router.push('/(tabs)/camera')}
        style={{
          marginTop: 20,
          backgroundColor: '#ff1a1a',
        }}
      >
       <AppButton><Text>Add Proof</Text></AppButton>
      </Button>
    </YStack>
  )
}