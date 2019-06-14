import { combineReducers } from "redux";
import { registerUserReducer } from "@reducers/registerReducer";
import loginReducer from "@reducers/loginReducer";
import { userReducer } from "@reducers/userReducer";

export default combineReducers({
  isRegistered: registerUserReducer,
  isAuthenticated: loginReducer,
  user: userReducer
});
