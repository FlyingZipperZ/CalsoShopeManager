import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "./Button";

const ButtonForm = ({
  leftLabel,
  rightLabel,
  submitHandler,
  cancelHandler,
}) => {
  return (
    <View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler}>
          {leftLabel}
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {rightLabel}
        </Button>
      </View>
    </View>
  );
};

export default ButtonForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
