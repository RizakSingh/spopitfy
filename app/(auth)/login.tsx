import { useState } from 'react'
import { YStack, XStack, Text, styled } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { login, signup } from '../../src/services/auth'
import { createUserDoc } from '../../src/services/firestore'
import { router } from 'expo-router'
import AppInput from '../../src/components/AppInput'
import AppButton from '../../src/components/AppButton'

const Card = styled(YStack, {
  backgroundColor: '#110000',
  borderRadius: '$6',
  borderWidth: 1,
  borderColor: '#ff1a1a22',
  overflow: 'hidden',
})

const TabButton = styled(YStack, {
  flex: 1,
  paddingVertical: '$2',
  alignItems: 'center',
  borderRadius: '$4',
  variants: {
    active: {
      true: { backgroundColor: '#ad2121' },
      false: { backgroundColor: 'transparent' },
    },
  } as const,
})

const GoogleButton = styled(YStack, {
  height: 52,
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '#330000',
  backgroundColor: '#150000',
  alignItems: 'center',
  justifyContent: 'center',
  pressStyle: { backgroundColor: '#1f0000' },
})

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = async () => {
    try {
      setLoading(true)
      setError('')
      if (isSignup) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        const res = await signup(email, password)
        await createUserDoc(res.user.uid, email)
      } else {
        await login(email, password)
      }
      router.replace('/(tabs)/home')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient colors={['#0a0000', '#1a0000', '#2d0000']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <YStack flex={1} paddingHorizontal="$5" paddingBottom="$8">

              {/* Brand */}
              <YStack alignItems="center" paddingTop="$10" paddingBottom="$8" gap="$3">

                <Text fontSize={34} fontWeight="900" color="#ffffff" letterSpacing={10}>
                  PROPIFY
                </Text>

                <XStack alignItems="center" gap="$3">
                  <YStack flex={1} height={1} backgroundColor="#ff1a1a33" maxWidth={50} />
                  <Text fontSize={10} color="#ff1a1a" letterSpacing={4} fontWeight="600">
                    STAY DISCIPLINED
                  </Text>
                  <YStack flex={1} height={1} backgroundColor="#ff1a1a33" maxWidth={50} />
                </XStack>
              </YStack>

              {/* Card */}
              <Card>
                {/* Red top bar */}
                <YStack height={3} backgroundColor="#ff1a1a" />

                {/* Tabs */}
                <YStack padding="$4" paddingBottom="$2">
                  <XStack
                    backgroundColor="#1a0000"
                    borderRadius="$4"
                    padding="$1"
                    borderWidth={1}
                    borderColor="#ff1a1a22"
                  >
                    <TabButton active={!isSignup} onPress={() => { setIsSignup(false); setError('') }}>
                      <Text fontSize={12} fontWeight="700" letterSpacing={2} color={!isSignup ? '#ffffff' : '#663333'}>
                        LOGIN
                      </Text>
                    </TabButton>
                    <TabButton active={isSignup} onPress={() => { setIsSignup(true); setError('') }}>
                      <Text fontSize={12} fontWeight="700" letterSpacing={2} color={isSignup ? '#ffffff' : '#663333'}>
                        SIGN UP
                      </Text>
                    </TabButton>
                  </XStack>
                </YStack>

                <Text color="#cc9999" fontSize={13} marginHorizontal="$4" marginBottom="$4" letterSpacing={1}>
                  {isSignup ? 'Create your account' : 'Welcome back'}
                </Text>

                {/* Email */}
                <YStack marginHorizontal="$4" marginBottom="$4" gap="$2">
                  <Text color="#ff4444" fontSize={10} fontWeight="700" letterSpacing={3}>EMAIL</Text>
                  <AppInput
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </YStack>

                {/* Password */}
                <YStack marginHorizontal="$4" marginBottom="$4" gap="$2">
                  <Text color="#ff4444" fontSize={10} fontWeight="700" letterSpacing={3}>PASSWORD</Text>
                  <AppInput
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </YStack>

                {/* Confirm Password */}
                {isSignup && (
                  <YStack marginHorizontal="$4" marginBottom="$4" gap="$2">
                    <Text color="#ff4444" fontSize={10} fontWeight="700" letterSpacing={3}>CONFIRM PASSWORD</Text>
                    <AppInput
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </YStack>
                )}

                {/* Error */}
                {error ? (
                  <YStack
                    marginHorizontal="$4"
                    marginBottom="$3"
                    padding="$3"
                    backgroundColor="#2a0000"
                    borderRadius="$3"
                    borderWidth={1}
                    borderColor="#ff1a1a44"
                  >
                    <Text color="#ff6666" fontSize={13}>⚠ {error}</Text>
                  </YStack>
                ) : null}

                {/* CTA Button */}
                <YStack marginHorizontal="$4" marginTop="$1">
                  <AppButton
                    title={loading ? 'PLEASE WAIT...' : isSignup ? 'CREATE ACCOUNT' : 'LOGIN →'}
                    onPress={handleAuth}
                    disabled={loading}
                  />
                </YStack>

                {/* Divider */}
                <XStack alignItems="center" marginHorizontal="$4" marginVertical="$5" gap="$3">
                  <YStack flex={1} height={1} backgroundColor="#330000" />
                  <Text color="#663333" fontSize={11} fontWeight="700" letterSpacing={2}>OR</Text>
                  <YStack flex={1} height={1} backgroundColor="#330000" />
                </XStack>

                {/* Google */}
                <YStack marginHorizontal="$4">
                  <GoogleButton>
                    <XStack alignItems="center" gap="$2">
                      <Text color="#ff4444" fontSize={18} fontWeight="900">G</Text>
                      <Text color="#cc8888" fontSize={14} fontWeight="600">Continue with Google</Text>
                    </XStack>
                  </GoogleButton>
                </YStack>

                {/* Footer */}
                <XStack justifyContent="center" alignItems="center" padding="$5" paddingTop="$4">
                  <Text color="#663333" fontSize={13}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                  </Text>
                  <Text
                    color="#ff4444"
                    fontSize={13}
                    fontWeight="700"
                    onPress={() => { setIsSignup(!isSignup); setError('') }}
                  >
                    {isSignup ? '  Login' : '  Sign Up'}
                  </Text>
                </XStack>
              </Card>

              {/* Quote */}
              <Text
                color="#4a1a1a"
                fontSize={11}
                textAlign="center"
                marginTop="$6"
                fontStyle="italic"
                letterSpacing={0.5}
              >
                "Discipline is the bridge between goals and accomplishment."
              </Text>

            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}