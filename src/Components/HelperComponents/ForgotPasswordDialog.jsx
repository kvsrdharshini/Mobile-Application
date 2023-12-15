import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

// Component for the forgot password modal box
const ForgotPasswordDialog = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            To reset your password, please contact the admin at this email
            address:
          </Text>
          <Text style={styles.emailText}>hello@108yogaroad.com</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "10%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 36,
    paddingBottom: 10,
    paddingHorizontal: 28,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
  },
  emailText: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ForgotPasswordDialog;
