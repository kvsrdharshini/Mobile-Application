// For the sign up page I want the yoga logo to be on the screen

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SignupForm from "./SignupForm";
import { useNavigation } from "@react-navigation/native";
import { brandColors } from "../../Theme/BrandColors";
import PopupMessage from "../HelperComponents/PopupMessage";

//This is the container that contains the sign up form.
const Signup = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={styles.screen}>
      {showPopup && (
        <PopupMessage
          message="Registered Successfully!"
          setShowPopup={setShowPopup}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer, showPopup && { opacity: 0.3 }]}>
          {/* Image is of the 'Yogi' mascot.*/}
          <Image
            source={require("./../../../assets/Logo.png")}
            style={styles.image}
          />
          <Text style={styles.textStyle}>WELCOME TO 108 YOGA ROAD</Text>

          <SignupForm navigate={navigation} setShowPopup={setShowPopup} />

          <View style={styles.signUpPromptContainer}>
            <Text>Already a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUpText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textStyle: {
    fontWeight: "bold",
    color: brandColors.primary,
    fontSize: 18,
  },
  signUpPromptContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 100,
  },
  signUpText: {
    color: "blue",
  },
});
