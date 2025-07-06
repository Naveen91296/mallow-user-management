import { ACTION_TYPES } from "../actionTypes";

interface LoginState {
  loginError?: null | string; 
}

export const loginReducer = (
  state: LoginState = {},
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};
