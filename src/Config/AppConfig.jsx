import React, { createContext, useContext, useEffect, useState } from "react";
import { brandColors } from "../Theme/BrandColors";
import { API_BASE_URL, TEST_BASE_URL, NULL_USER } from "./Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoggedPoses } from "../Services/LogService";

const AppConfigContext = createContext();

export const useAppConfig = () => {
  return useContext(AppConfigContext);
};
//This is the overall app config. Variables here can
//be accessed by direct descendants, which includes all
//jsx files except for the services.
export const AppConfigProvider = ({ children }) => {
  //Checks to see if any user is logged in.
  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const user = JSON.parse(storedUser);
        if (storedUser) {
          updateConfig(user);
        }
        if (!user || (user && user.prizes === null)) {
          updatePrizes([]);
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    }

    loadUserFromStorage();
  }, []);

  //app config contains a state variable that includes
  //urls and user information. It can change based on the user's
  //logged in status.
  const [appConfig, setAppConfig] = useState({
    apiURL: API_BASE_URL,
    auth_apiURL: TEST_BASE_URL,
    getAllPoses: "/Items",
    login: "/Login",
    register: "/Register",
    logPose: "/LogPose",
    getLoggedPoses: "/CompletedPoses",
    deleteData: "/deleteUser",
    updatePrizes: "/prize",
    ...NULL_USER,
  });

  //This function is used to update the app config as
  //the state is out of scope.
  const updateConfig = (newConfig) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));

    //This stores the user or lack thereof in local storage
    //so that the app can access it after closing and reopening.
    _storeData = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(newConfig));
      } catch (error) {
        // Error saving data
      }
    };

    _storeData();
  };

  const updatePrizes = (prizeList) => {
    appConfig.user.prizes = prizeList;
  };

  const appendToPrizes = (prize) => {
    appConfig.user.prizes += prize;
  };
  //Brand colors is under the Theme folder and it includes named
  //variables for the hex codes provide in the clients branding.
  const colors = brandColors;

  const [loggedYogaData, setLoggedYogaData] = useState([]);

  //logged poses
  const updateLog = async () => {
    if (appConfig.user.isLoggedIn) {
      const loggedData = await getLoggedPoses(
        appConfig.user.email,
        appConfig,
        updatePrizes
      );
      setLoggedYogaData(loggedData);
    } else {
      setLoggedYogaData([]);
    }
  };

  const clearLog = () => {
    setLoggedYogaData([]);
  };

  return (
    <AppConfigContext.Provider
      value={{
        appConfig,
        updateConfig,
        colors,
        NULL_USER,
        updateLog,
        loggedYogaData,
        clearLog,
        appendToPrizes,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};
