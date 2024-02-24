import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../components";
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../theme";
import { useStores } from "../models";

export function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const {
    authStore: { signIn },
  } = useStores();

  async function handleLogin() {
    if ((email && password) !== "") {
      const response = await signIn(email, password);
      if (response.error === true) {
        setError(response.data.title);
        showDialog();
      }
    } else {
      setError("Please enter your email & password.");
      showDialog();
    }
  }

  return (
    <PaperProvider>
      <Screen top padding>
        <StatusBar style="light" />
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{error}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor={Colors.primary} onPress={hideDialog}>
                Okay
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TextInput
          activeOutlineColor={Colors.primary}
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          activeOutlineColor={Colors.primary}
          style={styles.input}
          secureTextEntry
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        <Button
          style={styles.login}
          buttonColor={Colors.primary}
          labelStyle={styles.label}
          mode="contained"
          onPress={() => handleLogin()}
        >
          Login
        </Button>
        <Button
          style={styles.register}
          textColor={Colors.primary}
          labelStyle={styles.label}
          mode="text"
          onPress={() => navigation.navigate("Register")}
        >
          Create an Account
        </Button>
      </Screen>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  input: { marginTop: 10 },
  label: { fontFamily: "Bold", fontSize: 18 },
  login: { padding: 10, marginTop: 15, borderRadius: 10 },
  register: { padding: 5, marginTop: 10, borderRadius: 10 },
});
