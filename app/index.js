import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks.tsx";
import { listenToAuthChanges } from "../redux/reducers/authSlice";

export default function Index() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Redirect href={user ? "/(tabs)/home" : "/auth/login"} />;
}
