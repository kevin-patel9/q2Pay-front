import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllProduct from "./src/screen/AllProduct";
import SingleProduct from "./src/screen/SingleProduct";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="allProduct"
      >
        <Stack.Screen
          name="allProduct"
          component={AllProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="singleProduct"
          component={SingleProduct}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
