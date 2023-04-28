import { createContext, useReducer } from "react";

export const SalesContext = createContext({
  sales: [],
  addSale: ({ name, number }) => {},
  setSale: (sales) => {},
  deleteSale: (id) => {},
  updateSale: (id, { name, number }) => {},
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

  function addSale(saleData) {
    dispatch({ type: "ADD", payload: saleData });
  }

  function setSale(sale) {
    dispatch({ type: "SET", payload: sale });
  }

  function deleteSale(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateSale(id, saleData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: saleData } });
  }

  const value = {
    sales: saleState,
    addSale: addSale,
    setSale: setSale,
    deleteSale: deleteSale,
    updateSale: updateSale,
  };

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  );
}

export default SaleContextProvider;
