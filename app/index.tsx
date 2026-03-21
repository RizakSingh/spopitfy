import { TamaguiProvider, YStack, XStack, Text, ScrollView } from 'tamagui'
import config from '../tamagui.config'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      
      <ScrollView bg="#0f172a">
        
        <YStack p="$5" gap="$5">
          
          {/* Header */}
          <YStack gap="$3">
            <Text fontSize={26} fontWeight="700" color="white">
              Hey Rizak 👋
            </Text>
            <Text color="#94a3b8">
              Let’s build something amazing today
            </Text>
          </YStack>

          {/* Stats Cards */}
          <XStack gap="$4">
            
            <YStack
              f={1}
              bg="#1e293b"
              p="$4"
              br="$5"
            >
              <Text color="#94a3b8">Projects</Text>
              <Text fontSize={20} fontWeight="700" color="white">
                12
              </Text>
            </YStack>

            <YStack
              f={1}
              bg="#1e293b"
              p="$4"
              br="$5"
            >
              <Text color="#94a3b8">Tasks</Text>
              <Text fontSize={20} fontWeight="700" color="white">
                48
              </Text>
            </YStack>

          </XStack>

          {/* Main Card */}
          <YStack
            bg="#1e293b"
            p="$5"
            br="$6"
            gap="$3"
          >
            <Text fontSize={18} fontWeight="600" color="white">
              Continue Learning 🚀
            </Text>

            <Text color="#94a3b8">
              You are doing great. Keep pushing your limits and stay consistent.
            </Text>

            <YStack
              mt="$3"
              bg="#3b82f6"
              p="$3"
              br="$4"
              ai="center"
              pressStyle={{
                bg: '#2563eb',
                scale: 0.97
              }}
            >
              <Text color="white" fontWeight="600">
                Resume
              </Text>
            </YStack>
          </YStack>

          {/* List Section */}
          <YStack gap="$3">
            <Text fontSize={18} fontWeight="600" color="white">
              Recent Activity
            </Text>

            {[1, 2, 3, 4].map((item) => (
              <YStack
                key={item}
                bg="#1e293b"
                p="$4"
                br="$5"
              >
                <Text color="white">Task #{item}</Text>
                <Text color="#94a3b8" fontSize={12}>
                  Completed successfully
                </Text>
              </YStack>
            ))}
          </YStack>

        </YStack>

      </ScrollView>

    </TamaguiProvider>
  )
}