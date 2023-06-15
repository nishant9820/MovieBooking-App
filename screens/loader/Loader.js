import { StyleSheet, Text, View } from "react-native";

import BottomTabs from "../../Tabs/BottomTabs";

export default function Loader() {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
			}}>
	<BottomTabs/>
		
		</View>
	);
}
