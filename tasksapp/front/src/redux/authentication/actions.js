import { types } from "./types";
import {
  loginUser,
  getUserByToken,
  signupNewUser,
  getUserByIdRequest,
  logoutUser,
} from "./services";
import Dispatcher from "../../utils/classes/Dispatcher";
import { history } from "../../utils/history";

const dispatcher = new Dispatcher();

const completedAndNotTaskSplit = (taskArr) => {
  const completed = taskArr.filter((task) => task.completed === true).length;
  return [completed, taskArr.length - completed];
};

const login = (userObj) => async () => {
  const { LOGIN } = types;
  dispatcher.action = LOGIN;

  dispatcher.request(true);
  try {
    const { token, user, tasks } = await loginUser(userObj);

    localStorage.setItem("token", token);

    const [tasksCompleted, tasksNotCompleted] = completedAndNotTaskSplit(tasks);

    dispatcher.success({
      user: { ...user, tasksCompleted, tasksNotCompleted },
      token,
      tasks,
    });

    history.push("/");
  } catch (error) {
    dispatcher.failure(error);
  } finally {
    dispatcher.loadingDone();
  }
};

const getUser = () => async (dispatch) => {
  const { GET_USER } = types;
  dispatcher.action = GET_USER;

  dispatcher.request(true, true);

  try {
    const { user, token, tasks } = await getUserByToken();
    localStorage.setItem("token", token);

    const [tasksCompleted, tasksNotCompleted] = completedAndNotTaskSplit(tasks);

    dispatcher.success({
      user: { ...user, tasksCompleted, tasksNotCompleted },
      token,
      tasks,
    });
    history.push("/");
  } catch {
    localStorage.removeItem("token");
    dispatcher.failure();
    history.push("/login");
  } finally {
    dispatcher.loadingDone();
  }
};

const signup = (userObj) => async () => {
  dispatcher.action = types.SIGNUP;
  dispatcher.request(true);
  try {
    const { user, token } = await signupNewUser(userObj);
    localStorage.setItem("token", token);

    dispatcher.success({ user, token });
    history.push("/");
  } catch (error) {
    error.message = error._message;
    if (error.keyValue && error.keyValue.email) {
      error.message = "Email allready exist";
      error.errors = {};
      error.errors.email = {};
    }
    dispatcher.failure(error);
  } finally {
    dispatcher.loadingDone();
  }
};

const getUserById = (id) => async () => {
  dispatcher.action = types.GET_USER_BY_ID;
  dispatcher.request();
  try {
    const user = await getUserByIdRequest(id);
    dispatcher.success(user);
  } catch (error) {
    dispatcher.failure(error);
  } finally {
    dispatcher.loadingDone();
  }
};

const logout = () => async () => {
  dispatcher.action = types.LOGOUT;
  dispatcher.request();

  try {
    const res = await logoutUser();
    localStorage.removeItem("token");
    dispatcher.success(res);
  } catch (error) {
    dispatcher.failure(error);
  }
};

export { login, signup, getUser, getUserById, logout };
