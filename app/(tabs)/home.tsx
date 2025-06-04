import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase/firebaseConfig";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("🚪 User signed out");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вийти</Text>
      <Button title="+" onPress={() => handleLogout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#cb6565",
  },
  text: {
    fontSize: 20,
    color: "#000000",
  },
});
