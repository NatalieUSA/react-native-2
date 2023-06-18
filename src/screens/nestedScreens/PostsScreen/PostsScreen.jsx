import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const PostsScreen = ({ navigation, route, place, title }) => {
  console.log("title--------->>>", title);
  console.log("place--------->>>", place);
  const [posts, setPosts] = useState([]);
  console.log("route===>>PostsScreen", route.params);

const {userEmail, nickName}=useSelector((state)=>state.auth)

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("POSTS info", posts);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.userBox,
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 16,
          marginTop: 32,
        }}
      >
        <Image
          style={{
            ...styles.imageUser,
            borderRadius: 16,
            width: 60,
            height: 60,
            marginRight: 8,
            backgroundColor: "deeppink",
          }}
          source={{}}
        />
        <View
          style={{
            ...styles.textBox,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={styles.userNickName}>{nickName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        renderItem={({ item }) => (
          <View style={styles.postWrap}>
            <Image style={styles.postImage} source={{ uri: item.photo }} />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ ...styles.postBtn, marginRight: 24 }}>
                <Feather
                  style={{ transform: [{ scaleX: -1 }] }}
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => navigation.navigate("Comments")}
                />
                <Text style={styles.postBtnText}>1000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                }}
              >
                <Feather name="thumbs-up" size={24} color="#BDBDBD" />
                <Text style={styles.postBtnText}>25466</Text>
              </TouchableOpacity>
              <View style={styles.postLocationWrap}>
                <TouchableOpacity
                  style={styles.postBtn}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text
                    style={{
                      ...styles.postBtnText,
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.place}
                    {/* USA Chicago, IL, 60622 */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
  },
  postWrap: {
    width: "100%",
    marginVertical: 16,
  },
  postImage: {
    borderRadius: 8,
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  postTitle: {
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  postBtnText: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  postLocationWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  userNickName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color:"#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)" },
});
