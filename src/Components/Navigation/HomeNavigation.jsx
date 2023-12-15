import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../HelperComponents/BackButton";
import Home from "../Home";
import HomeScreenSearch from "../HomeScreenSearch";
import PoseDetails from "../PoseDetails";
import { getRandomPose } from "../../Services/PoseService";
import { useYogaDataContext } from "../../Providers/YogaDataProvider";
import Icon from "react-native-vector-icons/Ionicons";
import AllPoses from "../AllPoses";
import { getCurrentDay } from "../../Services/PoseService";

const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { yogaData } = useYogaDataContext();
  const [randomPose, setRandomPose] = useState({});
  const [currentDay, setCurrentDay] = useState(getCurrentDay());

  useEffect(() => {
    const pose = getRandomPose(yogaData);
    setRandomPose(pose);
  }, []);

  useEffect(() => {
    const updatePose = () => {
      const newDay = getCurrentDay();

      // If the day has changed, update the pose
      if (newDay !== currentDay) {
        setCurrentDay(newDay);
        setRandomPose(getRandomPose(yogaData));
      }
    };

    // Check and update the pose whenever the component mounts or the day changes
    updatePose();

    // Set up an interval to check and update the pose every minute (adjust as needed)
    const interval = setInterval(updatePose, 60000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentDay]);

  console.log(randomPose);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="108 YOGA ROAD"
          component={Home}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            headerRight: () => <HomeScreenSearch />,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Pose Details"
          component={PoseDetails}
          options={() => ({
            headerTitle: "",
            headerLeft: () => <BackButton />,
          })}
          initialParams={{
            pose: getRandomPose(yogaData),
          }}
        />
        <Stack.Screen
          name="All Poses"
          component={AllPoses}
          initialParams={{
            yogaPoses: [],
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F3EF",
    padding: 10,
  },
  flatListContent: {
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  searchButton: {
    marginRight: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default HomeNavigation;
