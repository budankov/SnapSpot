import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Icons
import { EvilIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const photoUris = useSelector((state: RootState) => state.photo.photoUris);
  const router = useRouter();

  console.log("Публікація фото:", photoUris);

  return (
    <View style={styles.bgContainer}>
      <View style={styles.container}>
        <FlatList
          data={photoUris}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
              <View>
                <Text style={styles.title}>Текст під фото</Text>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={() => router.push("/post/comments")}
                  >
                    <EvilIcons name="comment" size={24} color="black" />
                    <Text style={styles.title}>159</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push("/post/comments")}
                  >
                    <EvilIcons name="like" size={24} color="black" />
                    <Text style={styles.title}>400</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => router.push("/post/map")}>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text style={styles.title}>Київ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  container: {
    marginHorizontal: 16,
  },
  imageContainer: {
    marginBottom: 37,
  },
  image: {
    height: 200,
    marginBottom: 8,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "yellow",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
});
