import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { TaskContext } from "../../store/task-context";
import { fetchTasks } from "../../util/https";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import TaskOutput from "../../components/TaskOutput/TaskOutput";
import { AuthContext } from "../../store/auth-context";

const InProgress = ({ title }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getTasks() {
      setIsFetching(true);
      try {
        const tasks = await fetchTasks(authCtx.token);
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

  const status = [];
  status.push(tasksCtx.tasks.find((task) => task.status !== "Installed"));

  return (
    <TaskOutput
      tasks={tasksCtx.tasks}
      fallBackText="No tasks"
      style={{ flex: 1 }}
    />
  );
};

export default InProgress;

const styles = StyleSheet.create({});
