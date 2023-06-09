import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { createOpenLink } from "react-native-open-maps";
import TaskCompleteTracker from "./TaskCompleteTracker";
import { Dropdown } from "react-native-element-dropdown";
import Input from "../../constants/Input";
import ButtonForm from "../ui/Buttons/ButtonForm";

const TaskItem = ({ onUpdateHandler, cancelHandler, defaultValues }) => {
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
    dateCreated: {
      value: defaultValues ? defaultValues.updateDate : "",
      isValid: true,
    },
    updateDate: {
      value: defaultValues ? defaultValues.updateDate : "",
      isValid: true,
    },
    userUpdate: {
      value: defaultValues ? defaultValues.userUpdate : "",
      isValid: true,
    },
  });

  const openMapGoogle = createOpenLink({
    provider: "google",
    end: inputs.location.value,
  });

  const [taskState, setTaskState] = useState(inputs.status.value);

  const data = [
    { label: "CNC", value: "CNC" },
    { label: "Drilled", value: "Drilled" },
    { label: "Edge Banded", value: "Edge Banded" },
    { label: "Cleaned", value: "Cleaned" },
    { label: "On Site", value: "On Site" },
    { label: "Installed", value: "Installed" },
  ];

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const taskData = {
      name: inputs.name.value,
      status: taskState,
      dueDate: inputs.dueDate.value,
      sales: inputs.sales.value,
      number: inputs.number.value,
      notes: inputs.notes.value,
      location: inputs.location.value,
      updateDate: dateCurrent,
      userUpdate: userCtx.user,
    };

    setInputs((curInputs) => {
      return {
        name: { value: curInputs.name.value, isValid: curInputs.name.isValid },
        status: {
          value: curInputs.status.value,
          isValid: curInputs.status.isValid,
        },
        dueDate: {
          value: curInputs.dueDate.value,
          isValid: curInputs.dueDate.isValid,
        },
        sales: {
          value: curInputs.sales.value,
          isValid: curInputs.sales.isValid,
        },
        number: {
          value: curInputs.number.value,
          isValid: curInputs.number.isValid,
        },
        location: {
          value: curInputs.location.value,
          isValid: curInputs.location.isValid,
        },
        notes: {
          value: curInputs.notes.value,
          isValid: curInputs.notes.isValid,
        },
        dateCreated: {
          value: curInputs.dateCreated.value,
          isValid: curInputs.dateCreated.isValid,
        },
        updateDate: {
          value: taskData.updateDate,
          isValid: curInputs.updateDate.isValid,
        },
        userUpdate: {
          value: taskData.userUpdate,
          isValid: curInputs.userUpdate.isValid,
        },
      };
    });

    onUpdateHandler(taskData);
  }

  return (
    <ScrollView>
      <View style={styles.taskItem}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Job name: {inputs.name.value}</Text>
          <Text style={styles.text}>Sales Person: {inputs.sales.value}</Text>
          <Text style={styles.text}>Number: {inputs.number.value}</Text>
          <Text style={styles.text}>Due Date: {inputs.dueDate.value}</Text>
          <Text style={styles.text}>Status: {taskState}</Text>
          <TaskCompleteTracker status={taskState} />
          <View style={styles.taskStatus}>
            <Button title={inputs.location.value} onPress={openMapGoogle} />
          </View>
        </View>
      </View>
      <Input
        label="Notes"
        textInputConfig={{
          value: inputs.notes.value,
          minHeight: 100,
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "notes"),
        }}
      />
      <View style={[styles.dropDownContainer, styles.taskItem]}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          labelField="label"
          placeholder="Select Option"
          value={taskState}
          onChange={(item) => {
            setTaskState(item.value);
          }}
        />
      </View>
      <ButtonForm
        leftLabel={"Cancel"}
        rightLabel={"Update"}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
      <View style={styles.updateText}>
        <Text>Last updated by: {inputs.userUpdate.value}</Text>
      </View>
    </ScrollView>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 6,
  },
  dropDownContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  taskStatus: {
    marginTop: 8,
  },
  updateText: {
    flex: 1,
    padding: 30,
    // justifyContent: "center",
    alignItems: "center",
  },
});
