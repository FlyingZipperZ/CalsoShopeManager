import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../../constants/Input";
import ButtonForm from "../ui/Buttons/ButtonForm";
import { SalesContext } from "../../store/sales-context";
import { updateSales } from "../../util/sales";
import { AuthContext } from "../../store/auth-context";
import { UserContext } from "../../store/user-context";

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
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  async function confirmHandler() {
    const salesData = {
      name: inputs.name.value,
      number: inputs.number.value,
    };

    const nameIsValid = salesData.name.trim().length > 0;
    const numberIsValid = salesData.number.trim().length > 0;

    if (!nameIsValid || !numberIsValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          number: { value: curInputs.number.value, isValid: numberIsValid },
        };
      });
      return;
    }

    try {
      await updateSales(inputs.id.value, salesData, authCtx.token);
      salesCtx.updateSales(inputs.id.value, salesData);
    } catch (error) {
      console.log("Error updating");
    }
    navigation.goBack();
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
      {/* {userCtx.estatus === "Admin" && ( */}
      <ButtonForm
        leftLabel="Cancel"
        rightLabel="Update"
        cancelHandler={() => navigation.goBack()}
        submitHandler={confirmHandler}
      />
      {/* )} */}
    </View>
  );
};

export default SalesForm;

const styles = StyleSheet.create({});
