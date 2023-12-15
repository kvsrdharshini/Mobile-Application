import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../Services/AuthService";
import { useAppConfig } from "../../Config/AppConfig";
import { useNavigation } from "@react-navigation/native";
import ForgotPasswordDialog from "../HelperComponents/ForgotPasswordDialog";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// This is the login form, uses formik for validation.
const LoginForm = ({ setShowPopup }) => {
  const navigation = useNavigation();
  const { appConfig, updateConfig, updateLog } = useAppConfig();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const userDetails = await login(values, appConfig);
      updateConfig(userDetails);
      setLoading(false);
      setShowPopup(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // timeout before navigating to home
      navigation.navigate("Home");
    } catch (error) {
      setMessage({ text: "Invalid credentials", color: "red" });
      setLoading(false);
    } finally {
      updateLog(); // this updates the list of poses the user has logged.
      console.log(appConfig);
    }
  };

  return (
    // Using formik library to handle form entries and submission
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        setMessage(null); // Clear previous message
        handleLogin(values);
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
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
            value={values.password.toLowerCase()}
          />
          {/* Error handling */}
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {loading && <ActivityIndicator size="small" color="black" />}
          {message && (
            <Text style={{ color: message.color }}>{message.text}</Text>
          )}

          <ForgotPasswordDialog
            isVisible={isDialogVisible}
            onClose={() => setDialogVisible(false)}
          />

          <View style={styles.resetPromptContainer}>
            <Text>Forgot password? </Text>
            <TouchableOpacity onPress={() => setDialogVisible(true)}>
              <Text style={styles.resetHereText}>Reset now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.logInText}>Log In</Text>
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
  loginButton: {
    marginTop: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 14,
    elevation: 3,
  },
  logInText: {
    color: "white",
    fontSize: 18,
  },
  resetPromptContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 6,
  },
  resetHereText: {
    color: "blue",
  },
});

export default LoginForm;
