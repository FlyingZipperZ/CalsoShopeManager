import { StyleSheet, View, Text } from "react-native";
import TaskItem from "../../components/TaskList/TaskItem";
import { useContext, useState } from "react";

import { TaskContext } from "../../store/task-context";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { updateTask } from "../../util/tasks";

const CalendarOverviewScreen = ({ route, navigation }) => {
  const taskId = route.params?.taskId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const tasksCtx = useContext(TaskContext);

  const selectedTask = tasksCtx.tasks.find((task) => task.id === taskId);

  async function onUpdateHandler(taskData) {
    setIsSubmitting(true);
    try {
      tasksCtx.updateTask(taskId, taskData);
      console.log(taskData);
      await updateTask(taskId, taskData);
      navigation.goBack();
    } catch (error) {
      setError("Could not save update. Try again later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <TaskItem
        onUpdateHandler={onUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedTask}
      />
    </View>
  );
};

export default CalendarOverviewScreen;

const styles = StyleSheet.create({});
