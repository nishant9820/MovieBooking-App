import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import MyTickets from "../screens/tickets/MyTickets";
import Ionic from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1A1A23",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          position: "absolute",
          borderTopColor: "transparent",
          elevation: 0,
          height: 54,
          overflow: "hidden",
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home-sharp" : "home-outline";
            colour = focused && "#ffffff";
          } else if (route.name === "MyTickets") {
            iconName = focused ? "film" : "film-outline";
            colour = focused && "#ffffff";
          }
          return (
            <>
              <Ionic
                name={iconName}
                style={{ marginBottom: 4 }}
                size={22}
                color={colour ? colour : "#ffffff40"}
              />
              <Ionic
                name="ellipse"
                style={{ display: colour ? "flex" : "none" }}
                size={4}
                color={colour ? colour : "transparent"}
              />
            </>
          );
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MyTickets" component={MyTickets} />
    </Tab.Navigator>
  );
};
export default BottomTabs;
