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
import { deleteData, login } from "../../Services/AuthService";
import { useAppConfig } from "../../Config/AppConfig";
import { useNavigation } from "@react-navigation/native";
import { REMOVE_DATA_SUCCESS_MESSAGE } from "../../Config/Constants";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// This is the form that users see when they clear the data.
// Intially the Login form was used for this as they had the same fields,
// but it was later moved into it's own component as it is more intuitive for a
// new developer.
const RemoveDataForm = ({ setShowPopup }) => {
  const navigation = useNavigation();
  const { appConfig, clearLog } = useAppConfig();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    deleteData(values, appConfig).then(async (result) => {
      if (result === REMOVE_DATA_SUCCESS_MESSAGE) {
        //To save bandwidth we clear the cache once it has received
        // a success message from the server. If the server sent back
        // a sucess without clearing the data then this app will be
        // out of sync with the Wix server.
        clearLog();
      } else {
        setMessage({ text: result, color: "red" });
      }
      setLoading(false);
      setShowPopup(true);

      // Waits 5 seconds showing the popup, then it navigates to the home page.
      setTimeout(() => {
        navigation.navigate("Home");
      }, 5000);
    });
    return "";
  };

  return (
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
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {loading && <ActivityIndicator size="small" color="black" />}
          {message && (
            <Text style={{ color: message.color }}>{message.text}</Text>
          )}

          <TouchableOpacity style={styles.clearButton} onPress={handleSubmit}>
            <Text style={styles.clearText}>Remove Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
  clearButton: {
    marginTop: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 14,
    elevation: 3,
    width: 300,
  },
  clearText: {
    color: "white",
    fontSize: 18,
  },
});

export default RemoveDataForm;
