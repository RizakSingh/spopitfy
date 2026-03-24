import { useState } from 'react'
import { YStack, Input, Button, Text } from 'tamagui'
import { signup } from '../../src/services/auth'
import { createUserDoc } from '../../src/services/firestore'
import { router } from 'expo-router'

export default function SignupScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    try {
      setLoading(true)
      setError('')

      // 1. Create user in Firebase Auth
      const userCredential = await signup(email, password)

      // 2. Save user in Firestore
      await createUserDoc(userCredential.user.uid, email)

      // 3. Redirect to home
      router.replace('/(tabs)/home')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} justifyContent="center" style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Signup
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginTop: 20 }}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginTop: 10 }}
      />

      {error ? (
        <Text style={{ color: 'red', marginTop: 10 }}>
          {error}
        </Text>
      ) : null}

      <Button 
        onPress={handleSignup}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        {loading ? <Text>Creating...</Text> : <Text>Signup</Text>}
      </Button>
    </YStack>
  )
}