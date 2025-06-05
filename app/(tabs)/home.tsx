import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/authSlice";
import { RootState } from "../../redux/store";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // unwrap щоб чекати завершення thunk
      console.log("🚪 User signed out");
      router.replace("../auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вийти</Text>
      <Text style={styles.text}>Привіт, {user.displayName}!</Text>
      <Button title="Вийти" onPress={handleLogout} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, color: "#000" },
});
