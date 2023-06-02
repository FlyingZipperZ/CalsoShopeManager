import { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { createOpenLink } from "react-native-open-maps";
import TaskCompleteTracker from "./TaskCompleteTracker";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import call from "react-native-phone-call";

import { fetchTasks } from "../../util/https";
import Input from "../ManageTasks/Input";
import ButtonForm from "../ui/Buttons/ButtonForm";

const TaskItem = ({ onUpdateHandler, cancelHandler, defaultValues }) => {
  const createThreeButtonAlert = () =>
    Alert.alert("Select a Map", "Pick a map to use", [
      { text: "Apple Map", onPress: openMapApple },
      { text: "Google Map", onPress: openMapGoogle },
      { text: "Cancel", style: "cancel" },
    ]);

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

  const openMapApple = createOpenLink({
    provider: "apple",
    end: inputs.location.value,
  });

  const openMapGoogle = createOpenLink({
    provider: "google",
    end: inputs.location.value,
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const navigation = useNavigation();

  function onEdit() {
    navigation.navigate("EditTaskScreen", {
      defaultValues: defaultValues,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: ({ tintColor }) => (
          <Pressable onPress={onEdit}>
            <Text style={{ color: tintColor, fontSize: 16 }}>Edit</Text>
          </Pressable>
        ),
      },
      [navigation]
    );
  });

  async function submitHandler() {
    const taskData = {
      name: inputs.name.value,
      status: taskState,
      dueDate: inputs.dueDate.value,
      sales: inputs.sales.value,
      number: inputs.number.value,
      location: inputs.location.value,
      notes: inputs.notes.value,
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
          isValid: curInputs.dueDate.isValid,
        },
        number: {
          value: curInputs.sales.value,
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
      };
    });

    onUpdateHandler(taskData);
  }

  const [taskState, setTaskState] = useState(inputs.status.value);
  const [newTaskState, setNewTaskState] = useState(inputs.sales.value);

  const data = [
    { label: "CNC", value: "CNC" },
    { label: "Drilled", value: "Drilled" },
    { label: "Edge Banded", value: "Edge Banded" },
    { label: "Cleaned", value: "Cleaned" },
    { label: "On Site", value: "On Site" },
    { label: "Installed", value: "Installed" },
  ];

  function callHandler() {
    let phoneCall = inputs.number.value.replace("(", "");
    phoneCall = phoneCall.replace(")", "");
    phoneCall = phoneCall.replace(" ", "");
    phoneCall = phoneCall.replace("-", "");

    console.log(phoneCall);

    // Check for perfect 10 digit length
    if (phoneCall.length != 10) {
      alert("Please insert correct contact number");
      return;
    }

    const args = {
      number: phoneCall,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  }

  return (
    <ScrollView>
      <View style={styles.taskItem}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Job name: {inputs.name.value}</Text>
          <Text style={styles.text}>Sales Person: {inputs.sales.value}</Text>
          <View>
            <Button title={inputs.number.value} onPress={callHandler} />
          </View>
          <Text style={styles.text}>Due Date: {inputs.dueDate.value}</Text>
          <Text style={styles.text}>Status: {taskState}</Text>
          <TaskCompleteTracker status={taskState} />
          <Button
            title={inputs.location.value}
            onPress={createThreeButtonAlert}
          />
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
          valueField="value"
          value={newTaskState}
          onChange={(item) => {
            setNewTaskState(item.label);
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
    </ScrollView>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  textInput: {
    padding: 10,
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
