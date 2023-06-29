import { createContext, useReducer } from "react";

export const TimeOffContext = createContext({
  timeOff: [],
  addTimeOff: ({ user, reason, date }) => {},
  setTimeOff: (timeOff) => {},
  deleteTimeOff: () => {},
  updateTimeOff: () => {},
});

function timeOffReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableTimeOffIndex = state.findIndex(
        (timeOff) => timeOff.id === action.payload.id
      );
      const updatableTimeOff = state[updatableTimeOffIndex];
      const updatedItem = { ...updatableTimeOff, ...action.payload.data };
      const updatedTimeOffs = [...state];
      updatedTimeOffs[updatableTimeOffIndex] = updatedItem;
      return updatedTimeOffs;
    case "DELETE":
      return state.filter((timeOff) => timeOff.id !== action.payload);
    default:
      return state;
  }
}

function TimeOffContextProvider({ children }) {
  const [timeOffState, dispatch] = useReducer(timeOffReducer, []);

  function addTimeOff(timeOffData) {
    dispatch({ type: "ADD", payload: timeOffData });
  }

  function setTimeOff(timeOff) {
    dispatch({ type: "SET", payload: timeOff });
  }

  function deleteTimeOff(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTimeOff(id, timeOffData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: timeOffData } });
  }

  const value = {
    timeOff: timeOffState,
    addTimeOff: addTimeOff,
    setTimeOff: setTimeOff,
    deleteTimeOff: deleteTimeOff,
    updateTimeOff: updateTimeOff,
  };

  return (
    <TimeOffContext.Provider value={value}>{children}</TimeOffContext.Provider>
  );
}
export default TimeOffContextProvider;
