import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Card, Text, Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Screen } from "../components";
import { Colors } from "../theme";
import { useStores } from "../models";

export function ProfileScreen() {
  const {
    authStore: { logout, user },
  } = useStores();
  return (
    <Screen>
      <StatusBar style="light" />
      <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.appbarTitle} title="My Account" />
      </Appbar>
      <View style={styles.container}>
        <Card style={{ alignItems: "center", backgroundColor: Colors.primary }}>
          <Card.Content style={{ alignItems: "center" }}>
            <Avatar.Icon
              size={100}
              icon="user"
              color={Colors.primary}
              style={{ marginBottom: 10, backgroundColor: Colors.white }}
            />
            <Text
              style={{ color: Colors.white, fontFamily: "Black" }}
              variant="titleLarge"
            >
              {user.name}
            </Text>
            <Text
              style={{ color: Colors.white, fontFamily: "Regular" }}
              variant="bodyMedium"
            >
              {user.email}
            </Text>
            <Button
              mode="contained"
              labelStyle={{ color: Colors.black }}
              buttonColor={Colors.white}
              style={{ marginTop: 15 }}
              onPress={() => logout()}
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
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
  container: { flex: 1, padding: 20 },
});
