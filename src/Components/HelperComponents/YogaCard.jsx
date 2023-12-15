import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { YogaImage } from "../../Services/ImageService";
import { useAppConfig } from "../../Config/AppConfig";
import Icon from "react-native-vector-icons/Ionicons";

// Used by the All Poses page to display an overall card view of
// a specified poses
const YogaCard = ({ navigation, item }) => {
  const { title, sanskritName, difficulty, image, _id } = item;
  const { colors, loggedYogaData } = useAppConfig();
  const [isLogged, setIsLogged] = useState(loggedYogaData.includes(_id));
  const { appConfig } = useAppConfig();

  const { width } = Dimensions.get("window");
  const styles = StyleSheet.create({
    card: {
      flexDirection: "column",
      backgroundColor: colors.light,
      margin: 5,
      padding: 0,
      borderRadius: 8,
      width: (width - 40) / 2,
      minHeight: 200,
      justifyContent: "flex-start",
      alignItems: "stretch",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
    },
    cardTopHalf: {
      flex: 0.9,
      backgroundColor: colors.secondary,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    cardBottomHalf: {
      flex: 0.1,
      justifyContent: "flex-start",
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      justifyContent: "flex-start",
    },
    bodyText: {
      color: colors.grey,
      fontStyle: "italic",
    },
    sectionText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.light,
    },
    image: {
      minWidth: "100%",
      height: "100%",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    difficultyText: {
      position: "absolute",
      bottom: 5,
      right: 10,
      fontSize: 12,
      color: isLogged ? colors.yellow : colors.grey,
    },
    difficultyTextEmpty: {
      color: isLogged ? colors.lightRed : colors.secondary,
    },
    checkmarkIcon: {
      position: "absolute",
      top: 0,
      right: 0,
      color: colors.red,
    },
  });

  const handleCardPress = (pose) => {
    navigation.navigate("Individual Pose", { pose });
  };

  const difficultyIndicator = (difficulty) => {
    const lowerCaseDifficulty = difficulty.toLowerCase();
    if (lowerCaseDifficulty === "beginner") {
      return (
        <>
          ●<Text style={styles.difficultyTextEmpty}>●●</Text>
        </>
      );
    } else if (lowerCaseDifficulty === "intermediate") {
      return (
        <>
          ●●<Text style={styles.difficultyTextEmpty}>●</Text>
        </>
      );
    } else if (lowerCaseDifficulty === "advanced") {
      return "●●●";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setIsLogged(loggedYogaData.includes(_id));
  }, [loggedYogaData, _id]);

  return (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View style={styles.cardTopHalf}>
        <YogaImage image={image} style={styles.image} />
        {isLogged && (
          <Icon
            name="checkmark-circle"
            style={styles.checkmarkIcon}
            size={30}
          />
        )}
      </View>
      <View
        style={[
          styles.cardBottomHalf,
          { backgroundColor: isLogged ? colors.red : colors.primary },
        ]}
      >
        <Text style={styles.sectionText}>{title}</Text>
        <Text style={styles.bodyText}>{sanskritName}</Text>
        <Text style={styles.difficultyText}>
          {difficultyIndicator(difficulty)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default YogaCard;
