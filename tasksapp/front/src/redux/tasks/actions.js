import { types } from "./types";
import {
  createNewTask,
  deleteTaskById,
  updateTaskData,
  addSubTaskCall,
  deleteSubTaskCall,
  updateSubTaskCall,
  addLocatoinToTaskCall,
} from "./services";
import Dispatcher from "../../utils/classes/Dispatcher";

const dispatcher = new Dispatcher();

const addTask = (data, callback) => async () => {
  dispatcher.action = types.ADD_TASK;
  dispatcher.request(true);
  try {
    const task = await createNewTask(data);
    dispatcher.success({ task });
    if (callback) callback();
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};

const deleteTask = (id) => async () => {
  dispatcher.action = types.DELETE_TASK;
  dispatcher.request(true);
  try {
    const task = await deleteTaskById(id);
    dispatcher.success({ task });
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};

const updateTask = (data, id, callback) => async () => {
  dispatcher.action = types.UPDATE_TASK;
  dispatcher.request(true);
  try {
    const task = await updateTaskData(data, id);
    dispatcher.success({ task });
    if (callback) callback();
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};

const addSubTask = (subTask, id, callback) => async () => {
  dispatcher.action = types.ADD_SUB_TASK;
  dispatcher.request(true);
  try {
    const task = await addSubTaskCall(subTask, id);
    dispatcher.success({ task });
    if (callback) callback();
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};

const updateSubTask = (subTask, id, subId, callback) => async () => {
  dispatcher.action = types.UPDATE_SUB_TASK;
  dispatcher.request(true);
  try {
    const task = await updateSubTaskCall(subTask, id, subId);
    dispatcher.success({ task });
    if (callback) callback();
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};

const deleteSubTask = (id, subId, callback) => async () => {
  dispatcher.action = types.DELETE_SUB_TASK;
  dispatcher.request(true);
  try {
    const task = await deleteSubTaskCall(id, subId);
    dispatcher.success({ task });
    if (callback) callback();
  } catch (error) {
    dispatcher.failure(error.message);
  } finally {
    dispatcher.loadingDone();
  }
};


const addLocatoinToTask = (id, location) => async () => {
  dispatcher.action = types.ADD_LOCATION_TO_TASK;
  dispatcher.request(true);
  try {
    const res = await addLocatoinToTaskCall(id, location);
    debugger
    dispatcher.success({ task: res });
  } catch (error) {
    debugger
    dispatcher.failure(error);
  } finally {
    dispatcher.loadingDone();
  }
};

export {
  addTask,
  deleteTask,
  updateTask,
  addSubTask,
  deleteSubTask,
  updateSubTask,
};
