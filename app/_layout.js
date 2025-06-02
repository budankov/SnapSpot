import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import AuthLayout from "../components/AuthLayout";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
