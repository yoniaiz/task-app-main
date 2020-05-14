import { types } from "./types";
const INIT = {
  tasks: [],
};

export const tasksReducer = (state = INIT, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.LOADING_DONE:
      return {
        ...state,
        loading: false,
      };

    case types.ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };

    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.task._id),
      };

    case types.UPDATE_TASK_SUCCESS:
    case types.ADD_SUB_TASK_SUCCESS:
    case types.UPDATE_SUB_TASK_SUCCESS:
    case types.DELETE_SUB_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === action.task._id) {
            task = { ...action.task };
          }
          return task;
        }),
      };

    case types.LOGIN_SUCCESS:
    case "GET_USER_SUCCESS":
      return {
        ...state,
        tasks: [...action.tasks],
      };

    default:
      return { ...state };
  }
};
