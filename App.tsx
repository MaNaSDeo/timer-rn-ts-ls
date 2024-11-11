import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TimerSetupScreen from "./screen/TimerSetupScreen";
import HomeScreen from "./screen/HomeScreen";
import { type AppStackParamList } from "./types";

const AppStack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen name="SetNew" component={TimerSetupScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  );
}
