import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTasks = async () => {
  const res = await API.get('/tasks');
  return res.data;
};

export const createTask = async (task) => {
  const res = await API.post('/tasks', task);
  return res.data;
};

export const updateTask = async (id, updatedTask) => {
  const res = await API.put(`/tasks/${id}`, updatedTask);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};
