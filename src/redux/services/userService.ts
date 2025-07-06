import { API_PATHS } from "./apiPaths";
import { deleteCall, getCall, postCall, putCall } from "./axiosConfig/helpers";
import type { CreateUserPayload, UpdateUserPayload } from "../reduxTypes/api";

export const getUsersListService = async (queryParam: number) => {
  return await getCall(API_PATHS.USERS_LIST(queryParam));
};

export const createUserService = async (user: CreateUserPayload) => {
  return await postCall(API_PATHS.CREATE_USER, user);
};

export const updateUserService = async (user: UpdateUserPayload) => {
  return await putCall(API_PATHS.UPDATE_USER(user.id), user);
};

export const deleteUserService = async (queryParam: number) => {
  return await deleteCall(API_PATHS.DELETE_USER(queryParam));
};
