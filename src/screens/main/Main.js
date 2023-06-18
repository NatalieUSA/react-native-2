import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../../router";
// import { auth } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, View } from "react-native";
// import { useState } from "react";
// import { useSelector } from "react-redux";

import { authStateChangeUser } from "../../../redux/auth/authOperations";

export const Main = () => {
  const { stateChange } = useSelector(state => state.auth);
  // console.log("STATE MAIN", state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
}, []);


  const routing = useRoute(stateChange);
  
// const routing = useRoute(true);
  
  return (
    <NavigationContainer style={styles.container}>
      {routing}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
