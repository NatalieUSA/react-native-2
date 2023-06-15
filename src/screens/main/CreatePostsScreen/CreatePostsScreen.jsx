import React, { useState, useEffect, useRef } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useOrientation } from "../../../hooks/useOrientation";
import { ButtonApp } from "../../../components/ButtonApp/ButtonApp";

initialState = {
  title: "",
  place: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  // const [isCameraActive, setIsCameraActive] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [activeInput, setActiveInput] = useState(null);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("Camera status === granted", status);
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location status === granted?", status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  // const orientation = useOrientation();
  const takePhoto = async () => {
    // if (camera) {
    const photo = await camera.takePictureAsync();
    // await MediaLibrary.createAssetAsync(photo.uri);

    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    console.log("LOCATION", coords);
    setLocation(coords);

    //   console.log("PHOTO==============>", photo);
    // console.log("PHOTO======.uri========>", photo.uri);

    // setIsCameraActive(false);
  };

  const onSubmitPost = () => {
    console.log("NAVIGATION", navigation);
    const { title, place } = state;
    if (!photo) {
      Alert.alert("Add photo, pls");
      return;
    }
    if (!title || !place) {
      Alert.alert("title or place - is empty");
      return;
    }

    navigation.navigate("Публікації", { photo, location, title, place });
    onDelitePost();
  };

  const onDelitePost = () => {
    setState(initialState);
    setPhoto("");
  };

  const onChangeInputText = (value, name) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.container, position: "relative" }}>
        <Camera style={styles.camera} type={type} ref={setCamera}>
          <View style={styles.takePhotoWrap}>
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  // style={{ ...styles.cameraBtn }}
                  style={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: 45,
                    backgroundColor: "#fff",

                    marginTop: "23%",
                    marginLeft: "43%",
                  }}
                  onPress={takePhoto}
                >
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: "9%",
                    marginLeft: "85%",
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-flip"
                    size={45}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Camera>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.cameraTitle,
            }}
            onPress={() => setPhoto("")}
          >
            {!photo ? "Завантажте фото" : "Редагувати фото"}
          </Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <TextInput
                style={[
                  styles.input,
                  activeInput === "name" && styles.inputActive,
                ]}
                placeholderTextColor="#BDBDBD"
                cursorColor="#FF6C00"
                setIsShowKeyboard={setIsShowKeyboard}
                onFocus={() => {
                  handleInputFocus("name");
                }}
                onBlur={handleInputBlur}
                value={state.title}
                onChangeText={(value) => onChangeInputText(value, "title")}
                placeholder="Назва..."
              />
              <View>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputLocation,
                    activeInput === "location" && styles.inputActive,
                  ]}
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#FF6C00"
                  setIsShowKeyboard={setIsShowKeyboard}
                  onFocus={() => {
                    handleInputFocus("location");
                  }}
                  onBlur={handleInputBlur}
                  value={state.place}
                  onChangeText={(value) => onChangeInputText(value, "place")}
                  placeholder="Місцевість..."
                />
                <Feather
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 15,
                  }}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
            </View>
            <ButtonApp
              style={{ backgroundColor: "black" }}
              btnText={"Опубліковати"}
              onPress={onSubmitPost}
            />
          </View>
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <TouchableOpacity style={styles.trashIcon} onPress={onDelitePost}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    height: 240,
    // marginVertical: 32,
    marginTop: 5,
    marginBottom: 8,
    // marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  cameraBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: "#fff",
  },
  form: {
    // paddingHorizontal: 16
  },
  inputWrap: { marginVertical: 32 },
  input: {
    marginBottom: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderRightColor: "#FFFFFF",
    borderStartColor: "#FFFFFF",
    borderTopColor: "#FFFFFF",
    borderBottomColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputLocation: {
    paddingLeft: 28,
    marginBottom: 0,
  },
  inputActive: { borderBottomColor: "#FF6C00" },
  trashIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  takePhotoWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
});
