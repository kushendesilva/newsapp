import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useStores } from "../models";
import { Screen } from "../components";

export function DashboardScreen({ navigation }: { navigation: any }) {
  const {
    newsStore: { getNews },
  } = useStores();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const getResult = async () => {
    setLoading(true);
    const news: any = await getNews();
    setData(news.articles);
    setLoading(false);
  };
  useEffect(() => {
    getResult();
  }, []);
  return (
    <Screen padding>
      <StatusBar style="auto" />
      <FlatList
        onRefresh={() => getResult()}
        refreshing={loading}
        data={data}
        keyExtractor={(news) => news.publishedAt + news.title}
        ListHeaderComponent={() => <View style={styles.header} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Card mode="outlined">
            <Card.Cover source={{ uri: item.urlToImage }} />
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodySmall">{item.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("News", item)}>
                More info
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { height: 15 },
  footer: { height: 25 },
  separator: { height: 10 },
});
