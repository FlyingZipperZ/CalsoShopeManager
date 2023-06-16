import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const UserContext = createContext({
  userName: "",
  email: "",
  logedIn: (userName, email) => {},
  loggedOut: () => {},
});

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();

  function logedIn(userName, email) {
    setUser(userName);
    setEmail(email);
    AsyncStorage.setItem("user", userName);
    AsyncStorage.setItem("email", email);
  }

  function loggedOut() {
    setUser(null);
    setEmail(null);
    AsyncStorage.removeItem("userName");
    AsyncStorage.removeItem("email");
  }

  const value = {
    userName: user,
    email: email,
    logedIn: logedIn,
    loggedOut: loggedOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
