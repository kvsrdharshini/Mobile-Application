import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useAppConfig } from "../../Config/AppConfig";
import { brandColors } from "../../Theme/BrandColors";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { updatePrizes } from "../../Services/LogService";

// This component holds the top half of the milestones page.
// It shows the progress as well as the redeem buttons.
const ProgressBar = ({ handleShowConfetti }) => {
  const { loggedYogaData, appConfig, appendToPrizes } = useAppConfig();

  const totalPoses = 50;
  const completedPoses = loggedYogaData.length;
  const progress = (completedPoses / totalPoses) * 100;

  const milestones = [5, 10, 20, 40, 50];

  // Find the next milestone that's greater than or equal to the current progress
  const nextMilestone = milestones.find(
    (milestone) => milestone > completedPoses
  );

  const onClaim = async (prize) => {
    appendToPrizes(prize);
    handleShowConfetti();
    await updatePrizes(appConfig.user.email, `prize${prize}`, appConfig);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.progressText}
      >{`${completedPoses} / ${totalPoses}`}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <View style={styles.checkmarks}>
        {milestones.map((milestone, index) => (
          <>
            <View style={styles.starContainer}>
              {completedPoses >= milestone ? (
                <>
                  <Star number={milestone} color={brandColors.primary} />

                  {appConfig.user.prizes &&
                    !appConfig.user.prizes.includes(milestone) && (
                      <TouchableOpacity onPress={() => onClaim(milestone)}>
                        <Text style={styles.claim}>
                          Redeem {"\n"}Prize {index + 1}
                        </Text>
                      </TouchableOpacity>
                    )}
                </>
              ) : (
                <>
                  <Star number={milestone} color={"gray"} />
                </>
              )}
            </View>
          </>
        ))}
      </View>
      <Text style={styles.nextMilestoneText}>
        {nextMilestone
          ? `Next Milestone: ${nextMilestone}`
          : "All milestones achieved!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "lightgray",
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: brandColors.primary,
  },
  checkmarks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  nextMilestoneText: {
    marginTop: 8,
  },
  starContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  claim: {
    fontSize: 10,
    padding: 7,
    backgroundColor: brandColors.red,
    color: "white",
    borderRadius: 8,
    margin: 2,
    textAlign: "center",
  },
});

const Star = ({ number, color }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    number: {
      fontSize: 12,
      marginTop: "35%",
      position: "absolute",
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <MaterialCommunityIcon name="star" size={50} color={color} />
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

export default ProgressBar;
