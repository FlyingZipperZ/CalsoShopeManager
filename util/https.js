import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeTask(taskData, token) {
  const response = await axios.post(
    BACKEND_URL + "task.json?auth=" + token,
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTasks(token) {
  const tasks = [];

  await axios.get(BACKEND_URL + "task.json?auth=" + token).then(
    (response) => {
      for (const key in response.data) {
        const taskObj = {
          id: key,
          name: response.data[key].name,
          status: response.data[key].status,
          dueDate: response.data[key].dueDate,
          sales: response.data[key].sales,
          number: response.data[key].number,
          notes: response.data[key].notes,
          location: response.data[key].location,
        };
        tasks.push(taskObj);
      }
    },
    [token]
  );

  return tasks;
}

export async function updateTask(id, taskData, token) {
  return axios.put(BACKEND_URL + `task/${id}.json?auth=${token}`, taskData);
}

export async function deleteTask(id, token) {
  return axios
    .delete(BACKEND_URL + `task/${id}.json?auth=${token}`)
    .then(() => {});
}
