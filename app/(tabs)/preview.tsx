import { useLocalSearchParams, router } from 'expo-router'
import { Image } from 'react-native'
import { YStack, Text } from 'tamagui'
import { useState } from 'react'
import AppButton from '../../src/components/AppButton'

import { uploadImage } from '../../src/services/storage'
import { createPost, updateStreak } from '../../src/services/firestore'
import { auth } from '../../src/services/firebase'

export default function PreviewScreen() {
const params = useLocalSearchParams()
const uri = typeof params.uri === 'string' ? params.uri : ''
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    try {
      setLoading(true)
      setError('')
      console.log("🚀 Upload started")

      const user = auth.currentUser
      if (!user) {
        setError('User not logged in')
        return
      }

      console.log("👤 User:", user.uid)

      // 1. Upload image
      const imageUrl = await uploadImage(uri as string, user.uid)
      console.log("✅ Image uploaded:", imageUrl)

      // 2. Save post
      await createPost(user.uid, imageUrl)
      console.log("✅ Post saved")

      // 3. Update streak
      await updateStreak(user.uid)
      console.log("🔥 Streak updated")

      router.replace('/(tabs)/home')

    } catch (err: any) {
      console.log("❌ ERROR:", err)
      setError('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} backgroundColor="#000">

      {/* 🖼️ Image Preview */}
      <Image
        source={{ uri: uri as string }}
        style={{ flex: 1 }}
      />

      {/* ❌ Error */}
      {error ? (
        <Text color="red" textAlign="center" marginTop="$2">
          {error}
        </Text>
      ) : null}

      {/* 🚀 Upload Button */}
      <YStack position="absolute" bottom={40} width="100%" padding="$4">
        <AppButton
          title={loading ? 'UPLOADING...' : 'UPLOAD PROOF'}
          onPress={handleUpload}
          disabled={loading}
        />
      </YStack>

    </YStack>
  )
}