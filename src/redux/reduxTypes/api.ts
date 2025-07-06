// Login API payload types
export interface LoginPayload {
  email: string;
  password: string;
}

// User API types
export interface UserBase {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User extends UserBase {
  id: number;
}

export type CreateUserPayload = UserBase;

export interface UpdateUserPayload extends UserBase {
  id: number;
}

export interface UsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
