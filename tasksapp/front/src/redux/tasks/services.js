import { tasksApi } from "../api";

export const createNewTask = (data) => {
  return tasksApi.post(data);
};

export const deleteTaskById = (id) => {
  return tasksApi.delete(id);
};

export const updateTaskData = (data, id) => {
  return tasksApi.patch(data, id);
};

export const addSubTaskCall = (data, id) => {
  return tasksApi.post(data, id);
};

export const updateSubTaskCall = (data, id, subId) => {
  return tasksApi.patch(data, id, subId);
};

export const deleteSubTaskCall = (id, subId) => {
  return tasksApi.delete(id, subId);
};

export const addLocatoinToTaskCall = (id, data) => {
  return tasksApi.location.post(id, data);
};
