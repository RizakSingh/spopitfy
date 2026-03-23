import { YStack, Text, Button } from 'tamagui'

export default function LoginScreen() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      style={{ padding: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Login
      </Text>

      <Button style={{ marginTop: 20 }}>
       <Text>Login (Coming soon)</Text>
      </Button>
    </YStack>
  )
}