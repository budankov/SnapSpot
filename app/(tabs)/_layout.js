import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" translucent={false} />
      <Tabs
        screenOptions={{
          animation: "none",
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Головна" }} />
        <Tabs.Screen name="create" options={{ title: "Створити пост" }} />
        <Tabs.Screen name="profile" options={{ title: "Профіль" }} />
      </Tabs>
    </>
  );
}
