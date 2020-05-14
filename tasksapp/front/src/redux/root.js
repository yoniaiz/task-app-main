import { combineReducers } from "redux";

import { authReducer, uiReducer, tasksReducer } from "./reducers";

// Reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  tasks: tasksReducer,
});
