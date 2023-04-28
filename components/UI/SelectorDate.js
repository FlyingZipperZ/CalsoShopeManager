import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";

const SelectorDate = ({ onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  onSelect(selectedDate);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <DatePicker
            mode="calendar"
            onSelectedChange={(date) => setSelectedDate(date)}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => [setModalVisible(!modalVisible)]}
          >
            <Text style={styles.textStyle}>Done</Text>
          </Pressable>
        </View>
      </Modal>
      <Text style={styles.label}>Due Date</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Select Date</Text>
      </Pressable>
    </View>
  );
};

export default SelectorDate;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
  modalView: {
    marginVertical: 200,
    marginHorizontal: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#e3e3e3",
    borderColor: "black",
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});
