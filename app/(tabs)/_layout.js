import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" translucent={false} />
      <Tabs
        screenOptions={{
          animation: "none",
          // headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: () => (
              <FontAwesome name="home" size={28} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: () => (
              <FontAwesome name="plus-square-o" size={28} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => (
              <FontAwesome name="user-o" size={28} color="black" />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
