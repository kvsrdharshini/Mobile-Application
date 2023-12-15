import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../HelperComponents/BackButton";
import More from "../More";
import AboutUs from "../AboutUs";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import ClearData from "../Authentication/ClearData";
import Profile from "../Profile";
import Settings from "../Settings";
import DeleteAccount from "../DeleteAccount";

const MoreNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="More Screen"
          component={More}
          options={{
            headerTitle: "More",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitle: "Sign Up",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "Login",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="About Us"
          component={AboutUs}
          options={{
            headerTitle: "About Us",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Clear Data"
          component={ClearData}
          options={{
            headerTitle: "Clear My Data",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: "Settings",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Profile",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{
            headerTitle: "Delete My Account",
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MoreNavigation;
