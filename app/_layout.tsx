import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";;
import { useEffect } from 'react'
import { Camera } from 'expo-camera'
export default function RootLayout() {
  useEffect(() => {
  (async () => {
    await Camera.requestCameraPermissionsAsync()
  })()
}, [])
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  );
}