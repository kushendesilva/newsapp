import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";
import { observer } from "mobx-react-lite";
import { Colors } from "../theme";

export const RootNavigator = observer(function RootNavigator() {
  let isAuthenticated = true;

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.background,
    },
  };
  return (
    <NavigationContainer theme={customTheme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});
