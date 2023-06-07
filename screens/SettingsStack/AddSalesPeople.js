import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import Input from "../../components/ManageTasks/Input";
import ButtonForm from "../../components/ui/Buttons/ButtonForm";
import { storeSales } from "../../util/sales";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";

const AddSalesPeople = ({ navigation, salesCtx }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);

  function cancelHandler() {
    navigation.goBack();
  }

  const [inputs, setInputs] = useState({
    name: {
      value: "",
      isValid: true,
    },
    number: {
      value: "",
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

  async function submitHandler() {
    const saleData = {
      name: inputs.name.value,
      number:
        "(" +
        inputs.number.value.slice(0, 3) +
        ") " +
        inputs.number.value.slice(3, 6) +
        "-" +
        inputs.number.value.slice(6, 10),
    };

    const nameIsValid = saleData.name.trim().length > 0;
    const numberIsValid = saleData.number.trim().length > 0;

    if (!nameIsValid || !numberIsValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          number: { value: curInputs.number.value, isValid: numberIsValid },
        };
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await storeSales(saleData, authCtx.token);
      salesCtx.addSales({ ...saleData, id: id });
      navigation.goBack();
    } catch (error) {
      setError("Could not save Data try again later");
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <Input
        label="Name"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "name"),
        }}
      />
      <Input
        label="Number"
        textInputConfig={{
          keyboardType: "phone-pad",
          onChangeText: inputChangedHandler.bind(this, "number"),
        }}
      />
      <ButtonForm
        leftLabel={"Cancel"}
        rightLabel={"Add"}
        submitHandler={submitHandler}
        cancelHandler={() => navigation.goBack()}
      />
    </View>
  );
};

export default AddSalesPeople;

const styles = StyleSheet.create({});
