import { StyleSheet, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../../store/task-context";

import TaskTile from "../../components/TaskTile";
import { fetchTasks } from "../../util/https";
import ErrorOverlay from "../../components/ui/ErrorOverlay";

const TaskListOverView = ({ tasks }) => {
  const navigation = useNavigation();
  function renderTaskItem(itemData) {
    function pressHandler() {
      navigation.navigate("TaskOverviewScreen", {
        taskId: itemData.item.id,
      });
    }

    return (
      <TaskTile
        name={itemData.item.name}
        status={itemData.item.status}
        dueDate={itemData.item.dueDate}
        onPress={pressHandler}
      />
    );
  }

  const tasksCtx = useContext(TaskContext);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  // if (error && !refreshing) {
  //   return <ErrorOverlay />;
  // }

  console.log(tasks);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTaskItem}
      refreshing={refreshing}
      onRefresh={() => {
        async function getTasks() {
          setRefreshing(true);
          try {
            const tasks = await fetchTasks();
            tasksCtx.setTask(tasks);
          } catch (error) {
            setError("Unable to refresh tasks");
          }
          setRefreshing(false);
        }

        getTasks();
      }}
      style={{ flex: 1 }}
    />
  );
};

export default TaskListOverView;

const styles = StyleSheet.create({});
