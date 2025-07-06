import {
  getUsersListCreator,
  setSearchStringCreator,
} from "../creators/userCreators";
import {
  getUsersListService,
  deleteUserService,
  createUserService,
  updateUserService,
} from "../services/userService";
import type { AppDispatch } from "../store";
import type { CreateUserPayload, UpdateUserPayload } from "../reduxTypes/api";

export const getUsersListAction = (queryParam: number) => {
  return async (dispatch: AppDispatch) => {
    const response = await getUsersListService(queryParam);
    dispatch(getUsersListCreator(response));
  };
};

export const setSearchStringAction = (searchString: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setSearchStringCreator(searchString));
  };
};

export const createUserAction = (user: CreateUserPayload) => {
  return async () => {
    await createUserService(user);
  };
};

export const updateUserAction = (user: UpdateUserPayload) => {
  return async () => {
    await updateUserService(user);
  };
};

export const deleteUserAction = (userId: number) => {
  return async () => {
    await deleteUserService(userId);
  };
};
