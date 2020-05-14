import { types } from "./types";
const INIT = {
  authenticated: false,
  credentials: {},
  errors: {},
};
export const authReducer = (state = INIT, action) => {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case types.LOGIN_SUCCESS:
    case types.GET_USER_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        credentials: {
          user: action.user,
          token: action.token,
        },
      };

    case types.LOGIN:
    case types.SIGNUP:
      return {
        ...state,
        errors: {},
      };

    case types.SIGNUP_FALIURE:
      return {
        ...state,
        errors: { ...action.error.errors },
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        credentials: {},
        authenticated: false,
      };

    default:
      return { ...state };
  }
};
