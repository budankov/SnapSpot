import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseTotalLike,
  increaseTotalLikeByAmount,
} from "../../redux/actions/dataActions";

export default function HomeScreen() {
  const totalLikes = useSelector((state) => state.totalLikes);
  const userName = useSelector((state) => state.userName);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text>Total likes: {totalLikes}</Text>
      <Text>User Name: {userName}</Text>
      <Button title="+" onPress={() => dispatch(increaseTotalLike())} />
      <Button
        title="increase likes by amount"
        onPress={() => dispatch(increaseTotalLikeByAmount(20))}
      />
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
