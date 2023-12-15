// This function holds local methods for accessing the yoga data in
// specific ways, i.e. selecting a random pose, sorting the poses etc.

function getCurrentDay() {
  const today = new Date();
  return today.getDate(); // Get the current date of the month
}

function getRandomPose(yogaData) {
  if (!yogaData) {
    return [];
  }

  const randomIndex = Math.floor(Math.random() * yogaData.length);
  return yogaData[randomIndex];
}

// Method to get poses by multiple criteria
const getPosesByCriteria = (criteria, yogaData) => {
  if (!yogaData) {
    return [];
  }

  return yogaData.filter((pose) => {
    for (const key in criteria) {
      const selectedValues = criteria[key]; // Get the selected values for the current key
      if (!selectedValues.includes(pose[key])) {
        return false; // If pose[key] is not in the selected values, filter it out
      }
    }
    return true; // If all criteria match, keep the pose
  });
};

export { getPosesByCriteria, getRandomPose, getCurrentDay };
