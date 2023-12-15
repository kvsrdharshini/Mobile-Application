import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// This is more of an informational page,
// It contains the LinkedIn pages of the developers and
// an about us section about the company.
const AboutUs = () => {
  const developers = [
    {
      name: "Aditya Vadgama",
      linkedIn: "https://www.linkedin.com/in/aditya-v871ab/",
    },
    {
      name: "Gayan Wijesuriya",
      linkedIn: "https://www.linkedin.com/in/gayan-wijesuriya-2002/",
    },
    {
      name: "Harshita Kumar",
      linkedIn: "https://www.linkedin.com/in/harshita-kumar-05/",
    },
    {
      name: "Siva Dharshini Ramaiyan",
      linkedIn:
        "https://www.linkedin.com/in/siva-dharshini-ramaiyan-99834a179/",
    },
    {
      name: "Shaopeng Liu",
      linkedIn: "https://www.linkedin.com/in/shaopeng-liu-85a8a3292/",
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator>
        <Text style={styles.heading}>108 Yoga Road</Text>

        <Text style={styles.aboutUs}>
          Introducing 100 Days of Yoga, your daily dose of yoga. Learn yoga
          step-by-step with a new, carefully curated pose available each day.
          Immerse yourself in the practice of yoga, one posture at a time
          building up your strength, flexibility and confidence.
        </Text>

        <Text style={styles.designedHeading}>
          Designed by: Australian yoga teacher Jen Paynter founder of 108 Yoga
          Road to help you get the benefits of yoga without the stress.
        </Text>

        <View style={styles.creditsContainer}>
          <Text style={styles.creditsHeading}>Built by:</Text>

          {developers.map((dev) => {
            return (
              <TouchableOpacity
                key={dev.name}
                onPress={() => Linking.openURL(dev.linkedIn)}
                style={styles.developerSection}
              >
                <Text style={styles.developer}>{dev.name}</Text>
                <Icon name="logo-linkedin" color={"black"} size={24} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 30,
  },
  aboutUs: {
    fontSize: 20,
    textAlign: "justify",
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  creditsContainer: {
    width: "flex",
    paddingHorizontal: 30,
  },
  designedHeading: {
    fontSize: 20,
    textAlign: "justify",
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  creditsHeading: {
    fontSize: 22,
    // fontWeight: "bold",
    marginBottom: 12,
  },
  developerSection: {
    width: "flex",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingRight: 26,
  },
  developer: {
    fontSize: 18,
    // fontFamily: "ChalkboardSE-Regular",
  },
});

export default AboutUs;
