import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeSales(salesData, token) {
  const response = await axios.post(
    BACKEND_URL + "sales.json?auth=" + token,
    salesData
  );
  const id = response.data.name;
  return id;
}

export async function fetchSales(token) {
  const sales = [];

  await axios.get(BACKEND_URL + "sales.json?auth=" + token).then(
    (response) => {
      for (const key in response.data) {
        const saleObj = {
          id: key,
          name: response.data[key].name,
          number: response.data[key].number,
        };
        sales.push(saleObj);
      }
    },
    [token]
  );

  return sales;
}

export function updateSales(id, salesData, token) {
  return axios.put(BACKEND_URL + `sales/${id}.json?auth=${token}`, salesData);
}

export function deleteSales(id, token) {
  return axios.delete(BACKEND_URL + `sales/${id}.json?auth=${token}`);
}
