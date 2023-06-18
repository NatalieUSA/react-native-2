 import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import bgimage from "../../../images/BG/bg.jpg"
import { Avatar } from "../../../components/Avatar/Avatar";

import { authLogout } from "../../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export const ProfileScreen = () => {

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(authLogout())
  }
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBcg} source={bgimage}>
        <View style={styles.profileWrap}>
          <View style={styles.avatarWrap}>
            <Avatar />
          </View>
          <TouchableOpacity
            // onPress={()=>{dispatch(authLogout())}}
             onPress={onLogOut}
          >
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.btnLogOut}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>User Name</Text>

          <View
            style={{
              height: 250,
              backgroundColor: "#FF6C00",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 100,
              borderRadius: 25,
              paddingHorizontal: 50,
            }}
          >
            <Text>There are no posts yet ¯\_(ツ)_/¯</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
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
  profileWrap: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
      alignItems: "center",
    paddingRight: 16,
    paddingLeft: 16,
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

  btnLogOut: {
    position: "absolute",
    bottom: 75,
    right: -200,
  },
  userName: {
    marginTop: -30,
    marginVertical: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.72,
  },
});
