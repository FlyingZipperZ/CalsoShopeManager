import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState, useContext } from "react";

import TaskForm from "../../components/ManageTasks/TaskForm";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { storeTask, deleteTask } from "../../util/https";
import { TaskContext } from "../../store/task-context";

const AddTaskScreen = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const taskCtx = useContext(TaskContext);

  const editedTaskId = route.params?.taskId;

  const selectedTask = taskCtx.tasks.find((tasks) => tasks.id === editedTaskId);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(taskData) {
    setIsSubmitting(true);
    try {
      const id = await storeTask(taskData);
      taskCtx.addTask({ ...taskData, id: id });
      navigation.goBack();
    } catch (error) {
      setError("Could not save Data try again later");
      setIsSubmitting(false);
    }
  }

  if (error && isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <TaskForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedTask}
      />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({});
