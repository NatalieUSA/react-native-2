import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

export const Avatar = () => {
  return (
    <>
      <Image style={styles.avatarImg} />
      <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.7}>
        {/* <AntDesign name="closecircleo" size={25} color="#E8E8E8"></AntDesign> */}
        <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
      </TouchableOpacity>
    </>
  );
};

 const styles = StyleSheet.create({
   avatarImg: {
     width: "100%",
     height: "100%",
     borderRadius: 16,
     resizeMode: "cover",
   },
   avatarBtn: {
     position: "absolute",
     right: -14,
     bottom: 14,
     borderRadius: 45,
     backgroundColor: "#ffffff",
   },
 });

