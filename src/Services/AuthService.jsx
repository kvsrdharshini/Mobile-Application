import axios from "axios";
import { handleResponse, headers } from "./Common";

// This service holds all Axios HTTP requests that modify/authenticate accounts.

export const register = async (values, appConfig) => {
  const { email, password, username } = values;
  const { auth_apiURL, register } = appConfig;

  try {
    const response = await axios.post(
      auth_apiURL + register,
      {
        email,
        password,
        username,
      },
      { headers }
    );
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const login = async (values, appConfig) => {
  const { email, password } = values;
  const { auth_apiURL, login } = appConfig;

  try {
    const response = await axios.post(
      auth_apiURL + login,
      {
        email,
        password,
      },
      { headers }
    );

    const data = handleResponse(response);
    return {
      user: {
        isLoggedIn: true,
        email: email,
        name: data.details.info.name.first,
        prizes: [],
      },
    };
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (values, appConfig) => {
  const { email, password } = values;
  const { auth_apiURL, deleteData } = appConfig;

  try {
    const response = await axios.post(
      auth_apiURL + deleteData,
      {
        email,
        password,
      },
      { headers }
    );

    const data = handleResponse(response);
    return data.message;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error.message;
      console.log("Error Message:", errorMessage);
      return errorMessage;
    } else {
      console.error("Error:", error);
      return "An error occurred.";
    }
  }
};
