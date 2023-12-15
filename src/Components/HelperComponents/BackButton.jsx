import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

// Component for the header back button
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <Icon
        name="arrow-back-outline"
        size={30}
        style={styles.icon}
        onPress={() => navigation.goBack()}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  icon: {
    color: "black",
  },
});
