import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./src/screens/auth/LoginScreen/LoginScreen.jsx";
import { RegistrationScreen } from "./src/screens/auth/RegistrationScreen/RegistrationScreen.jsx";
import { CreatePostsScreen } from "./src/screens/main/CreatePostsScreen/CreatePostsScreen.jsx";
import { ProfileScreen } from "./src/screens/main/ProfileScreen/ProfileScreen.jsx";
import { Home } from "./src/screens/main/Home/Home.jsx";

import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authLogout } from "./redux/auth/authOperations.js";

const AuthStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
   const dispatch = useDispatch();

   const onLogOut = () => {
     dispatch(authLogout());
   };
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          height: 40,
          maxWidth: 70,
          borderRadius: 20,
          marginRight: 15,
          marginLeft: 15,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#FFFFFF",
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 15,
          paddingVertical: 9,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <BottomTab.Screen
        name="Публікації"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={size} color={color} focused={focused} />
          ),
          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={onLogOut}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        }}
      />
      <BottomTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
          },

          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add" size={size} color={color} focused={focused} />
          ),

          headerLeft: ({ focused, color, size }) => (
            <TouchableOpacity>
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
