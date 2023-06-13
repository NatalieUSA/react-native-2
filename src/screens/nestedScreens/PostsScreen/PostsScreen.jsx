import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export const PostsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.pageHeaderTitle}>PostsScreen</Text>
        <Button title="map" onPress={() => navigation.navigate("Map")} />
        <Button
          title="comments"
          onPress={() => navigation.navigate("Comments")}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },
  pageHeaderTitle: {
    marginVertical: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.72,
  },
});
  