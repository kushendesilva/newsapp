import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewsScreen } from "../screens";
import { TabNavigator } from "./TabNavigator";
import { observer } from "mobx-react-lite";

export const AppNavigator = observer(function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="News" component={NewsScreen} />
    </Stack.Navigator>
  );
});
