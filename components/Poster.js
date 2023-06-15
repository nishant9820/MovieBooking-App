import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { APP_BASE_URL, APP_API_KEY, APP_POSTER_URL } from "@env";
import axios from "axios";

const Poster = ({ route, navigation }) => {
  const { movieId } = route.params;
  const WIDTH = Dimensions.get('screen').width;
  const HEIGHT = Dimensions.get('screen').height;
  const [movieDetails, setMovieDetails] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isBuy, setIsBuy] = useState(true);

  useEffect(() => {
    getMovieDetailsByID(movieId);
  }, [movieId]);

  const getMovieDetailsByID = async (movieId) => {
    setIsLoading(true);
    const movie = await axios
      .get(`${APP_BASE_URL}/movie/${movieId}?api_key=${APP_API_KEY}`)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
         <View
        style={{width: WIDTH, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            width: WIDTH * 0.9,
            height: HEIGHT * 0.9,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#ffffff20',
            elevation:30
          }}>
   
          <Image
            source={{uri: APP_POSTER_URL + movieDetails?.poster_path}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'stretch',
            }}
           
          /></View></View>
    </SafeAreaView>
  );
};

export default Poster;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A23",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    // position: "relative",
  },
  imageContainer: {
    width: "95%",
    elevation:10,
    alignItems: "center",
    justifyContent: "center",
  },
});
