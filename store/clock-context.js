import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer, useState } from "react";

export const ClockContext = createContext({
  clockIn: [],
  clockOut: [],
  addClock: (user, clockInDate, clockInTime, clockOutDate, clockOutTime) => {},
  setClock: (clocks) => {},
  deleteClock: (id) => {},
  updateClock: (
    id,
    { user, clockInDate, clockInTime, clockOutDate, clockOutTime }
  ) => {},
  clockInHandler: (clockId) => {},
  clockOutHandler: () => {},
});

function clockReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableClockIndex = state.findIndex(
        (clock) => clock.id === action.payload.id
      );
      const updatableClock = state[updatableClockIndex];
      const updatedItem = { ...updatableClock, ...action.payload.data };
      const updatedClocks = [...state];
      updatedClocks[updatableClockIndex] = updatedItem;
      return updatedClocks;
    case "DELETE":
      return state.filter((Clock) => Clock.id !== action.payload);
    default:
      return state;
  }
}

function ClockContextProvider({ children }) {
  // const [id, setId] = useState();
  const [clockStateIn, dispatch] = useReducer(clockReducer, []);

  function addClock(clockData) {
    dispatch({ type: "ADD", payload: clockData });
  }

  function setClock(clocks) {
    dispatch({ type: "SET", payload: clocks });
  }

  function deleteClock(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateClock(id, clockData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: clockData } });
  }

  function clockInHandler(clockId) {
    // setId(clockId);
    AsyncStorage.setItem("clockId", clockId);
  }

  function clockOutHandler() {
    // setId(null);
    AsyncStorage.removeItem("clockId");
  }

  const value = {
    clockin: clockStateIn,
    addClock: addClock,
    setClock: setClock,
    deleteClock: deleteClock,
    updateClock: updateClock,
    clockInHandler: clockInHandler,
    clockOutHandler: clockOutHandler,
  };
  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
}

export default ClockContextProvider;
