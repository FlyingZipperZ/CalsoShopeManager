import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: "",
  email: "",
  eStatus: "",
  logedIn: ({ user, email, eStatus }) => {},
  loggedOut: () => {},
});

function UserContextProvider({ children }) {
  const [userName, setuserName] = useState();
  const [email, setEmail] = useState();
  const [eStatus, setEStatus] = useState();

  function logedIn(user, email, eStatus) {
    setuserName(user);
    setEmail(email);
    setEStatus(eStatus);

    AsyncStorage.setItem("user", user);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("eStatus", eStatus);
  }

  function loggedOut() {
    setuserName(null);
    setEmail(null);
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("eStatus");
  }

  const value = {
    user: userName,
    email: email,
    eStatus: eStatus,
    logedIn: logedIn,
    loggedOut: loggedOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
