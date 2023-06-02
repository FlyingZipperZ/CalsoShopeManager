import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DatePicker from "react-native-modern-datepicker";

import Input from "./Input";
import ButtonForm from "../UI/Buttons/ButtonForm";
import { Dropdown } from "react-native-element-dropdown";
import { SalesContext } from "../../store/sales-context";
import { fetchSales } from "../../util/sales";

// TaskForm called and used to submit a new task to the AllTasks page

const TaskForm = ({ onCancel, onSubmit, defaultValues }) => {
  const salesCtx = useContext(SalesContext);

  const data = [];

  useEffect(() => {
    async function getSales() {
      setIsFetching(true);
      try {
        const sales = await fetchSales();
        salesCtx.setSale(sales);
      } catch (error) {
        setError("Unable to load Sales");
      }
      setIsFetching(false);
    }
    getSales();
  }, []);

  for (let content of salesCtx.sales) {
    data.push({ label: content.name, value: content.number });
  }

  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    status: {
      value: defaultValues ? defaultValues.status : "",
      isValid: true,
    },
    dueDate: {
      value: defaultValues ? defaultValues.dueDate : "",
      isValid: true,
    },
    sales: {
      value: defaultValues ? defaultValues.sales : "",
      isValid: true,
    },
    number: {
      value: defaultValues ? defaultValues.number : "",
      isValid: true,
    },
    notes: {
      value: defaultValues ? defaultValues.notes : "",
      isValid: true,
    },
    location: {
      value: defaultValues ? defaultValues.location : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const [date, setDate] = useState(inputs.dueDate.value);

  function getDate(date) {
    if (inputs.dueDate.value === date) {
      return date;
    } else if (date !== "") {
      const year = [date.split("/")[0]];
      const month = [date.split("/")[1]];
      const day = [date.split("/")[2]];
      return month + "/" + day + "/" + year;
    }
  }

  const [salePersonState, setSalePersonState] = useState(inputs.sales.value);
  const [saleNumberState, setSaleNumberState] = useState(inputs.number.value);

  function submitHandler() {
    const taskData = {
      name: inputs.name.value,
      status: inputs.status.value,
      dueDate: getDate(date),
      sales: salePersonState,
      number: saleNumberState,
      notes: inputs.notes.value,
      location: inputs.location.value,
    };

    const nameIsValid = taskData.name.trim().length > 0;
    const dateIsValid = taskData.dueDate.trim().length > 0;
    const locationIsValid = taskData.location.trim().length > 0;

    if (!nameIsValid || !dateIsValid || !locationIsValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          status: { value: curInputs.status.value, isValid: true },
          dueDate: { value: curInputs.dueDate.value, isValid: dateIsValid },
          sales: { value: taskData.sales, isValid: true },
          number: { value: taskData.number, isValid: true },
          notes: { value: curInputs.notes.value, isValid: true },
          location: {
            value: curInputs.location.value,
            isValid: locationIsValid,
          },
        };
      });
      return;
    }
    // pushes data back to parent
    onSubmit(taskData);
  }

  const formIsValid =
    !inputs.name.isValid ||
    !inputs.status.isValid ||
    !inputs.dueDate.isValid ||
    !inputs.sales.isValid ||
    !inputs.number.isValid ||
    !inputs.location.isValid;

  const [modalVisible, setModalVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Job Name"
        textInputConfig={{
          defaultValue: "",
          onChangeText: inputChangedHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              onSelectedChange={(date) => setDate(date)}
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
      <TextInput
        value={getDate(date)}
        style={styles.input}
        editable={false}
        onChangeText={inputChangedHandler.bind(this, "dueDate")}
      />
      <Input
        label="Address"
        textInputConfig={{
          defaultValue: "",
          onChangeText: inputChangedHandler.bind(this, "location"),
          value: inputs.location.value,
        }}
      />
      <View style={[styles.dropDownContainer, styles.taskItem]}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          labelField="label"
          valueField="value"
          value={saleNumberState}
          onChange={(item) => {
            setSalePersonState(item.label);
            setSaleNumberState(item.value);
          }}
        />
      </View>
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <ButtonForm
        leftLabel={"Cancel"}
        rightLabel={"Add"}
        submitHandler={submitHandler}
        cancelHandler={onCancel}
      />
    </ScrollView>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  errorText: {
    textAlign: "center",
    // color: GlobalStyles.colors.error500,
    margin: 8,
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
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  taskItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
  },
  dropDownContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
