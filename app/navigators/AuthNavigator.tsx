import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen } from "../screens";

export function AuthNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
