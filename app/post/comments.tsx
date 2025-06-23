import { db } from "@/firebase/firebaseConfig";
import { useAppSelector } from "@/redux/hooks";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CommentsScreen() {
  const { postId } = useLocalSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!postId) return;
    const commentsRef = collection(db, "posts", postId as string, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user?.uid) return;

    try {
      const commentsRef = collection(db, "posts", postId as string, "comments");
      await addDoc(commentsRef, {
        uid: user.uid,
        displayName: user.displayName || "Анонім",
        comment: newComment.trim(),
        createdAt: new Date(),
      });
      setNewComment("");
    } catch (err) {
      console.error("Помилка при додаванні коментаря:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{ title: "Коментарі" }} />
      <View style={styles.container}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentAuthor}>{item.displayName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            style={styles.input}
            placeholder="Залишити коментар..."
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Надіслати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  commentItem: {
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
  },
  commentAuthor: {
    fontWeight: "600",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
