import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";
import { observer } from "mobx-react-lite";
import { Colors } from "../theme";
import { useStores } from "../models";

export const RootNavigator = observer(function RootNavigator() {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.primary,
    },
  };
  const {
    authStore: { isAuthenticated },
  } = useStores();
  return (
    <NavigationContainer theme={customTheme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});
