import { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import bgimage from "../../images/BG/bg.jpg";
import { Avatar } from "../../components/Avatar/Avatar";
import { ButtonApp } from "../../components/ButtonApp/ButtonApp";

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground style={styles.imageBcg} source={bgimage}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.registerWrap}>
              <View style={styles.avatarWrap}>
                <Avatar></Avatar>
              </View>

              <Text style={styles.pageHeaderTitle}>Реєстрація</Text>

              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 16 : 27,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    activeInput === "login" && styles.inputActive,
                  ]}
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#FF6C00"
                  setIsShowKeyboard={setIsShowKeyboard}
                  onFocus={() => {
                    handleInputFocus("login");
                  }}
                  onBlur={handleInputBlur}
                  placeholder="Логін"
                ></TextInput>
                <TextInput
                  style={[
                    styles.input,
                    activeInput === "email" && styles.inputActive,
                  ]}
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#FF6C00"
                  setIsShowKeyboard={setIsShowKeyboard}
                  onFocus={() => {
                    handleInputFocus("email");
                  }}
                  onBlur={handleInputBlur}
                  placeholder="Адреса електронної пошти"
                />
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      activeInput === "password" && styles.inputActive,
                    ]}
                    cursorColor="#FF6C00"
                    placeholderTextColor="#BDBDBD"
                    setIsShowKeyboard={setIsShowKeyboard}
                    onFocus={() => {
                      handleInputFocus("password");
                    }}
                    onBlur={handleInputBlur}
                    secureTextEntry={!isShowPassword}
                    placeholder="Пароль"
                  />
                  <TouchableOpacity
                    style={styles.btnShowPassword}
                    onPress={() => setIsShowPassword(!isShowPassword)}
                  >
                    <Text style={styles.btnHidePassword}>
                      {isShowPassword ? "Приховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.btnWrap}>
            <ButtonApp
              btnText={"Зареєстуватися"}
              style={{ width: dimensions }}
            />

            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  imageBcg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatarWrap: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  registerWrap: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  pageHeaderTitle: {
    marginTop: -30,
    marginVertical: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.72,
  },

  input: {
    // height: 50,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputActive: { borderColor: "#FF6C00" },
  btnShowPassword: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    right: 15,
    top: 15,
  },
  btnHidePassword: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btnWrap: { backgroundColor: "#FFFFFF", paddingHorizontal: 16 },
  linkWrap: { flex: 1, marginTop: 16, marginBottom: 78 },
  link: {
    marginTop: 16,
    marginBottom: 78,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
