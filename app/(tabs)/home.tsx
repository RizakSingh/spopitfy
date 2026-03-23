import { YStack, Text, Button } from "tamagui";

export default function Home() {
  return (
    <YStack
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        Home 🚀
      </Text>

      <Text style={{ marginTop: 10, color: "#666" }}>
        Welcome to your app
      </Text>

      <Button
        style={{ marginTop: 20 }}
        onPress={() => alert("Working 🔥")}
      >
      <Text>  Test Button</Text>
      </Button>
    </YStack>
  );
}