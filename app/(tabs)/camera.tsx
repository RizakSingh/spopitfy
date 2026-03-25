import { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { YStack, Text, styled } from 'tamagui'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const CaptureButton = styled(YStack, {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#ff1a1a',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 4,
  borderColor: '#ffffff33',
  pressStyle: {
    scale: 0.95,
    backgroundColor: '#cc0000',
  },
})

const PermissionScreen = styled(YStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#0a0000',
  gap: '$4',
})

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<any>(null)

useEffect(() => {
  if (permission && !permission.granted) {
    requestPermission()
  }
}, [permission])

  if (!permission) {
    return (
      <PermissionScreen>
        <Text color="#ff4444" fontSize={16} letterSpacing={2}>
          REQUESTING PERMISSION...
        </Text>
      </PermissionScreen>
    )
  }

  if (!permission.granted) {
    return (
      <PermissionScreen>
        <Text color="#ff4444" fontSize={16} fontWeight="700" letterSpacing={2}>
          CAMERA ACCESS DENIED
        </Text>
        <Text color="#663333" fontSize={13} textAlign="center" paddingHorizontal="$6">
          Please enable camera permission from settings
        </Text>
        <CaptureButton onPress={requestPermission}>
          <Text color="#ffffff" fontSize={11} fontWeight="700" letterSpacing={1}>
            RETRY
          </Text>
        </CaptureButton>
      </PermissionScreen>
    )
  }

  const takePicture = async () => {
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    router.push({
      pathname: '/(tabs)/preview',
      params: { uri: photo.uri },
    })
  }

  return (
    <YStack flex={1} backgroundColor="#000000">
      <SafeAreaView style={{ flex: 1 }}>

        {/* Top Bar */}
        <YStack
          paddingHorizontal="$5"
          paddingVertical="$3"
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={10}
        >
        </YStack>

        {/* Camera */}
        <CameraView ref={cameraRef} style={{ flex: 1 }} />

        {/* Red gradient overlay at bottom */}
        <LinearGradient
          colors={['transparent', '#0a000099', '#0a0000']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        />

        {/* Capture Button */}
        <YStack
          position="absolute"
          bottom={60}
          left={0}
          right={0}
          alignItems="center"
          gap="$3"
        >
          <CaptureButton onPress={takePicture}>
            <YStack
              width={30}
              height={30}
              borderRadius={15}
              backgroundColor="#ffffff"
            />
          </CaptureButton>
          <Text color="#ffffff99" fontSize={11} letterSpacing={3}>
            TAP TO CAPTURE
          </Text>
        </YStack>

      </SafeAreaView>
    </YStack>
  )
}