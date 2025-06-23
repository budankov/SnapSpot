import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const params = useLocalSearchParams();
  const lat = Number(params.lat);
  const lng = Number(params.lng);

  if (isNaN(lat) || isNaN(lng)) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Помилка карти" }} />
        <Text>Невірні координати</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Місце на карті" }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
