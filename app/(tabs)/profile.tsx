import { db } from "@/firebase/firebaseConfig";
import { useAppSelector } from "@/redux/hooks";
import { useFocusEffect } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3 - 4;

export default function ProfileScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useAppSelector((state) => state.auth);

  useFocusEffect(
    useCallback(() => {
      const fetchUserPosts = async () => {
        if (!user?.uid) return;

        try {
          const q = query(
            collection(db, "posts"),
            where("uid", "==", user.uid)
          );
          const snapshot = await getDocs(q);

          const userPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(userPosts);
        } catch (error) {
          console.error("Помилка при отриманні постів користувача:", error);
        }
      };

      fetchUserPosts();
    }, [user?.uid])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Image source={{ uri: item.photoURL }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  grid: {
    padding: 2,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 4,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});
