import { View, Text, TextInput, Button,  StyleSheet } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import TheaterScreen from "./booking/TheatreScreen";


const Pay = () => {
	return (
		<View style={styles.container}>
			<StripeProvider publishableKey="pk_test_51MBXXNSHJLr1jwGDmvepcylN5nJA4nHHIOdKhuVzgtVCYQms6zjLAXBhMQn6m5k69S6FXr46hnQHSng1rQO8BNEm00QRiJqfzx">
			<TheaterScreen/>
			</StripeProvider>
			<StatusBar style="auto" />
		</View>
	);
};

export default Pay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
