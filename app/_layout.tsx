import { Stack } from "expo-router";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";

import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Назад" }}
        />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
      <FlashMessage position="top" />
    </Provider>
  );
}
