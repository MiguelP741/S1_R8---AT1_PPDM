import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Home";
import ListScreenPlantas from "./src/screens/Listagem/Plantas";
import ListScreenZumbis from "./src/screens/Listagem/Zumbis";
import DetalhesScreen from "./src/screens/Detalhes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListScreenPlantas"
          component={ListScreenPlantas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListScreenZumbis"
          component={ListScreenZumbis}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesScreen"
          component={DetalhesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}