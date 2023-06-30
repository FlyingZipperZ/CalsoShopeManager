import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeUserName(userData, token) {
  const response = await axios.post(
    BACKEND_URL + "user.json?auth=" + token,
    userData
  );
  const id = response.data.name;
  return id;
}

export async function fetchUserName(token) {
  const users = [];

  await axios.get(BACKEND_URL + "user.json?auth=" + token).then(
    (response) => {
      for (const key in response.data) {
        const userObj = {
          id: key,
          name: response.data[key].name,
          email: response.data[key].email,
          eStatus: response.data[key].eStatus,
        };
        users.push(userObj);
      }
    },
    [token]
  );

  return users;
}

export function updateUserName(id, userData, token) {
  return axios.put(BACKEND_URL + `user/${id}.json?auth=${token}`, userData);
}

export function deleteUserName(id) {
  return axios.delete(BACKEND_URL + `user/${id}.json?auth=${token}`);
}
