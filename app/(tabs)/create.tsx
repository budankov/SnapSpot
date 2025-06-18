import CameraComponent from "@/components/Camera/Camera";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPhotoUri } from "@/redux/reducers/photoSlice";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CreateScreen() {
  const [cameraOpen, setCameraOpen] = useState(true);
  const photoUris = useAppSelector((state) => state.photo.photoUris);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getLocationName = async (latitude: number, longitude: number) => {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (addresses.length > 0) {
      const { city, region, country } = addresses[0];
      return `${city}, ${region}, ${country}`;
    }
    return "Невідоме місце";
  };

  const handlePhotoTaken = (uri: string) => {
    dispatch(addPhotoUri(uri));
    setCameraOpen(false);
  };

  const handlePublish = () => {
    if (!photoUris) return;
    setCameraOpen(true);
    router.replace("/(tabs)/home");
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
      <View style={styles.previewContainer}>
        {photoUris.length > 0 && (
          <Image
            resizeMode="cover"
            source={{ uri: photoUris[photoUris.length - 1] }}
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
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.8}
          onPress={handlePublish}
        >
          <Text style={styles.submitBtnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  previewContainer: {
    height: "50%",
    position: "relative",
  },
  submitContainer: {
    height: "50%",
  },
  preview: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
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
});
