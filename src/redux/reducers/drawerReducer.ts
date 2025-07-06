import { ACTION_TYPES } from "../actionTypes";

interface DrawerState {
  drawerData: { [key: string]: any };
}
export const drawerReducer = (
  state: DrawerState = { drawerData: {} },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.DRAWER:
      return {
        ...state,
        drawerData: { ...state.drawerData, ...action.payload },
      };
    default:
      return state;
  }
};
