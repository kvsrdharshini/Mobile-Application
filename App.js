import React, { useEffect } from "react";
import { StyleSheet, Platform, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import yogaPoses from "./src/Services/PoseService";
import * as Font from "expo-font";
import HomeNavigation from "./src/Components/Navigation/HomeNavigation";
import { YogaDataProvider } from "./src/Providers/YogaDataProvider";
import { AppConfigProvider, useAppConfig } from "./src/Config/AppConfig";
import AllPosesNavigation from "./src/Components/Navigation/AllPosesNavigation";
import MoreNavigation from "./src/Components/Navigation/MoreNavigation";
import CompletedPoses from "./src/Components/CompletedPoses";

const Tab = createBottomTabNavigator();

const App = () => {
  // Dynamically load font files
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "BarlowCondensed-ExtraBold": require("./assets/fonts/BarlowCondensed-ExtraBold.ttf"),
      });
    };

    loadFonts();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppConfigProvider>
          <YogaDataProvider>
            {/* Navigation bar with respective screens and components */}
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#77D1BF",
                tabBarLabelStyle: {
                  textTransform: "uppercase",
                },
                tabBarStyle: {
                  height: Platform.OS === "android" ? 60 : 90,
                  backgroundColor: "black",
                  shadowOpacity: 0.75,
                  shadowOffset: { height: 0, width: 0 },
                },
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeNavigation}
                options={{
                  title: "",
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" color={color} size={size} />
                  ),
                }}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "108 YOGA ROAD" }],
                    });
                  },
                })}
              />
              <Tab.Screen
                name="Poses Navigation"
                component={AllPosesNavigation}
                options={{
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={require("./assets/Logo.png")}
                      style={{
                        width: 48,
                        height: 48,
                        tintColor: color,
                        marginTop: 2,
                      }}
                    />
                  ),
                }}
                initialParams={{
                  yogaPoses: yogaPoses,
                }}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "All Poses" }],
                    });
                  },
                })}
              />
              <Tab.Screen
                name="Completed"
                component={CompletedPoses}
                options={{
                  headerShown: true,
                  headerTitle: "Completed Poses",
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcon
                      name="bookmark-check-outline"
                      color={color}
                      size={28}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="More"
                component={MoreNavigation}
                options={{
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="menu" color={color} size={32} />
                  ),
                }}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    navigation.reset({
                      index: 0, // Go back to the first screen (base screen)
                      routes: [{ name: "More Screen" }],
                    });
                  },
                })}
              />
            </Tab.Navigator>
          </YogaDataProvider>
        </AppConfigProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F4F3EF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
