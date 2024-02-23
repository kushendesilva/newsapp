import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewsScreen } from "../screens";
import { TabNavigator } from "./TabNavigator";
import { observer } from "mobx-react-lite";
import { Colors } from "../theme";

export const AppNavigator = observer(function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: "Black",
            fontSize: 20,
          },
          headerBackVisible: false,
          // @ts-expect-error
          title: route?.params?.source.name
            ? // @ts-expect-error
              route?.params?.source.name
            : // @ts-expect-error
              route?.params?.title.substring(0, 20) + "...",
        })}
      />
    </Stack.Navigator>
  );
});
