import { useCallback, useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { RegistrationScreen } from "./src/screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen/LoginScreen";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* <RegistrationScreen /> */}
        <LoginScreen />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "relative",
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
// import React from "react";

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, ImageBackground } from "react-native";
// import background from "./src/images/BG/bg.jpg";
// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <RegistrationScreen /> */}
//       <Text>Open up App.js to start working on your app!</Text>
//       {/* <LoginScreen /> */}
//       {/* <ImageBackground
//         style={styles.image}
//         source={require("./src/images/BG/bg.jpg")}
//       ></ImageBackground> */}
//       {/* <ImageBackground style={styles.image} source={background} /> */}
//     </View>
//     // <View style={styles.container}>
//     //   {/* <Text>Open up App.js to start working on your app!</Text>
//     //   <StatusBar style="auto" /> */}
//     //   <RegistrationScreen />
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#fff",
//     // backgroundColor: "deeppink",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   // image: {
//   //   flex: 1,
//   //   resizeMode: "cover",
//   //   justifyContent: "center",
//   // },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });
////////////////////////////////*********************************** */
// import React from "react";
// import { ImageBackground, StyleSheet, Text, View } from "react-native";

// import background from "./src/images/BG/bg.jpg";
// const App = () => (
//   <View style={styles.container}>
//     {/* <ImageBackground
//       source={require("./src/images/BG/bg.jpg")}
//       resizeMode="cover"
//       style={styles.image}
//     ></ImageBackground> */}
//     {/* <RegistrationScreen /> */}
//     <ImageBackground style={styles.image} source={background} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     lineHeight: 84,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000c0",
//   },
// });

// export default App;
