import { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import bgimage from "../../../images/BG/bg.jpg";
import { useOrientation } from "../../../hooks/useOrientation";
import { ButtonApp } from "../../../components/ButtonApp/ButtonApp";

import { useDispatch } from "react-redux";
import { authLogin } from "../../../../redux/auth/authOperations";

initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  // console.log("navigation", navigation);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const orientation = useOrientation();

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
     dispatch(authLogin(state));
    const { email, password } = state;

    if (email === "" || password === "") {
      Alert.alert("email & password - is require");
      return;
    }
   
    setState(initialState);
    //Alert.alert("Congrats Login successful");
  };


  
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        style={{
          ...styles.imageBcg,
          marginBottom: isShowKeyboard ? -250 : 0,
        }}
        source={bgimage}
      >
        <View
          style={{
            ...styles.loginWrap,
            marginBottom: isShowKeyboard ? 80 : 0,
            height: orientation === "landscape" ? "100%" : "60%",
            marginHorizontal: orientation === "landscape" ? 150 : 0,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginHorizontal: orientation === "landscape" ? 100 : 16,
              }}
            >
              <Text
                style={{
                  ...styles.pageHeaderTitle,
                  marginVertical: orientation === "landscape" ? 16 : 32,
                }}
              >
                Увійти
              </Text>

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
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Адреса електронної пошти"
              ></TextInput>

              <View style={styles.passwordWrap}>
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
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Пароль"
                ></TextInput>
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
            <View
              style={{
                marginHorizontal: orientation === "landscape" ? 100 : 16,
                marginTop: orientation === "landscape" ? 50 : 27,
              }}
            >
              <ButtonApp btnText={"Увійти"} onPress={onSubmit} />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.linkWrap}>
            <Text style={{ ...styles.link }}>
              Немає акаунту?{" "}
              <TouchableOpacity>
                <Text
                  style={{ ...styles.link, textDecorationLine: "underline" }}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBcg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginWrap: {
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  input: {
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
    position: "absolute",
    right: 15,
    top: 15,
  },
  btnHidePassword: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  linkWrap: {
    flex: 1,
    marginTop: 16,
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center"
    // alignSelf: "center"
    

  },
  link: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center"
  },
});
