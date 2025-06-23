import CameraComponent from "@/components/Camera/Camera";
import { useAppSelector } from "@/redux/hooks";
import * as Location from "expo-location";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Icons
import { db } from "@/firebase/firebaseConfig";
import { RootState } from "@/redux/store";
import { EvilIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CreateScreen() {
  const [cameraOpen, setCameraOpen] = useState(true);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { user } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setCameraOpen(true);
      return () => {
        setCameraOpen(false);
        setName("");
        setLocationValue("");
        setCoords(null);
        setPhotoUri(null);
      };
    }, [])
  );

  const getLocationName = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationValue("Доступ до геолокації заборонено");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCoords({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const addresses = await Location.reverseGeocodeAsync(location.coords);

    if (addresses.length > 0) {
      const { street, name, city, country } = addresses[0];

      const fullAddress = [country, city, street || name]
        .filter(Boolean)
        .join(", ");

      setLocationValue(fullAddress);
    } else {
      setLocationValue("Невідоме місце");
    }
  };

  const handlePhotoTaken = (uri: string) => {
    setPhotoUri(uri);
    setCameraOpen(false);
  };

  const uploadPostToServer = async () => {
    try {
      const title = name;

      if (!user?.uid || !photoUri || !coords) return;

      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        photoURL: photoUri,
        title,
        location: {
          name: locationValue,
          coords,
        },
        createdAt: serverTimestamp(),
        commentsCount: 0,
        likes: [],
      });

      setPhotoUri(null);
      setName("");
      setLocationValue("");
      setCoords(null);
      setCameraOpen(true);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("Помилка при завантаженні поста:", err);
    }
  };

  const handlePublish = () => {
    if (!photoUri || !name || !coords) return;
    uploadPostToServer();
  };

  if (cameraOpen) {
    return (
      <CameraComponent
        onPhotoTaken={handlePhotoTaken}
        onClose={() => setCameraOpen(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.previewContainer}>
          {photoUri && (
            <Image
              resizeMode="cover"
              source={{ uri: photoUri }}
              style={styles.preview}
            />
          )}
          <TouchableOpacity
            style={styles.deletePhoto}
            onPress={() => setCameraOpen(true)}
          >
            <AntDesign name="delete" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#BDBDBD"
                placeholder="Назва..."
                onChangeText={setName}
                value={name}
              />
              <EvilIcons
                name="pencil"
                size={28}
                style={[styles.inputIcon, { color: name ? "#000" : "#BDBDBD" }]}
              />
            </View>
            <TouchableOpacity
              style={styles.locationSelector}
              onPress={getLocationName}
            >
              <EvilIcons
                name="location"
                size={28}
                color={locationValue ? "#000" : "#BDBDBD"}
              />
              <Text
                style={[
                  styles.locationText,
                  { color: locationValue ? "#000" : "#BDBDBD" },
                ]}
              >
                {locationValue ? locationValue : "Додати розташування"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.8}
              onPress={handlePublish}
            >
              <Text style={styles.submitBtnText}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  previewContainer: {
    height: "60%",
    marginHorizontal: 20,
    marginBottom: 20,

    position: "relative",
  },
  submitContainer: {
    marginHorizontal: 20,
    height: "40%",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  deletePhoto: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  submitBtnText: {
    color: "#FFF",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  formWrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    color: "#000000",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
  },
  inputIcon: {
    position: "absolute",
    left: 0,
    top: 11,
  },

  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#BDBDBD",
  },

  locationIcon: {
    position: "absolute",
    top: 13,
    color: "#BDBDBD",
  },
});
