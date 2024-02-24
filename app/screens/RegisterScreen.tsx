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

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const {
    authStore: { register },
  } = useStores();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  async function handleRegister() {
    const response = await register(email, password);
    if (response.error === true) {
      setErrors(response.data);
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
              {errors.map((item, index) => (
                <Text key={index} variant="bodyMedium">
                  {item}
                </Text>
              ))}
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
          autoCapitalize="none"
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
          onPress={handleRegister}
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
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  input: { marginTop: 10 },
  label: { fontFamily: "Bold", fontSize: 18 },
  register: { padding: 10, marginTop: 15, borderRadius: 10 },
  login: { padding: 5, marginTop: 10, borderRadius: 10 },
});
