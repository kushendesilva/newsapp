import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import Constants from "expo-constants";
import { Colors } from "../theme";

interface Props {
  centered?: boolean;
  white?: boolean;
  padding?: boolean;
  style?: ViewStyle;
  top?: boolean;
  children: ReactNode;
}

export const Screen: React.FC<Props> = ({
  centered = false,
  white = false,
  padding = false,
  top = false,
  style,
  children,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    alignItems: centered ? "center" : "stretch",
    backgroundColor: white ? Colors.white : Colors.background,
    paddingHorizontal: padding ? 10 : 0,
    marginTop: top ? 0 : Constants.statusBarHeight,
  };

  return <View style={[style, containerStyle]}>{children}</View>;
};
