import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { TaskContext } from "../../store/task-context";
import { fetchTasks } from "../../util/tasks";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import TaskOutput from "../../components/TaskOutput/TaskOutput";

const Complete = ({ title }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const tasksCtx = useContext(TaskContext);

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

  //   if (error && !isFetching) {
  //     return <ErrorOverlay />;
  //   }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const status = [];
  status.push(tasksCtx.tasks.find((task) => task.status === "Installed"));

  return (
    <TaskOutput
      tasks={tasksCtx.tasks}
      fallBackText="No tasks"
      style={{ flex: 1 }}
    />
  );
};

export default Complete;

const styles = StyleSheet.create({});
