import {
  AUTHENTICATE_USER,
  DEAUTHENTICATE_USER,
  DELETE_USER,
  LOGIN_FAIL
} from "@actions/types";
import { getToken } from "@services/token";
const initialState = {
  isAuthenticated: !!getToken(),
  serverErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true };
    case DEAUTHENTICATE_USER:
      return { ...state, isAuthenticated: false };
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false, serverErrors: action.payload };
    case DELETE_USER:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};
