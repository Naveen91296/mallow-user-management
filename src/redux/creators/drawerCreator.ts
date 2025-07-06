import { ACTION_TYPES } from "../actionTypes";

export const drawerCreator = (payload: { [key: string]: any }) => {
  return {
    type: ACTION_TYPES.DRAWER,
    payload,
  };
};
