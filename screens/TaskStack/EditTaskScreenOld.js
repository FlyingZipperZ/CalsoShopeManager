import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { useState, useLayoutEffect, useContext } from "react";

import TaskForm from "../../components/ManageTasks/TaskForm";
import { deleteTask, updateTask } from "../../util/tasks";
import { TaskContext } from "../../store/task-context";
import DeleteTaskIcon from "./DeleteTaskIcon";

const EditTaskScreen = ({ defaultValues, setModel }) => {
  // const defaultValues = route.params.defaultValues;
  console.log("OnEdit?");
  console.log(setModel);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const tasksCtx = useContext(TaskContext);

  async function deleteHandler() {
    setIsSubmitting(true);
    try {
      await deleteTask(inputs.id.value);
      tasksCtx.deleteTask(inputs.id.value);
    } catch (error) {
      setError("Cannot delete try again later!");
    }
    setIsSubmitting(false);
  }

  async function confirmHandler(taskData) {
    setIsSubmitting(true);
    console.log("confirmHandler: ");
    console.log(taskData);
    // try {
    //   await updateTask(inputs.id.value, taskData);
    //   tasksCtx.updateTask(inputs.id.value, taskData);
    // } catch (error) {
    //   setError("Could not save Data try again later");
    //   setIsSubmitting(false);
    // }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function onDone() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: ({ tintColor }) => (
          <Pressable onPress={onDone}>
            <Text style={{ color: tintColor, fontSize: 16 }}>Done</Text>
          </Pressable>
        ),
      },
      [navigation]
    );
  });

  return (
    <Modal style={styles.container}>
      <TaskForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={defaultValues}
      />
      <View style={styles.trash}>
        <DeleteTaskIcon
          icon="trash-bin"
          size={40}
          color={"#d43838"}
          onPress={deleteHandler}
        />
      </View>
    </Modal>
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
});
