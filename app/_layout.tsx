import { Slot } from "expo-router";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";

import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
      <FlashMessage position="top" />
    </Provider>
  );
}
