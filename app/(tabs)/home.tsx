import { useRouter } from "expo-router";
import {
  Dimensions,
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

const screenWidth = Dimensions.get("window").width;
const imageHeight = (screenWidth * 5) / 4;

export default function HomeScreen() {
  const photoUris = useSelector((state: RootState) => state.photo.photoUris);
  const router = useRouter();

  console.log("Публікація фото:", photoUris);

  return (
    <View style={styles.container}>
      <View style={styles.paddingContainer}>
        <FlatList
          data={photoUris}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
              <View>
                <Text style={styles.title}>Текст під фото</Text>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/post/comments")}
                  >
                    <EvilIcons
                      style={styles.icon}
                      name="comment"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconTitle}>159</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/post/comments")}
                  >
                    <EvilIcons
                      style={[styles.icon, { marginLeft: 20 }]}
                      name="like"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconTitle}>400</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/post/map")}
                  >
                    <EvilIcons
                      style={styles.icon}
                      name="location"
                      size={24}
                      color="black"
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.iconTitle,
                        { textDecorationLine: "underline", maxWidth: 150 },
                      ]}
                    >
                      Київ
                    </Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  paddingContainer: {
    marginHorizontal: 16,
  },
  imageContainer: {
    marginBottom: 37,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  image: {
    width: screenWidth,
    height: imageHeight,
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
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  icon: {
    marginRight: 2,
    // backgroundColor: "red",
  },
  iconTitle: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
  },
});
