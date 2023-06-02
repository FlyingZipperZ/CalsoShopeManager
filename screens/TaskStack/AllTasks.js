import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { TaskContext } from "../../store/task-context";
import { fetchTasks } from "../../util/https";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import TaskOutput from "../../components/TaskOutput/TaskOutput";

const AllTasks = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const tasksCtx = useContext(TaskContext);

  useEffect(() => {
    async function getTasks() {
      setIsFetching(true);
      try {
        const tasks = await fetchTasks();
        tasksCtx.setTask(tasks);
      } catch (error) {
        setError("Unable to load tasks");
      }
      setIsFetching(false);
    }

    getTasks();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <TaskOutput
      tasks={tasksCtx.tasks}
      fallBackText="No tasks"
      style={{ flex: 1 }}
    />
  );
};

export default AllTasks;

const styles = StyleSheet.create({});
