import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Card, Text, Appbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useStores } from "../models";
import { Screen } from "../components";
import { Colors } from "../theme";
import { Constants } from "../constants";

export function DashboardScreen({ navigation }: { navigation: any }) {
  const {
    newsStore: { getNews },
  } = useStores();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const getResult = async () => {
    setLoading(true);
    const news: any = await getNews();
    setData(news);
    setLoading(false);
  };
  useEffect(() => {
    getResult();
  }, []);

  const listRef = useRef<FlatList>(null);

  const separator = () => <View style={styles.separator} />;

  const header = () => <View style={styles.header} />;

  const footer = () => (
    <View style={styles.footer}>
      <Button
        icon="arrow-up"
        style={styles.scrollButton}
        labelStyle={styles.scrollText}
        textColor={Colors.black}
        mode="text"
        onPress={() => {
          if (listRef.current) {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }
        }}
      >
        Scroll to Top
      </Button>
    </View>
  );

  return (
    <Screen>
      <StatusBar style="light" />
      <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.appbarTitle} title="Top Headlines" />
      </Appbar>
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          onRefresh={() => getResult()}
          refreshing={loading}
          data={data}
          keyExtractor={(news) => news.publishedAt + news.title}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ItemSeparatorComponent={separator}
          renderItem={({ item }) => (
            <Card
              mode="outlined"
              style={styles.card}
              onPress={() => navigation.navigate("News", item)}
            >
              <Card.Cover
                source={{ uri: item.urlToImage || Constants.sampleImage }}
              />
              <Card.Content>
                <Text style={styles.cardTitle} variant="titleMedium">
                  {item.title}
                </Text>
                <Text style={styles.cardSubtitle} variant="bodySmall">
                  {item.description}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  appbarTitle: { fontFamily: "Bold", textAlign: "center", color: Colors.white },
  card: { backgroundColor: Colors.black },
  cardTitle: { color: Colors.white, marginTop: 10, fontFamily: "Black" },
  cardSubtitle: { color: Colors.white, marginTop: 5, fontFamily: "Light" },
  container: { paddingHorizontal: 10, flex: 1 },
  header: { height: 15 },
  footer: { height: 200 },
  scrollButton: { marginVertical: 10 },
  scrollText: { fontFamily: "Bold" },
  separator: { height: 10 },
});
