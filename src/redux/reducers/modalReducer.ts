import { ACTION_TYPES } from "../actionTypes";

interface ModalState {
  modalData: { [key: string]: any };
}

export const modalReducer = (
  state: ModalState = { modalData: {} },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.MODAL:
      return { ...state, modalData: { ...state.modalData, ...action.payload } };
    default:
      return state;
  }
};
