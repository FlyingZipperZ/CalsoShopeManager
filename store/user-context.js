import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: "",
  email: "",
  logedIn: ({ user, email }) => {},
  loggedOut: () => {},
});

function UserContextProvider({ children }) {
  const [userName, setuserName] = useState();
  const [email, setEmail] = useState();

  function logedIn(user, email) {
    setuserName(user);
    setEmail(email);
    AsyncStorage.setItem("user", user);
    AsyncStorage.setItem("email", email);
  }

  function loggedOut() {
    setuserName(null);
    setEmail(null);
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("email");
  }

  const value = {
    user: userName,
    email: email,
    logedIn: logedIn,
    loggedOut: loggedOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
