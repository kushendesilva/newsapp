import React from "react";
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from "react-native-animated-nav-tab-bar";
import { Feather } from "@expo/vector-icons";
import { DashboardScreen, SearchScreen, ProfileScreen } from "../screens";
import { Colors } from "../theme";
import { observer } from "mobx-react-lite";
import { Text } from "react-native-paper";

export const TabNavigator = observer(function TabNavigator() {
  const Tab = AnimatedTabBarNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      appearance={{
        activeTabBackgrounds: Colors.primary,
        shadow: true,
        floating: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
        dotSize: DotSize.SMALL,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }: { focused: any }) => (
            <Text
              style={{
                color: focused ? Colors.white : Colors.gray,
                marginHorizontal: 5,
                fontFamily: "Bold",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }: { focused: any }) => (
            <Feather
              name="home"
              size={30}
              color={focused ? Colors.white : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarLabel: ({ focused }: { focused: any }) => (
            <Text
              style={{
                color: focused ? Colors.white : Colors.gray,
                marginHorizontal: 5,
                fontFamily: "Bold",
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }: { focused: any }) => (
            <Feather
              name="search"
              size={30}
              color={focused ? Colors.white : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }: { focused: any }) => (
            <Text
              style={{
                color: focused ? Colors.white : Colors.gray,
                marginHorizontal: 5,
                fontFamily: "Bold",
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }: { focused: any }) => (
            <Feather
              name="user"
              size={30}
              color={focused ? Colors.white : Colors.gray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});
