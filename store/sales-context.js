import { createContext, useReducer } from "react";

export const SalesContext = createContext({
  sales: [],
  addSales: ({ name, number }) => {},
  setSale: (sales) => {},
  deleteSales: (id) => {},
  updateSales: (id, { name, number }) => {},
});

function salesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updateSalesIndex = state.findIndex(
        (sale) => sale.id === action.payload.id
      );
      const updateableSale = state[updateSalesIndex];
      const updatedItem = { ...updateableSale, ...action.payload.data };
      const updatedSales = [...state];
      updatedSales[updateSalesIndex] = updatedItem;
      return updatedSales;
    case "DELETE":
      return state.filter((sale) => sale.id !== action.payload);
    default:
      return state;
  }
}

function SaleContextProvider({ children }) {
  const [saleState, dispatch] = useReducer(salesReducer, []);

  function addSales(saleData) {
    dispatch({ type: "ADD", payload: saleData });
  }

  function setSale(sale) {
    dispatch({ type: "SET", payload: sale });
  }

  function deleteSales(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateSales(id, saleData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: saleData } });
  }

  const value = {
    sales: saleState,
    addSales: addSales,
    setSale: setSale,
    deleteSales: deleteSales,
    updateSales: updateSales,
  };

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  );
}

export default SaleContextProvider;
