import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

// Component for the login required message
const LoginRequiredMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcon name="lock" size={100} color="black" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    paddingTop: 150,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginRequiredMessage;
