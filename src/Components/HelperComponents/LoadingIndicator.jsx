import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Component for the loading indicator of the video container
const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 70,
  },
});

export default LoadingIndicator;
