import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen } from "../screens";
import { observer } from "mobx-react-lite";
import { Colors } from "../theme";

export const AuthNavigator = observer(function AuthNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerBackVisible: false,
        headerShown: true,
        headerStyle: { backgroundColor: Colors.primary },
        headerTitleStyle: {
          color: Colors.white,
          fontFamily: "Black",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
});
