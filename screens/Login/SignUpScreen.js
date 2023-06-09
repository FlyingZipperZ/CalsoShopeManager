import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { createUser } from "../../util/auth";
import { fetchUser, storeUser } from "../../util/users";

// Sign up screen
// takes email and password from sign up form (AuthContent)
// took email and password and sent it to the firebase backend
// firebase
const SignUpScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandeler({ user, email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);

      // const users = await fetchUser(authCtx.token);
      // authCtx.setUser(users);

      // console.log(users.find((userName) => userName === user));
      // console.log(users);

      // storeUser();
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandeler} />;
};

export default SignUpScreen;
