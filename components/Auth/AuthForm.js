import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import Input from "./Input";
import Button from "../ui/Buttons/Button";

// AuthForm is used twice but in different ways
function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    userName: userNameInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "userName":
        setEnteredUser(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    if (enteredPassword.length >= 7) {
      onSubmit({
        userName: enteredUser,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
      });
    } else {
      Alert.alert(
        "Password Length",
        "Please use a password that is 7 characters or longer",
        { text: "Okay" }
      );
    }
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "userName")}
            value={enteredUser}
            isInvalid={userNameInvalid}
          />
        )}
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
