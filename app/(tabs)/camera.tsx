import { YStack, Text, Button } from "tamagui";

export default function CameraScreen() {
  return (
    <YStack
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Camera 📷
      </Text>

      <Button
        style={{ marginTop: 20 }}
        onPress={() => alert("Camera coming soon")}
      >
        <Text>Open Camera</Text>
      </Button>
    </YStack>
  );
}