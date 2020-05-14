import axios from "axios";
import { usersRoutes, tasksRoutes } from "./urls";

const API = axios.create({
  baseURL: "/api",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    request.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }
  return request;
};

API.interceptors.request.use((request) => requestHandler(request));

const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }
  return Promise.reject(error.response ? { ...error.response.data } : error);
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response && response.data ? response.data : response;
};

API.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const userApi = {
  get: (id) => API.get(id ? `${usersRoutes.main}/${id}` : usersRoutes.me),
  delete: (params) => API.delete(usersRoutes.me, { params }),
  patch: (params) => API.patch(usersRoutes.me, { params }),
  login: (data) => API.post(usersRoutes.login, data),
  post: (data) => API.post(usersRoutes.main, data),
  logout: () => API.post(usersRoutes.logout),
  uploadImage: (data) =>
    API.post(
      usersRoutes.uploadImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      data
    ),
  // etc.
};

const tasksApi = {
  get: (params) => API.get(tasksRoutes.main, { params }),
  post: (data, id) =>
    API.post(`${tasksRoutes.main}${id ? `/${id}/sub` : ""}`, data),
  delete: (id, sub) =>
    API.delete(`${tasksRoutes.main}/${id}${sub ? `/sub/${sub}` : ""}`),
  patch: (data, id, sub) =>
    API.patch(`${tasksRoutes.main}/${id}${sub ? `/sub/${sub}` : ""}`, data),

  location: {
    post: (id, data) => API.post(`${tasksRoutes.main}/location/${id}`, data),
  },
};

const axiosResponseHandeler = (response) => {};

export { userApi, tasksApi };
