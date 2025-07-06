import { ACTION_TYPES } from "../actionTypes";

export const modalCreator = (payload: { [key: string]: any }) => {
  return {
    type: ACTION_TYPES.MODAL,
    payload,
  };
};
