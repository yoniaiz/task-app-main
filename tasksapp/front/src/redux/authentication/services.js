import { userApi } from "../api";

const loginUser = (user) => {
  return userApi.login(user);
};

const getUserByToken = () => {
  return userApi.get();
};

const signupNewUser = (user) => {
  return userApi.post(user);
};

const uploadProfileImage = (formData) => {
  return userApi.uploadImage(formData);
};

const getUserByIdRequest = (id) => {
  return userApi.get(id);
};

const logoutUser = () => {
  return userApi.logout();
};
export {
  loginUser,
  getUserByToken,
  signupNewUser,
  uploadProfileImage,
  getUserByIdRequest,
  logoutUser,
};
