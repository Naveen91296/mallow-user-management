export const API_PATHS = {
  // login service
  LOGIN: "/login",
  // users list service
  USERS_LIST: (queryParam: number) => `/users?page=${queryParam}`,
  CREATE_USER: "/users",
  UPDATE_USER: (queryParam: number) => `/users/${queryParam}`,
  DELETE_USER: (queryParam: number) => `/users/${queryParam}`,
};
