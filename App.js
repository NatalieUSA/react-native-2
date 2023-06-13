import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

import { useRoute } from "./router";
// const AuthStack = createStackNavigator();
 
export default function App() {

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(true)

  return (
    <NavigationContainer style={styles.container}>
    {routing}
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // text: {
  //   fontFamily: "Roboto-Regular",
  //   color: "white",
  //   fontSize: 42,
  //   lineHeight: 84,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   backgroundColor: "#000000c0",
  // },
});
