import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { loginReducer } from "./reducers/loginReducer";
import { modalReducer } from "./reducers/modalReducer";
import { drawerReducer } from "./reducers/drawerReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  modal: modalReducer,
  drawer: drawerReducer,
});
