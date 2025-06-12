import CameraComponent from "@/components/Camera/Camera";
import { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

export default function CreateScreen() {
  const [cameraOpen, setCameraOpen] = useState(true);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handlePhotoTaken = (uri: string) => {
    setPhotoUri(uri);
    setCameraOpen(false);
  };

  const handlePublish = () => {
    if (!photoUri) return;
    console.log("Публікація фото:", photoUri);
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
      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
      <Button title="Зробити нове фото" onPress={() => setCameraOpen(true)} />
      <Button title="Опублікувати" onPress={handlePublish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
});
