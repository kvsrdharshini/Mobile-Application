import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../Services/AuthService";
import { useAppConfig } from "../../Config/AppConfig";
import { useNavigation } from "@react-navigation/native";
import { brandColors } from "../../Theme/BrandColors";
import { CheckBox } from "react-native-elements";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(100, "Password must not exceed 100 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// This is the form for signing up.
const SignupForm = ({ setShowPopup }) => {
  const { appConfig } = useAppConfig();
  const navigation = useNavigation();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  //is checked is whether or not they accepted the health disclaimer.
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      await register(values, appConfig);
      setLoading(false);
      setShowPopup(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // timeout before navigating to home
      navigation.navigate("Login");
    } catch (error) {
      setMessage({
        text: "Failure to register, check that you don't already have an account.",
        color: "red",
      });
      setLoading(false);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);

    //calls the service which attempts to make a new Wix Member
    handleRegister(values);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email.toLowerCase()}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password.toLowerCase()}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword.toLowerCase()}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <View style={styles.disclaimer}>
            <CheckBox
              title="I agree that I will be liable for my own safety while performing the poses"
              checked={isChecked}
              onPress={toggleCheckbox}
              textStyle={{
                lineHeight: 20,
              }}
              checkedColor={brandColors.primary}
            />
          </View>

          {loading && <ActivityIndicator size="small" color="black" />}
          {message && (
            <Text style={{ color: message.color }}>{message.text}</Text>
          )}

          {/* Submit only works if there are no formik errors and they 
          have accepted the disclaimer. */}
          <TouchableOpacity
            style={[styles.signUpButton, !isChecked && { opacity: 0.4 }]}
            onPress={handleSubmit}
            disabled={!isChecked}
          >
            <Text style={styles.signUpText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  submitButtonContainer: {
    marginTop: 12,
  },
  signUpButton: {
    marginTop: 8,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 14,
    elevation: 3,
  },
  signUpText: {
    color: "white",
    fontSize: 18,
  },
  disclaimer: {
    maxWidth: "78%",
    marginVertical: 8,
  },
});

export default SignupForm;
