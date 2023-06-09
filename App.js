import { useCallback, } from "react";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
} from "react-native";

import { LoginScreen } from "./src/screens/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./src/screens/RegistrationScreen/RegistrationScreen";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  text: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
