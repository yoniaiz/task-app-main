const mainUsers = "/users";
const mainTasks = "/tasks";

const usersRoutes = {
  login: `${mainUsers}/login`,
  logout: `${mainUsers}/logout`,
  main: `${mainUsers}`,
  me: `${mainUsers}/me`,
  uploadImage: `${mainUsers}/me/avatar`,
};

const tasksRoutes = {
  main: `${mainTasks}`,
  me: `${mainTasks}/me`,
};

module.exports = {
  usersRoutes,
  tasksRoutes,
};
