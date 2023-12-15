import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import WebView from "react-native-webview";

export const defaultImageURL =
  "https://i0.wp.com/www.yogabasics.com/yogabasics2017/wp-content/uploads/2021/03/Ashtanga-Yoga.jpeg";

const ImageWebView = ({ url }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: url || defaultImageURL }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});

export default ImageWebView;
