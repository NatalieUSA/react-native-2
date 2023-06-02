import { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import bgimage from "../../images/BG/bg.jpg";

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={bgimage}>
        {/* <View style={styles.bcg}> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.registerWrap}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageHeaderTitle}>Увійти</Text>
            </View>

            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 27 : 16,
              }}
            >
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Адреса електронної пошти"
              ></TextInput>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                secureTextEntry={true}
                placeholder="Пароль"
              >
                <Text style={{ color: "black" }}>Показати</Text>
              </TextInput>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.wrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            color={"#FFFFFF"}
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
        </View>
        {/* </View> */}
      </ImageBackground>
    </View>
    // </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // position: "relative",
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  bcg: {
    // backgroundColor: "#FFFFFF",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
  },
  registerWrap: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  wrap: { backgroundColor: "#FFFFFF" },
  form: {
    marginHorizontal: 16,
  },
  pageHeader: {
    marginVertical: 32,
    // marginBottom: 32,
    // marginTop: 92,
    alignItems: "center",
  },
  pageHeaderTitle: {
    fontWeight: 500,
    fontSize: 30,
    // textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: "#212121",
    marginBottom: 16,
  },
  btn: {
    marginHorizontal: 16,
    height: 50,
    borderRadius: 100,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: 16,
  },
  link: {
    fontWeight: 500,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 144,
    color: "#1B4371",
  },
});
