import { useLocalSearchParams, router } from 'expo-router'
import { Image } from 'react-native'
import { YStack, Button ,Text} from 'tamagui'
import { uploadImage } from '../../src/services/storage'
import { createPost } from '../../src/services/firestore'
import { auth } from '../../src/services/auth'
import { useState } from 'react'

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    try {
      setLoading(true)

      const user = auth.currentUser
      if (!user) return

      // 1. Upload image
      const imageUrl = await uploadImage(uri as string, user.uid)

      // 2. Save post
      await createPost(user.uid, imageUrl)

      router.replace('/(tabs)/home')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1}>
      <Image
        source={{ uri: uri as string }}
        style={{ flex: 1 }}
      />

      <Button
        onPress={handleUpload}
        style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          backgroundColor: '#ff1a1a',
        }}
      >
        {loading ? <Text> Uploading...</Text> : <Text>Upload Proof</Text>}
      </Button>
    </YStack>
  )
}