import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { APP_BASE_URL, APP_API_KEY, APP_POSTER_URL } from "@env";
import axios from "axios";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import malls from "../../data/data";


const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const WIDTH = Dimensions.get("screen").width;
  const HEIGHT = Dimensions.get("screen").height;
  const [moreDetails, setMoreDetails] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
  const [movieProviders, setMovieProviders] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mall, setMall] = useState([]);
  const [seatsData,setSeatsData] = useState([]);
  const mallsData = malls;
  console.log(mall, "selected");

  useEffect(() => {
    getMoreDetailsByID(movieId);
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
    <ScrollView
    Vertical
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop:5
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="white"
          />
          <Text style={styles.attributedText}>
            {moreDetails?.original_title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name="search" size={24} color="white" />
          <Ionicons
            style={{ marginHorizontal: 10 }}
            name="ios-filter-outline"
            size={24}
            color="white"
          />
          <Ionicons name="share-outline" size={24} color="white" />
        </View>
      </View>
      <View style={styles.safety}>
        <AntDesign name="Safety" size={24} color="orange" />
        <Text style={{ paddingTop: 4, paddingLeft: 4, color: "#fff" }}>
          Your safety is our priority
        </Text>
      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-06-10")}
        endDate={new Date("2023-06-21")}
        initialSelectedDate={new Date("2023-06-12")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
        {mallsData.map((item, index) => (
        <Pressable
          onPress={() => {
            setMall(item.name);
            setSeatsData(item.tableData);
          }}
          style={{ margin: 10 ,marginTop:20}}
          key={index}
        >
          <Text style={{ fontSize: 16, fontWeight: "500",color:"#fff" }}>{item.name}</Text>
          {mall.includes(item.name) ? (
            <FlatList
              numColumns={3}
              data={item.showtimes}
              renderItem={({ item }) => (
                <Pressable
                onPress={() => navigation.navigate("TheaterScreen",{
                  mall:mall,
                  movieId: movieId,
                  timeSelected:item,
                  tableSeats:seatsData,
                  date:selectedDate,
                  image:route.params.image
                })}
                  style={{
                    borderColor: "white",
                    borderWidth: 0.5,
                    width: 80,
                    borderRadius: 3,
                    margin: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          ) : null}
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A23",


  },

  flatListContainerStyle:{
    backgroundColor:"#1A1A23"
  },
 

  attributedText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 5,
  },
  safety: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 10,
  },
});
