import { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { YStack, Button, Text } from 'tamagui'
import { router } from 'expo-router'

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
  }, [])

  if (!permission) {
    return <Text>Requesting permission...</Text>
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>
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
    <YStack flex={1}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
      />

      <Button
        onPress={takePicture}
        style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          backgroundColor: '#ff1a1a',
          borderRadius: 50,
        }}
      >
       <Text> Capture</Text>
      </Button>
    </YStack>
  )
}