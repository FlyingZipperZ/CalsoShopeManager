import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";

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
  const [clockStateIn, dispatchIn] = useReducer(clockReducer, []);
  const [clockStateOut, dispatchOut] = useReducer(clockReducer, []);

  function addClockIn(clockData) {
    dispatchIn({ type: "ADD", payload: clockData });
  }

  function setClockIn(clocks) {
    dispatchIn({ type: "SET", payload: clocks });
  }

  function deleteClockIn(id) {
    dispatchIn({ type: "DELETE", payload: id });
  }

  function updateClockIn(id, clockData) {
    dispatchIn({ type: "UPDATE", payload: { id: id, data: clockData } });
  }

  function addClockOut(clockData) {
    dispatchOut({ type: "ADD", payload: clockData });
  }

  function setClockOut(clocks) {
    dispatchOut({ type: "SET", payload: clocks });
  }

  function deleteClockOut(id) {
    dispatchOut({ type: "DELETE", payload: id });
  }

  function updateClockOut(id, clockData) {
    dispatchOut({ type: "UPDATE", payload: { id: id, data: clockData } });
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
    clockIn: clockStateIn,
    clockOut: clockStateOut,
    addClockIn: addClockIn,
    setClockIn: setClockIn,
    deleteClockIn: deleteClockIn,
    updateClockIn: updateClockIn,
    addClockOut: addClockOut,
    setClockOut: setClockOut,
    deleteClockOut: deleteClockOut,
    updateClockOut: updateClockOut,
    clockInHandler: clockInHandler,
    clockOutHandler: clockOutHandler,
  };
  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
}

export default ClockContextProvider;
