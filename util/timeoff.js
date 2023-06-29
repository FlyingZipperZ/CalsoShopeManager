import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeTimeOff(timeOffData, token) {
  const response = await axios.post(
    BACKEND_URL + "timeOff.json?auth=" + token,
    timeOffData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTimeOff(token) {
  const timeOff = [];

  await axios.get(BACKEND_URL + "timeOff.json?auth=" + token).then(
    (response) => {
      for (const key in response.data) {
        const timeOffObj = {
          id: key,
          user: response.data[key].user,
          reason: response.data[key].reason,
          date: response.data[key].date,
        };
        timeOff.push(timeOffObj);
      }
    },
    [token]
  );

  return timeOff;
}

export async function updateTimeOff(id, timeOffData, token) {
  return axios.put(
    BACKEND_URL + `timeOff/${id}.json?auth=${token}`,
    timeOffData
  );
}

export async function deleteTimeOff(id, token) {
  return axios
    .delete(BACKEND_URL + `timeOff/${id}.json?auth=${token}`)
    .then(() => {});
}
