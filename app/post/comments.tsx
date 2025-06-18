import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={{ flex: 1, padding: 100 }}>
      <Stack.Screen options={{ title: "Коментарі" }} />
      <Text>Список коментарів тут</Text>
    </View>
  );
}
