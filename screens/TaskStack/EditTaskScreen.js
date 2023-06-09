import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useLayoutEffect, useContext } from "react";

import TaskForm from "../../components/ManageTasks/TaskForm";
import { deleteTask, updateTask } from "../../util/tasks";
import { AuthContext } from "../../store/auth-context";
import { TaskContext } from "../../store/task-context";
import DeleteTaskIcon from "./DeleteTaskIcon";
import AllTasks from "./Complete";

const EditTaskScreen = ({ route, navigation }) => {
  const defaultValues = route.params.defaultValues;

  const [inputs, setInputs] = useState({
    id: {
      value: defaultValues ? defaultValues.id : "",
      isValid: true,
    },
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

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: ({ tintColor }) => (
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ color: tintColor, fontSize: 16 }}>Done</Text>
          </Pressable>
        ),
      },
      [navigation]
    );
  });

  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);

  async function deleteHandler() {
    try {
      await deleteTask(inputs.id.value);
      tasksCtx.deleteTask(inputs.id.value);
    } catch (error) {
      setError("Cannot delete try again later!");
    }
  }

  async function confirmHandler(taskData) {
    try {
      await updateTask(inputs.id.value, taskData, token);
      tasksCtx.updateTask(inputs.id.value, taskData);
      navigation.navigate(AllTasks);
    } catch (error) {
      setError("Could not save Data try again later");
    }
  }

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={confirmHandler}
        onCancel={() => navigation.goBack()}
        defaultValues={defaultValues}
      />
      <View style={styles.trash}>
        <DeleteTaskIcon
          icon="trash-bin"
          size={40}
          color={"#d43838"}
          onPress={deleteHandler}
          onDelete={AllTasks}
        />
      </View>
    </View>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  trash: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
});
