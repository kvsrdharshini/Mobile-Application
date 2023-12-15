import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { defaultImageURL } from "./ImageWebView";
import { getImageURL } from "../../Services/ImageService";
import Icon from "react-native-vector-icons/Ionicons";

// Logic and component to display random quotes with carousel swiper images
const Carousel = ({ images, setPosesLoaded }) => {
  const TOTAL_SWIPER_IMAGES = 3;
  const indexes = [];
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
  const quotes = [
    "You got this!!",
    "Let's Go!!",
    "Keep Rocking!!",
    "Strength Through Serenity",
    "Mind, Body, Spirit",
    "Find Balance, Find Bliss",
    "Sweat, Smile, Repeat.",
    "Embrace the Challenge",
  ];

  // Get 3 random index numbers
  while (indexes.length < TOTAL_SWIPER_IMAGES) {
    const randomIndex = getRandomIndex(Object.keys(images).length);

    // Add the random index to our indexes array
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  // Get random quotes from the list
  let usedQuoteIndexes = [];
  const getRandomQuote = () => {
    const randomIndex = getRandomIndex(quotes.length);
    if (!usedQuoteIndexes.includes(randomIndex)) {
      usedQuoteIndexes.push(randomIndex);
      return quotes[randomIndex];
    } else {
      return getRandomQuote();
    }
  };

  // Get image urls and quotes using the random indexes
  const randomImages = indexes.map((i) => {
    const imageObject = {
      url: images[Object.keys(images)[i]],
      quote: getRandomQuote(),
    };

    return imageObject;
  });

  // Render the poses and enable the pose of the day functionality
  useEffect(() => {
    setPosesLoaded(true);
  }, []);

  return (
    <Swiper
      style={styles.swiperContainer}
      autoplay={true}
      autoplayTimeout={5}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      activeDotColor="white"
      showsButtons={true}
      prevButton={
        <View style={styles.iconBack}>
          <Icon name={"chevron-back"} style={styles.chevron} />
        </View>
      }
      nextButton={
        <View style={styles.iconBack}>
          <Icon name={"chevron-forward"} style={styles.chevron} />
        </View>
      }
    >
      {randomImages.map((img, index) => (
        <View key={index}>
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{img.quote}</Text>
          </View>
          <Image
            source={{ uri: getImageURL(img.url) || defaultImageURL }}
            style={styles.carouselImage}
            resizeMode="contain"
          />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    marginTop: 20,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  iconBack: {
    width: 31,
    height: 34,
    backgroundColor: "white",
    paddingTop: 2,
    paddingLeft: 1,
    borderRadius: 8,
  },
  chevron: {
    color: "black",
    fontWeight: "bold",
    fontSize: 28,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    shadowRadius: 50,
  },
  activeDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    shadowRadius: 50,
  },
  quoteContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  quoteText: {
    fontSize: 26,
    fontFamily: "BarlowCondensed-ExtraBold",
    marginBottom: 10,
  },
});

export default Carousel;
