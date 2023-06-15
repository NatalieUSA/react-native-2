//API key created
//Use this key in your application by passing it with the key = API_KEY parameter.
  //AIzaSyAo3aIaxLDO - MEs38yYdcRM - 4WbQDmTTAE

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";

export const MapScreen = ({ route }) => {
  // console.log(
  //   "MAP+++++++++>>>>route.params.location",
  //   route.params.location.latitude
  // );

  const { latitude, longitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude,
            longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  mapStyle: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: "100%",
    height: "100%"
  },
});
