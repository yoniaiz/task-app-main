import { types as authTypes } from "../authentication/types";

export const types = {
  LOADING: "LOADING",
  MAIN_LOADER: "MAIN_LOADER",
  LOADING_DONE: "LOADING_DONE",
  CHANGE_IMAGE_URL: "CHANGE_IMAGE_URL",
  ...authTypes,
};
