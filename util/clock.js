import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeClock(clockData, token) {
  const response = await axios.post(
    BACKEND_URL + "clock.json?auth=" + token,
    clockData
  );
  const id = response.data.name;
  return id;
}

export async function fetchClock(token) {
  const clock = [];

  await axios.get(BACKEND_URL + "clock.json?auth=" + token).then(
    (response) => {
      for (const key in response.data) {
        const clockObj = {
          id: key,
          user: response.data[key].user,
          clockInDate: response.data[key].clockInDate,
          clockInTime: response.data[key].clockInTime,
          clockOutDate: response.data[key].clockOutDate,
          clockOutTime: response.data[key].clockOutTime,
        };
        clock.push(clockObj);
      }
    },
    [token]
  );

  return clock;
}

export async function updateClock(id, clockData, token) {
  return axios.put(BACKEND_URL + `clock/${id}.json?auth=${token}`, clockData);
}

export async function deleteClock(id, token) {
  return axios
    .delete(BACKEND_URL + `clock/${id}.json?auth=${token}`)
    .then(() => {});
}
