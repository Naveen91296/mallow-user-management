import { ACTION_TYPES } from "../actionTypes";
import type { UsersListResponse } from "../reduxTypes/api";

interface UserState {
  usersList: UsersListResponse | null;
  searchString: string;
}

const initialState: UserState = {
  usersList: null,
  searchString: "",
};

export const userReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload,
      };
    case ACTION_TYPES.SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };
    default:
      return state;
  }
};
