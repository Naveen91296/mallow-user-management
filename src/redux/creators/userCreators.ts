import { ACTION_TYPES } from "../actionTypes";
import type { UsersListResponse } from "../reduxTypes/api";

export const getUsersListCreator = (payload: UsersListResponse | null) => {
  return {
    type: ACTION_TYPES.GET_USERS_LIST,
    payload,
  };
};

export const setSearchStringCreator = (searchString: string) => {
  return {
    type: ACTION_TYPES.SET_SEARCH_STRING,
    payload: searchString,
  };
};
