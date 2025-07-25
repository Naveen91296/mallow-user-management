import Cookies from "js-cookie";
import type { LoginPayload } from "../reduxTypes";
import { API_PATHS } from "./apiPaths";
import { postCall } from "./axiosConfig/helpers";
import { ROUTES } from "../../routes/routeConstants";

export const accountLoginServices = async (
  payload: LoginPayload,
  navigate: any
) => {
  const response = await postCall(API_PATHS.LOGIN, payload);
  if (response?.token) {
    Cookies.set("accessToken", response.token, {
      expires: 7,
      sameSite: "strict",
    });

    const path = localStorage.getItem("historyPath");
    navigate(path || ROUTES.USERS_TABLE);
    localStorage.removeItem("historyPath");
  }

  return response;
};
