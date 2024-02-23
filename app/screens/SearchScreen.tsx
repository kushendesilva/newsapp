import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useStores } from "../models";
import { Colors } from "../theme";

export function SearchScreen({ navigation }: { navigation: any }) {
  const {
    newsStore: { searchNews },
  } = useStores();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const getResult = async () => {
    setLoading(true);
    const news: any = await searchNews("us");
    setData(news.articles);
    setLoading(false);
  };
  useEffect(() => {
    getResult();
  }, []);
  return (
    <View style={styles.root}>
      <StatusBar style="auto" />
      <FlatList
        onRefresh={() => getResult()}
        refreshing={loading}
        data={data}
        keyExtractor={(news) => news.publishedAt + news.title}
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  separator: { height: 10 },
});
