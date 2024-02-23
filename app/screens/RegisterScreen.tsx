import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../components";
import { Button, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../theme";

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen top padding>
      <StatusBar style="light" />
      <TextInput
        activeOutlineColor={Colors.primary}
        style={styles.input}
        mode="outlined"
        label="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        activeOutlineColor={Colors.primary}
        style={styles.input}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        activeOutlineColor={Colors.primary}
        style={styles.input}
        secureTextEntry
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={styles.register}
        buttonColor={Colors.primary}
        labelStyle={styles.label}
        mode="contained"
        onPress={() => console.log("Registered")}
      >
        Register
      </Button>
      <Button
        style={styles.login}
        textColor={Colors.primary}
        labelStyle={styles.label}
        mode="text"
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account?
      </Button>
    </Screen>
  );
}
const styles = StyleSheet.create({
  input: { marginTop: 10 },
  label: { fontFamily: "Bold", fontSize: 18 },
  register: { padding: 10, marginTop: 15, borderRadius: 10 },
  login: { padding: 5, marginTop: 10, borderRadius: 10 },
});
