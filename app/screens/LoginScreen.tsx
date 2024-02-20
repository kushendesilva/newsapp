import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native-paper";

export function LoginScreen() {
  return (
    <View>
      <StatusBar style="auto" />
      <Text style={{ fontFamily: "Black", fontSize: 18 }}>Welcome</Text>
    </View>
  );
}
