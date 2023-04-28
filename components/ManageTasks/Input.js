import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Input = ({ label, invalid, style, textInputConfig }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#e3e3e3",
    borderColor: "black",
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    // color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    // backgroundColor: GlobalStyles.colors.error50,
  },
});
