import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";

export function RootNavigator() {
  let isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
