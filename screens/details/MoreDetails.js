import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { DataTable } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { APP_BASE_URL, APP_API_KEY, APP_POSTER_URL } from "@env";
import axios from "axios";

import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const MoreDetails = ({ route, navigation }) => {
  const { movieId } = route.params;

  const WIDTH = Dimensions.get("screen").width;
  const HEIGHT = Dimensions.get("screen").height;

  const [moreDetails, setMoreDetails] = useState("");
  const [movieProviders, setMovieProviders] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBuy, setIsBuy] = useState(true);

  useEffect(() => {
    getMoreDetailsByID(movieId);
    // getItemsInStorageData(movieId);
  }, [movieId]);

  const getMoreDetailsByID = async (movieId) => {
    setIsLoading(true);
    const movie = await axios
      .get(`${APP_BASE_URL}/movie/${movieId}?api_key=${APP_API_KEY}`)
      .then((res) => setMoreDetails(res.data), getMovieProviders(movieId))
      .catch((err) => console.log(err));
    setIsLoading(false);
  };
  const getMovieProviders = async (id) => {
    setIsLoading(true);
    let movieProArr = [];
    const providers = await axios
      .get(`${APP_BASE_URL}/movie/${id}/watch/providers?api_key=${APP_API_KEY}`)
      .then(async (provider) => {
        movieProArr.push(
          provider.data.results.IN?.flatrate
            ? provider.data.results.IN.flatrate
            : null
        );
      });
    setMovieProviders(movieProArr[0] ? movieProArr[0] : null);
    setIsLoading(false);
  };

  const hour = Math.floor(moreDetails?.runtime / 60);
  const min = moreDetails?.runtime - hour * 60;

  return (
    <View
      Vertical
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="chevron-back"
            style={{ fontSize: 18, color: "#fff" }}
            activeOpacity={0.6}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>More Details</Text>
      </View>
      <View style={{ width: WIDTH }}>
        <View
          style={{
            width: WIDTH,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {/* <View
            style={{
              marginLeft: WIDTH * 0.14,
              width: WIDTH * 0.72,
              height: HEIGHT * 0.5,
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#ffffff20",
              elevation: 10,
            }}
          >
            <Image
              source={{ uri: APP_POSTER_URL + moreDetails?.poster_path }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />

            {movieProviders && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#ffffff20",
                  position: "absolute",

                  top: 20,
                  right: 20,
                  elevation: 30,
                  zIndex: 1,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 8,
                  }}
                  source={{
                    uri: APP_POSTER_URL + movieProviders[0]?.logo_path,
                  }}
                />
              </View>
            )}
          </View> */}
          <View style={{ marginLeft: 18 }}>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Name:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.original_title}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Release Date:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.release_date?.toString()}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Genres:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.genres ? moreDetails.genres[0].name : null},
              </Text>
              <Text style={styles.attributedText}>
                {moreDetails?.genres ? moreDetails.genres[1].name : null}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Time Duration:</Text>
              <Text style={styles.attributedText}>
                {hour + "hr" + " " + min + "min"}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Adult:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.adult?.toString()}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>IMDB:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.vote_average?.toString().slice(0, 3)}
                <Text style={styles.propertyText}>/10</Text>
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.propertyText}>Vote Count:</Text>
              <Text style={styles.attributedText}>
                {moreDetails?.vote_count?.toString()}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={styles.propertyText}>overview:</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#ffffff",
                  maxWidth: WIDTH * 0.7,
                  // textAlign: "center",
                  marginLeft: 13,
                  fontWeight: "400",
                  marginTop: 5,
                  // marginBottom: 20,
                }}
              >
                {moreDetails?.overview}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{height:250}}></View>
      <View
        style={{
          width: WIDTH,
          height: HEIGHT,
          position: "absolute",
          zIndex: -1,
          opacity: 1,
          alignItems: "center",
          justifyContent:"center",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#1A1A2300", "#1A1A2390", "#1A1A23", "#1A1A23"]}
          style={{
            width: WIDTH,
            height: 80,
            position: "absolute",
            zIndex: 1,
            bottom: 0,
          }}
        ></LinearGradient>
        <Image
          source={{ uri: APP_POSTER_URL + moreDetails?.backdrop_path }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            opacity: 0.1,
           
          }}
        />
      </View>
    </View>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A23",
    padding: 0,
    position: "relative",
  },
  backContainer: { padding: 20, alignItems: "center", flexDirection: "row" },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#262532",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: "23%",
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  propertyText: {
    fontSize: 12,
    color: "#ffffff",
    // maxWidth: WIDTH * 0.9,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    opacity: 0.4,
    // marginBottom: 20,
  },
  attributedText: {
    fontSize: 18,
    color: "#ffffff",
    // maxWidth: WIDTH * 0.9,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 13,
  },
});
