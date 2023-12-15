import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, View, Text, Animated } from "react-native";

// Component for popup message
const PopupMessage = ({ message, setShowPopup }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500, // Fading in duration
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500, // Fading out duration
        useNativeDriver: true,
      }).start();
      setShowPopup(false);
    }, 1500); // Display time
  }, [fadeAnimation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{ opacity: fadeAnimation, width: "100%", paddingHorizontal: 16 }}
      >
        <View
          style={{
            backgroundColor: "black",
            padding: 18,
            borderRadius: 14,
          }}
        >
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "75%",
    width: "100%",
    alignItems: "center",
    zIndex: 100,
  },
  message: {
    color: "white",
    fontSize: 20,
  },
});

export default PopupMessage;
