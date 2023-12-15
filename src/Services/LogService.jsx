import axios from "axios";
import { handleResponse, headers } from "./Common";

// Axios HTTP calls that handle milestones/pose logging.

export const logPose = async (values, appConfig) => {
  const { email, pose, id } = values;
  const { auth_apiURL, logPose } = appConfig; //auth url is the same, it points to the test site

  try {
    const response = await axios.post(
      auth_apiURL + logPose,
      {
        email,
        pose,
        id,
      },
      { headers }
    );
    return response.config.data;
  } catch (error) {
    throw error;
  }
};

export const getLoggedPoses = async (email, appConfig, updatePrizes) => {
  const { auth_apiURL, getLoggedPoses } = appConfig; //auth url is the same, it points to the test site

  try {
    const response = await axios.post(
      auth_apiURL + getLoggedPoses,
      {
        email,
      },
      { headers }
    );
    addPrizes(response.data.completedPoses[0], updatePrizes);
    return response.data.completedPoses[0].poses.map((item) => item.id);
  } catch (error) {
    throw error;
  }
};

export const updatePrizes = async (email, prize, appConfig) => {
  const { auth_apiURL, updatePrizes } = appConfig;

  try {
    const response = await axios.post(
      auth_apiURL + updatePrizes,
      {
        email,
        prize,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

// Prize array is used to track which of the prize buttons are claimable.
// ex. prizeArray = [10, 20] means that the buttons for 10 and 20 poses are
// claimable and that the 5 pose prize has been claimed.
const addPrizes = (data, updatePrizes) => {
  const prizeArray = [];

  if (data.prize5) {
    prizeArray.push(5);
  }
  if (data.prize10) {
    prizeArray.push(10);
  }
  if (data.prize20) {
    prizeArray.push(20);
  }
  if (data.prize40) {
    prizeArray.push(40);
  }
  if (data.prize50) {
    prizeArray.push(50);
  }

  updatePrizes(prizeArray);
};
