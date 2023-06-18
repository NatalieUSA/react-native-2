import "react-native-gesture-handler";
import { useCallback } from "react";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";;
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Main } from "./src/screens/main/Main";



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

  // const routing = useRoute(false)

  return (
    <Provider store={store}>
      <Main />
      {/* <NavigationContainer style={styles.container}>
        {routing}
      </NavigationContainer> */}
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

// });
