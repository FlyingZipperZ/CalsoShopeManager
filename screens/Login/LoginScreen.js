import { Alert } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import AuthContent from "../../components/Auth/AuthContent";
import { login } from "../../util/auth";
import { UserContext } from "../../store/user-context";
import { fetchUserName } from "../../util/users";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      const users = await fetchUserName(token);

      const user = users.find((femail) => femail.email === email);
      console.log(user.name);
      console.log(user.email);
      console.log(user.eStatus);
      authCtx.authenticate(token);

      userCtx.logedIn(user.name, user.email, user.eStatus);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
