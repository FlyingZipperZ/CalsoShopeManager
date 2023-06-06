import { StyleSheet, Text, View, Pressable } from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import SalesList from "../../components/settings/SalesList/SalesList";
import { SalesContext } from "../../store/sales-context";
import { fetchSales } from "../../util/sales";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import Button from "../../components/ui/Buttons/Button";
import IconButton from "../../components/ui/IconButton";

const SalesPeople = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const salesCtx = useContext(SalesContext);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={"AddSalesPeople"}
          />
        ),
      },
      [navigation]
    );
  });

  useEffect(() => {
    async function getSales() {
      setIsFetching(true);
      try {
        const sales = await fetchSales();
        salesCtx.setSale(sales);
      } catch (error) {
        setError("Unable to load Sales");
      }
      setIsFetching(false);
    }
    getSales();
  }, []);

  //   if (error && !isFetching) {
  //     return <ErrorOverlay />;
  //   }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  let content = <Text>No Sales People</Text>;

  if (salesCtx.sales.length > 0) {
    content = <SalesList sales={salesCtx.sales} />;
  }

  return (
    <View
      style={[salesCtx.sales.length === 0 ? styles.container : "", { flex: 1 }]}
    >
      {content}
    </View>
  );
};

export default SalesPeople;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
