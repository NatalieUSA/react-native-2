import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { PostsScreen } from "../../nestedScreens/PostsScreen/PostsScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../nestedScreens/MapScreen/MapScreen";

const NestedScreen = createStackNavigator();

export const Home = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        options={{
          headerShown: false,
        }}
        component={PostsScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

