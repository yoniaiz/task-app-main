import { types } from "./types";

const INIT = {
  loading: false,
  mainLoader: false,
  imageUrl: "",
};

export const uiReducer = (state = INIT, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.MAIN_LOADER:
      return {
        ...state,
        mainLoader: true,
      };

    case types.LOADING_DONE:
      return {
        ...state,
        loading: false,
        mainLoader: false,
      };

    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        imageUrl: `/api/users/${action.user._id}/avatar`,
      };

    case types.CHANGE_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.url,
      };
    default:
      return { ...state };
  }
};
