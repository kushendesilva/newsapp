import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import { Chip, Card, Text, Searchbar, Appbar } from "react-native-paper";
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
  const [page, setPage] = useState(1);

  const handleChipPress = async (item: string, index: number) => {
    setSelectedChip(item === selectedChip ? Constants.countryName : item);
    await getResult(item === selectedChip ? Constants.countryName : item);
  };

  let searchTimeout: NodeJS.Timeout | null = null;

  const handleSearchQuery = async (query: string) => {
    setSearchQuery(query);
    setPage(1);

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
    const news: any = await searchNews(term || selectedChip, page);
    if (page === 1) {
      setData(news);
    } else {
      setData((prevData) => [...prevData, ...news]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, [page]);

  return (
    <Screen>
      <StatusBar style="light" />
      <View style={styles.searchbar}>
        <Searchbar
          iconColor={Colors.white}
          mode="bar"
          inputStyle={styles.input}
          style={styles.search}
          placeholder="Search"
          onChangeText={handleSearchQuery}
          value={searchQuery}
          cursorColor={Colors.white}
          placeholderTextColor={Colors.white}
        />
      </View>
      <View style={styles.container}>
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
          onRefresh={() => {
            setPage(1);
          }}
          refreshing={loading}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
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
  chip: { marginRight: 5 },
  chipText: {
    fontFamily: "Bold",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  container: { flex: 1, paddingHorizontal: 10 },
  input: {
    fontFamily: "SemiBold",
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  labelStrip: { flexDirection: "row", marginVertical: 10 },
  search: {
    backgroundColor: Colors.primary,
  },
  searchbar: {
    paddingTop: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  separator: { height: 10 },
});
