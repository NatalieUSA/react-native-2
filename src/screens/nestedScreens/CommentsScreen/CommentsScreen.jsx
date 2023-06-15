import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const CommentsScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.pageHeaderTitle}>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
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
