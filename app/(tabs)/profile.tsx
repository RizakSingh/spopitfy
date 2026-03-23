import { YStack, Text, Button } from "tamagui";
import { router } from "expo-router";

export default function Profile() {
  return (
    <YStack
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "700" }}>
        Profile 👤
      </Text>

      <Button
        style={{ marginTop: 20 }}
        onPress={() => router.replace("/login")}
      >
        <Text>Logout</Text>
      </Button>
    </YStack>
  );
}