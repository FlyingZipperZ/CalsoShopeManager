import axios from "axios";

const BACKEND_URL = "https://shop-manager-d9c60-default-rtdb.firebaseio.com";

export async function storeTask(taskData) {
  const response = await axios.post(BACKEND_URL + "/task.json", taskData);
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  const response = await axios.get(BACKEND_URL + "/task.json");

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
  console.log("updateTask: ");
  console.log(taskData);
  return axios.put(BACKEND_URL + `/task/${id}.json`, taskData);
}

export function deleteTask(id) {
  return axios.delete(BACKEND_URL + `/task/${id}.json`);
}
