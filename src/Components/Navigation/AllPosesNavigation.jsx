import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../HelperComponents/BackButton";
import PoseDetails from "../PoseDetails";
import { useYogaDataContext } from "../../Providers/YogaDataProvider";
import AllPoses from "../AllPoses";
import yogaPoses, { getRandomPose } from "./../../Services/PoseService";

const AllPosesNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { yogaData } = useYogaDataContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="All Poses"
          component={AllPoses}
          initialParams={{
            yogaPoses: yogaPoses,
          }}
        />
        <Stack.Screen
          name="Individual Pose"
          component={PoseDetails}
          options={() => ({
            headerTitle: "",
            headerTransparent: false,
          })}
          initialParams={{
            pose: getRandomPose(yogaData),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AllPosesNavigation;
