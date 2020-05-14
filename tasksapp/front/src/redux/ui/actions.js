import { types } from "./types";

export const profileImageUrl = (url) => {
  return {
    type: types.CHANGE_IMAGE_URL,
    url,
  };
};
