import { useEffect, useState } from 'react'
import { YStack, Text, Image, ScrollView } from 'tamagui'
import { auth } from '../../src/services/firebase'
import { getUserPosts, getUserData } from '../../src/services/firestore'

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([])
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser
      if (!user) return

      // 🔥 streak
      const userData = await getUserData(user.uid)
      setStreak(userData?.streak || 0)

      // 📸 posts
      const userPosts = await getUserPosts(user.uid)
      setPosts(userPosts)
    }

    loadData()
  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <YStack padding="$4">

        {/* 🔥 Streak */}
        <Text
          fontSize="$8"
          color="#ff1a1a"
          fontWeight="bold"
          textAlign="center"
        >
          🔥 {streak}
        </Text>

        <Text textAlign="center" color="#aaa" marginBottom="$4">
          Day Streak
        </Text>

        {/* 📸 Feed */}
        <YStack gap="$3">
          {posts.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.imageUrl }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#ff1a1a33',
              }}
            />
          ))}
        </YStack>

      </YStack>
    </ScrollView>
  )
}