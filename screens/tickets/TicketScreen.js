import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { APP_BASE_URL, APP_API_KEY, APP_POSTER_URL } from "@env";
import axios from "axios";
// import { QRCode } from "react-native-custom-qr-codes-expo";

const MovieDetails = ({ route, navigation }) => {
  const { movieId } = route.params;

  const WIDTH = Dimensions.get("screen").width;
  const HEIGHT = Dimensions.get("screen").height;

  const [movieDetails, setMovieDetails] = useState("");
  const [movieProviders, setMovieProviders] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBuy, setIsBuy] = useState(true);

  useEffect(() => {
    getMovieDetailsByID(movieId);
  }, [movieId]);

  const getMovieDetailsByID = async (movieId) => {
    setIsLoading(true);
    const movie = await axios
      .get(`${APP_BASE_URL}/movie/${movieId}?api_key=${APP_API_KEY}`)
      .then((res) => setMovieDetails(res.data), getMovieProviders(movieId))
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#1A1A23",
          height: "90%",
          margin: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
            {movieDetails?.original_title}
          </Text>
          <Text>{route.params.selectedSeats.length}</Text>
          {/* {route.params.selectedSeats.map((item, index) => (
            <Text>{item}</Text>
          ))} */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>HINDI - 2D</Text>

          <Text style={{ color: "red", fontSize: 16 }}>PVR TICKET</Text>
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            color: "white",
            marginTop: 9,
          }}
        >
          {route.params.mall}
        </Text>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              DATE & TIME
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16, color: "white" }}>
              {route.params.timeSelected}
            </Text>
            <Text style={{ color: "white" }}>
              {moment(route.params.date).utc().format("MM/DD/YYYY")}
            </Text>
          </View>

          <Image
            style={{ aspectRatio: 4 / 2, height: 60, borderRadius: 6 }}
            source={{ uri: APP_POSTER_URL + movieDetails?.poster_path }}
          />
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginLeft: 14 }}>
            <Text style={{ color: "white" }}>AUDI NO</Text>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              2
            </Text>
          </View>

          <View>
            <Text style={{ color: "white", marginRight: 5 }}>TICKETS</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
                color: "white",
              }}
            >
              {route.params.selectedSeats.length}
            </Text>
          </View>
          <View style={{ marginRight: 15 }}>
            <Text style={{ color: "#fff" }}>SEATS</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {route.params.selectedSeats.map((item, index) => (
                <Text
                  style={{
                    margin: 3,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 6,
                  }}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            height: 140,
            backgroundColor: "#8DA399",
            borderRadius: 6,
            margin: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                0's Seat convenience
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.priceValue}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Convenience Fee
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹87
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Grand Total
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.total}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ID NO
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                FGSJSDN3493943
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            // height:200,
            marginBottom: 7,
          }}
        >
          <Image
            source={require("../../assets/images/flowcode.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            color: "#fff",
          }}
        >
          W33JNK3
        </Text>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#fff",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate("Loader")}
        style={{
          backgroundColor: "green",
          marginLeft: "auto",
          marginRight: "auto",
          width: WIDTH * 0.5,
          borderRadius: 4,
          padding: 10,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
          Home
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 0,
    position: "relative",
  },
});
