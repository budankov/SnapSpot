import { db } from "@/firebase/firebaseConfig";
import { useAppSelector } from "@/redux/hooks";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageHeight = (screenWidth * 5) / 4;

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc")); // можна додати сортування

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (postId: string, hasLiked: boolean) => {
    if (!user?.uid) return;

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      // Миттєве оновлення локального стану
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const updatedLikes = hasLiked
              ? post.likes.filter((id: string) => id !== user.uid)
              : [...(post.likes || []), user.uid];

            return { ...post, likes: updatedLikes };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Помилка при оновленні лайка:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paddingContainer}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const likes = item.likes || [];
            const hasLiked = likes.includes(user?.uid);

            return (
              <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.photoURL }} style={styles.image} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
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
                      <Text style={styles.iconTitle}>
                        {item.commentsCount ?? 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => toggleLike(item.id, hasLiked)}
                    >
                      <EvilIcons
                        style={[styles.icon, { marginLeft: 20 }]}
                        name="like"
                        size={24}
                        color={hasLiked ? "#FF6C00" : "black"}
                      />
                      <Text style={styles.iconTitle}>{likes.length}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() =>
                        router.push({
                          pathname: "/post/map",
                          params: {
                            lat: item.location?.coords?.latitude,
                            lng: item.location?.coords?.longitude,
                          },
                        })
                      }
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
                        style={styles.iconTitleLocation}
                      >
                        {item.location?.name || "Невідома локація"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paddingContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imageContainer: {
    marginBottom: 32,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: imageHeight,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  iconTitle: {
    fontSize: 14,
  },
  iconTitleLocation: {
    fontSize: 14,
    textDecorationLine: "underline",
    maxWidth: 150,
  },
});
