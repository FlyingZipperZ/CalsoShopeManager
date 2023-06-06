import axios from "axios";
import { BACKEND_URL } from "./backend";

export async function storeTask(taskData) {
  const response = await axios.post(BACKEND_URL + "task.json", taskData);
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  console.log("Fetching");

  const response = await axios.get(BACKEND_URL + "task.json");

  console.log("Not working");

  const tasks = [];

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

  return tasks;
}

export function updateTask(id, taskData) {
  return axios.put(BACKEND_URL + `task/${id}.json`, taskData);
}

export function deleteTask(id) {
  return axios.delete(BACKEND_URL + `task/${id}.json`);
}
