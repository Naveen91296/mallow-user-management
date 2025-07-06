import { accountLoginServices } from "../services/loginServices";
import type { LoginPayload } from "../reduxTypes";
import type { AppDispatch } from "../store";
import { accountLoginCreator } from "../creators/loginCreator";

export const accountLoginAction = (payload: LoginPayload, navigate: any) => {
  return async (dispatch: AppDispatch) => {
    const response = await accountLoginServices(payload, navigate);
    if (response?.error) {
      dispatch(accountLoginCreator(response.error));
    }
  };
};
