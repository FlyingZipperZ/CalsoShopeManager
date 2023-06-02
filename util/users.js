import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeUser(userData) {
  const response = await axios.post(BACKEND_URL + "user.json", userData);
  const id = response.data.name;
  return id;
}

export async function fetchUser() {
  const response = await axios.get(BACKEND_URL + "user.json");

  const users = [];

  for (const key in response.data) {
    const userObj = {
      id: key,
      name: response.data[key].name,
      password: response.data[key].password,
    };
    users.push(userObj);
  }
  return users;
}

export function updateUser(id, userData) {
  return axios.put(BACKEND_URL + `user/${id}.json`, userData);
}

export function deleteUser(id) {
  return axios.delete(BACKEND_URL + `user/${id}.json`);
}
