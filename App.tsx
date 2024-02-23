import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { RootNavigator } from "./app/navigators";
import {
  useFonts,
  Nunito_700Bold,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_900Black,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import { Feather } from "@expo/vector-icons";

const theme = {
  ...MD3LightTheme,
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Bold: Nunito_700Bold,
    Light: Nunito_300Light,
    Regular: Nunito_400Regular,
    SemiBold: Nunito_600SemiBold,
    Black: Nunito_900Black,
    ExtraBold: Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider
      theme={theme}
      settings={{
        //@ts-expect-error
        icon: (props) => <Feather {...props} />,
      }}
    >
      <RootNavigator />
    </PaperProvider>
  );
}
