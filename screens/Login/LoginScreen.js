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
      authCtx.authenticate(token);

      const users = await fetchUserName(token);

      console.log("Find");
      console.log(users.find((findEmail) => email === findEmail));

      // userCtx.logedIn(email)
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
