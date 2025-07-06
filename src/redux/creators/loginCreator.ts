import { ACTION_TYPES } from "../actionTypes";

export const accountLoginCreator = (payload: string) => {
  return {
    type: ACTION_TYPES.LOGIN,
    payload,
  };
};
