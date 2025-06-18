import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Місце на карті" }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.4501,
          longitude: 30.5234,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 50.4501, longitude: 30.5234 }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
