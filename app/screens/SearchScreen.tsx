import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import { Chip, Card, Text, Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useStores } from "../models";
import { Colors } from "../theme";
import { Screen } from "../components";
import { Constants } from "../constants";

export function SearchScreen({ navigation }: { navigation: any }) {
  const {
    newsStore: { searchNews },
  } = useStores();

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipPress = async (item: string, index: number) => {
    setSelectedChip(item === selectedChip ? Constants.countryName : item);
    await getResult(item === selectedChip ? Constants.countryName : item);
  };

  let searchTimeout: NodeJS.Timeout | null = null;

  const handleSearchQuery = async (query: string) => {
    setSearchQuery(query);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(async () => {
      const selected = query.trim() === "" ? Constants.countryName : query;
      setSelectedChip(selected);

      await getResult(selected);
    }, 500);
  };

  const getResult = async (term: string | null = Constants.countryName) => {
    setLoading(true);
    const news: any = await searchNews(term || selectedChip);
    const filteredData = news.articles.filter((article: any) => article.title);
    setData(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Screen padding>
      <StatusBar style="auto" />
      <Searchbar
        inputStyle={styles.input}
        style={styles.search}
        placeholder="Search"
        onChangeText={handleSearchQuery}
        value={searchQuery}
      />
      <ScrollView horizontal={true} style={styles.labelStrip}>
        {Constants.labels.map((item, index) => (
          <Chip
            textStyle={styles.chipText}
            style={styles.chip}
            mode="outlined"
            key={index}
            onPress={() => handleChipPress(item, index)}
            selected={item === selectedChip}
          >
            {item}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        onRefresh={() => getResult()}
        refreshing={loading}
        data={data}
        keyExtractor={(news) => news.publishedAt + news.title}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.black },
  cardTitle: { color: Colors.white, marginTop: 10, fontFamily: "Black" },
  cardSubtitle: { color: Colors.white, marginTop: 5, fontFamily: "Light" },
  chip: { marginRight: 5 },
  chipText: {
    fontFamily: "Bold",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  input: { fontFamily: "SemiBold" },
  labelStrip: { flexDirection: "row", marginVertical: 10 },
  search: { backgroundColor: Colors.white },
  separator: { height: 10 },
});
