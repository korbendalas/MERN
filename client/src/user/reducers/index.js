import { combineReducers } from "redux";
import userReducer from "@reducers/reducer";

export default combineReducers({
  user: userReducer
});
