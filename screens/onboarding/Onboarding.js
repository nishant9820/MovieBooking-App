import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import Onboardingitem from "../../components/Onboardingitem.js";
import Paginator from "../../components/Paginator";
import slides from "../../data/slides.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Loader");
    }
  };
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  // const currentLogin = async () => {
  //   const email = await AsyncStorage.getItem("EMAIL");
  //   const Id = await AsyncStorage.getItem("USERID");
  //   console.log(email, Id);
  // };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <Onboardingitem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          ref={slidesRef}
          // viewabilityConfig={viewConfig}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Loader");
            // currentLogin();
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "#1A1A23",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={scrollTo}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A23",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 100,
    backgroundColor: "#fff",
    marginBottom: -34,
    marginRight: 250,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 100,
    backgroundColor: "#fff",
    marginBottom: 7,
    marginLeft: 250,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#1A1A23",
  },
});
