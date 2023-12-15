import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import RemoveDataForm from "./RemoveDataForm";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import PopupMessage from "../HelperComponents/PopupMessage";

// This is the container that holds the clear data form.
// It also contains information about data deletion.
// It has been placed in Authentication as it is a high risk action.
const RemoveData = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <View style={styles.screen}>
      {/* Iphone users may have to close their keyboard to see the success message */}
      {showPopup && (
        <PopupMessage message="Data Deleted" setShowPopup={setShowPopup} />
      )}
      <Text style={styles.clearDataText}>
        Note: This action clears the logged poses that you have completed. It
        does not delete your account, to do that please see the "Delete My
        Account" section.
      </Text>
      <RemoveDataForm setShowPopup={setShowPopup} />
      <Text style={styles.warningTop}>
        Deleting your data is a permanent action.
      </Text>
      <Text style={styles.warning}>
        Once deleted, your data cannot be recovered.
      </Text>
      <Text style={styles.warning}>Please proceed with caution.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  warningTop: {
    marginTop: 16,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 16,
  },
  warning: {
    marginTop: 2,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 16,
  },
  clearDataText: {
    fontSize: 18,
    marginHorizontal: 16,
    marginTop: 25,
  },
});

export default RemoveData;
