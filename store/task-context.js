import { createContext, useReducer } from "react";

export const TaskContext = createContext({
  tasks: [],
  addTask: ({ name, status, dueDate, sales, number, notes, location }) => {},
  setTask: (tasks) => {},
  deleteTask: (id) => {},
  updateTask: (
    id,
    { name, status, dueDate, sales, number, notes, location }
  ) => {},
});

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updatableTaskIndex] = updatedItem;
      return updatedTasks;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TaskContextProvider({ children }) {
  const [taskState, dispatch] = useReducer(taskReducer, []);

  function addTask(taskData) {
    dispatch({ type: "ADD", payload: taskData });
  }

  function setTask(tasks) {
    dispatch({ type: "SET", payload: tasks });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  const value = {
    tasks: taskState,
    addTask: addTask,
    setTask: setTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
