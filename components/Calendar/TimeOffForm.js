import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useContext, useState } from "react";
import DatePicker from "react-native-modern-datepicker";

import Input from "../../constants/Input";
import { currentDate } from "../Date";
import { UserContext } from "../../store/user-context";
import ButtonForm from "../ui/Buttons/ButtonForm";
import LoadingOverlay from "../ui/LoadingOverlay";
import { storeTimeOff } from "../../util/timeoff";
import { AuthContext } from "../../store/auth-context";
import { TimeOffContext } from "../../store/timeoff-context";

const TimeOffForm = ({ onCancel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateStart, setDateStart] = useState(currentDate());
  const [dateEnd, setDateEnd] = useState(currentDate());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const timeOffCtx = useContext(TimeOffContext);

  const [inputs, setInputs] = useState({
    user: { value: userCtx.user, isValid: true },
    reason: { value: "", isValid: true },
    dateStart: { value: "", isValid: true },
    dateEnd: { value: "", isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function getDate(date) {
    if (currentDate() === date) {
      //   return date;
    } else if (date !== "") {
      const year = [date.split("/")[0]];
      const month = [date.split("/")[1]];
      const day = [date.split("/")[2]];
      return month + "/" + day + "/" + year;
    }
  }

  const timeOffData = {
    user: inputs.user.value,
    reason: inputs.reason.value,
    dateStart: inputs.dateStart.value,
    dateEnd: inputs.dateEnd.value,
  };

  async function submitHandler() {
    setIsSubmitting(true);
    try {
      const id = await storeTimeOff(timeOffData, authCtx.token);
      timeOffCtx.addTimeOff({ ...timeOffData, id: id });
      onCancel();
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  console.log(dateStart);
  console.log(dateEnd);

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Input
        label="Reason"
        textInputConfig={{
          defaultValue: "",
          onChangeText: inputChangedHandler.bind(this, "reason"),
          value: inputs.reason.value,
        }}
      />
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              onSelectedChange={(date) => setDateStart(date)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => [setModalVisible(!modalVisible)]}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </Modal>
        <Text style={styles.label}>Start Date</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Select Date</Text>
        </Pressable>
      </View>
      <TextInput
        value={getDate(dateStart)}
        style={styles.input}
        editable={false}
        onChangeText={inputChangedHandler.bind(this, "dateStart")}
      />

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              onSelectedChange={(date) => setDateEnd(date)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => [setModalVisible(!modalVisible)]}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </Modal>
        <Text style={styles.label}>End Date</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Select Date</Text>
        </Pressable>
      </View>
      <TextInput
        value={getDate(dateEnd)}
        style={styles.input}
        editable={false}
        onChangeText={inputChangedHandler.bind(this, "dateEnd")}
      />

      <ButtonForm
        leftLabel="Cancel"
        rightLabel="Accept"
        cancelHandler={onCancel}
        submitHandler={submitHandler}
      />
    </View>
  );
};

export default TimeOffForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
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
  buttonOpen: {
    backgroundColor: "#2437e0",
    borderRadius: 5,
    padding: 8,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    margin: 20,
    backgroundColor: "#e3e3e3",
    borderColor: "black",
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    minHeight: 35,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
});
