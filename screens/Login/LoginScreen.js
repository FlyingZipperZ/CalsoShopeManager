import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import AuthContent from "../../components/Auth/AuthContent";
import { login } from "../../util/auth";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loggin you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;