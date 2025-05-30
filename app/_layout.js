import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import AuthLayout from "../components/AuthLayout";

export default function RootLayout() {
  return (
    <AuthLayout>
      <StatusBar style="dark" translucent={false} />
      <Stack
        screenOptions={{
          animation: "none",
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registration" />
      </Stack>
    </AuthLayout>
  );
}
