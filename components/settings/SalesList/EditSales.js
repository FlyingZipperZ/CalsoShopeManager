import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";

import SalesForm from "../SalesForm";
import { SalesContext } from "../../../store/sales-context";
import DeleteTaskIcon from "../../../screens/TaskStack/DeleteTaskIcon";
import { deleteSales } from "../../../util/sales";
import SalesPeople from "../../../screens/SettingsStack/SalesPeople";

const EditSales = ({ route }) => {
  const [error, setError] = useState();

  const salesId = route.params?.salesId;

  const salesCtx = useContext(SalesContext);

  const selectedSales = salesCtx.sales.find((sale) => sale.id === salesId);

  async function deleteHandler() {
    try {
      await deleteSales(salesId);
      tasksCtx.deleteSales(salesId);
    } catch (error) {
      setError("Cannot delete try again later!");
    }
  }
  return (
    <View>
      <Text>EditSales</Text>
      <SalesForm defaultValues={selectedSales} />
      <View style={styles.trash}>
        <DeleteTaskIcon
          icon="trash-bin"
          size={40}
          color={"#d43838"}
          onPress={deleteHandler}
          onDelete={SalesPeople}
        />
      </View>
    </View>
  );
};

export default EditSales;

const styles = StyleSheet.create({
  trash: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
});
