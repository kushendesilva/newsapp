import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DashboardScreen, SearchScreen, ProfileScreen } from "../screens";
import Colors from "../configurations/Colors";

export function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const { bottom } = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontFamily: "SemiBold",
          fontSize: 14,
          top: -15,
        },
        tabBarStyle: {
          height: 85,
          borderRadius: 50,
          margin: 15,
          marginBottom: 25,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Home",

          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={30}
              color={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={24}
              color={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
