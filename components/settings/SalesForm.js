import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../ManageTasks/Input";
import ButtonForm from "../UI/Buttons/ButtonForm";
import { updateSales } from "../../util/sales";
import { SalesContext } from "../../store/sales-context";

const SalesForm = ({ defaultValues }) => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    id: {
      value: defaultValues ? defaultValues.id : "",
      isValid: true,
    },
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

  const salesCtx = useContext(SalesContext);

  async function confirmHandler(taskData) {
    try {
      console.log("Where");
      await updateSales(inputs.id.value, taskData);
      salesCtx.updateSales(inputs.id.value, taskData);
    } catch (error) {
      console.log("Error updating");
    }
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
        submitHandler={confirmHandler}
      />
    </View>
  );
};

export default SalesForm;

const styles = StyleSheet.create({});
