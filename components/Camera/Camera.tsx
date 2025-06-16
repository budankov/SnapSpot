import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Camera } from "expo-camera/next";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
};

export default function CameraComponent({
  onPhotoTaken,
}: Omit<Props, "onClose">) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const router = useRouter();

  const handleClose = () => {
    router.replace("/(tabs)/home");
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Нам потрібен ваш дозвіл, щоб показати камеру.
        </Text>
        <Button onPress={requestPermission} title="Надати дозвіл" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPhotoTaken(photo.uri);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonTopContainer}>
          <TouchableOpacity onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBottomContainer}>
          <TouchableOpacity style={styles.buttonSnap} onPress={takePhoto}>
            <Entypo name="circle" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBottomContainer: {
    alignItems: "center",
  },
  buttonSnap: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
