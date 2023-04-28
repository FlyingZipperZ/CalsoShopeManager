import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";

import { fetchSales } from "../../../util/sales";
import { SalesContext } from "../../../store/sales-context";

function renderSalesPerson(itemData) {
  return (
    <View style={styles.listContainer}>
      <Text>Name: {itemData.item.name}</Text>
      <Text>Phone: {itemData.item.number}</Text>
    </View>
  );
}

const SalesList = ({ sales }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  const salesCtx = useContext(SalesContext);

  return (
    <FlatList
      data={sales}
      renderItem={renderSalesPerson}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={() => {
        async function getSales() {
          setRefreshing(true);
          try {
            const sales = await fetchSales();
            salesCtx.setSale(sales);
          } catch (error) {
            setError("Unable to refresh sales");
          }
          setRefreshing(false);
        }

        getSales();
      }}
    />
  );
};

export default SalesList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 16,
    padding: 16,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    borderRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
