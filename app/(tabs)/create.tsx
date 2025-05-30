import { StyleSheet, Text, View } from "react-native";

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb6565",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
});
