import { createContext, useContext, useState, useEffect } from "react";
import { useAppConfig } from "../Config/AppConfig";

// This is used by the whole app to retrieve yoga poses
// Knowledge of React Contexts and React Providers are requried to
// understand this section.
const YogaDataContext = createContext();

export const useYogaDataContext = () => {
  return useContext(YogaDataContext);
};

export const YogaDataProvider = ({ children }) => {
  const { appConfig } = useAppConfig();
  const [yogaData, setYogaData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(appConfig.apiURL + appConfig.getAllPoses);
        if (response.ok) {
          const data = await response.json();
          setYogaData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    yogaData,
    error,
  };

  return (
    <YogaDataContext.Provider value={contextValue}>
      {children}
    </YogaDataContext.Provider>
  );
};
