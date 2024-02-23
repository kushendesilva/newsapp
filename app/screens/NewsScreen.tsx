import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Image, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { Screen } from "../components";
import { formatDate } from "../utils";
import { Colors } from "../theme";

export function NewsScreen({ route }: { route: any }) {
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;
  const news = route.params;
  console.log(news.author);
  const date = formatDate(news.publishedAt);
  return (
    <Screen white top padding>
      <StatusBar style="light" />
      <Text variant="headlineSmall" style={styles.title}>
        {news.title}
      </Text>
      <Text variant="labelLarge" style={styles.label}>
        By {news.author ? news.author : news.source.name}
      </Text>

      <Text variant="labelLarge" style={styles.label}>
        {date}
      </Text>

      <Image source={{ uri: news.urlToImage }} style={styles.cover} />

      <Text variant="bodyLarge">{news.description}</Text>

      <Button
        buttonColor={Colors.primary}
        style={styles.button}
        mode="contained"
        onPress={() => Linking.openURL(news.url)}
      >
        Read More
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: { padding: 10, marginTop: 10 },
  cover: {
    borderRadius: 10,
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  title: { fontFamily: "SemiBold", textAlign: "center", marginVertical: 10 },
  description: {
    fontFamily: "Regular",
    textAlign: "justify",
  },
  label: { fontFamily: "Light", textAlign: "left" },
});
