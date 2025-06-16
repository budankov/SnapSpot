import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function HomeScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const photoUris = useSelector((state: RootState) => state.photo.photoUris);
  console.log("Публікація фото:", photoUris);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вийти</Text>
      {user && <Text style={styles.text}>Привіт, {user.displayName}!</Text>}
      {photoUris && (
        <FlatList
          data={photoUris}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.preview} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  preview: {
    width: "100%",
    height: 240,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
