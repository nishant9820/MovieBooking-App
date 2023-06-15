import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./screens/onboarding/Onboarding";
import HomeScreen from "./screens/home/HomeScreen";
import Loader from "./screens/loader/Loader";
import renderItem from "./screens/details/MovieDetails";
import MoreDetails from "./screens/details/MoreDetails";
import { LogBox } from "react-native";
import Poster from "./components/Poster";
import MovieScreen from "./screens/booking/MovieScreen";
import MyTickets from "./screens/tickets/MyTickets";
import { MovieContext } from "./Context";
import TheatreScreen from "./screens/booking/TheatreScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import TicketScreen from "./screens/tickets/TicketScreen";
const stack = createNativeStackNavigator();
// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <MovieContext>
      <StripeProvider publishableKey="pk_test_51MBXXNSHJLr1jwGDmvepcylN5nJA4nHHIOdKhuVzgtVCYQms6zjLAXBhMQn6m5k69S6FXr46hnQHSng1rQO8BNEm00QRiJqfzx">
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="MovieDetails"
              component={renderItem}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Loader"
              component={Loader}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="MyTickets"
              component={MyTickets}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="MoreDetails"
              component={MoreDetails}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Poster"
              component={Poster}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="MovieScreen"
              component={MovieScreen}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="TheaterScreen"
              component={TheatreScreen}
              options={{ headerShown: false }}
            />
              <stack.Screen
              name="TicketScreen"
              component={TicketScreen}
              options={{ headerShown: false }}
            />
          </stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </MovieContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
