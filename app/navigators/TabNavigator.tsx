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

export const TabNavigator = observer(function TabNavigator() {
  const Tab = AnimatedTabBarNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        style: {
          height: 30,
        },
      }}
      appearance={{
        activeTabBackgrounds: Colors.primary,
        shadow: true,
        floating: true,
        whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
        dotSize: DotSize.SMALL,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Home",
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
