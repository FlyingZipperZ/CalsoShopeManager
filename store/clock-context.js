import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const ClockContext = createContext({
  id: "",
  clockInHandler: (clockId) => {},
  clockOutHandler: () => {},
});

function ClockContextProvider({ children }) {
  const [id, setId] = useState();

  function clockInHandler(clockId) {
    setId(clockId);
    AsyncStorage.setItem("clockId", clockId);
  }

  function clockOutHandler() {
    setId(null);
    AsyncStorage.removeItem("clockId");
  }

  const value = {
    id: id,
    clockInHandler: clockInHandler,
    clockOutHandler: clockOutHandler,
  };
  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
}

export default ClockContextProvider;
