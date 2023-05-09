import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../ManageTasks/Input";
import ButtonForm from "../UI/Buttons/ButtonForm";

const SalesForm = ({ defaultValues }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    number: {
      value: defaultValues ? defaultValues.number : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  return (
    <View>
      <Input
        label="Name"
        textInputConfig={{
          defaulteValue: "",
          onChangeText: inputChangedHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <Input
        label="Number"
        textInputConfig={{
          defaulteValue: "",
          keyboardType: "phone-pad",
          onChangeText: inputChangedHandler.bind(this, "number"),
          value: inputs.number.value,
        }}
      />
      <ButtonForm
        leftLabel="Cancel"
        rightLabel="Update"
        cancelHandler={() => navigation.goBack()}
        // submitHandler={}
      />
    </View>
  );
};

export default SalesForm;

const styles = StyleSheet.create({});
