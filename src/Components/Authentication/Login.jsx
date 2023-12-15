import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LoginForm from "./LoginForm";
import { useNavigation } from "@react-navigation/native";
import { brandColors } from "../../Theme/BrandColors";
import PopupMessage from "../HelperComponents/PopupMessage";

// Container for the login page.
const Login = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={styles.screen}>
      {/* show popup upon successful login action */}
      {showPopup && (
        <PopupMessage message="Login Successful!" setShowPopup={setShowPopup} />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer, showPopup && { opacity: 0.3 }]}>
          <Image
            source={require("./../../../assets/Logo.png")}
            style={styles.image}
          />
          <Text style={styles.textStyle}>WELCOME TO 108 YOGA ROAD</Text>

          {/* render login form */}
          <LoginForm navigation={navigation} setShowPopup={setShowPopup} />

          <View style={styles.signUpPromptContainer}>
            <Text>Not a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    marginTop: 20,
  },
  signUpText: {
    color: "blue",
  },
});
