import {
  AUTHENTICATE_USER,
  DEAUTHENTICATE_USER,
  LOGIN_FAIL,
  REGISTER_USER,
  REGISTER_FAIL,
  SAVE_USER_INFO,
  HAS_SET_PROFILE,
  HAS_NO_PROFILE
} from "@actions/types";

import { getToken } from "@services/token";

const initialState = {
  isAuthenticated: !!getToken(),
  hasSetProfile: true,
  info: JSON.parse(localStorage.getItem("user")) || {},
  isAdminFeaturesEnabled: false,
  responseErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true }; //

    case DEAUTHENTICATE_USER:
      return { ...state, ...initialState, isAuthenticated: false }; //universal remove - delete

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        responseErrors: action.payload
      }; //dispatch errors

    case REGISTER_FAIL:
      return { ...state, serverErrors: action.payload };
    //dispatch errors

    case REGISTER_USER:
      return { ...state, info: action.payload }; //overire user from local storage

    case HAS_SET_PROFILE:
      return { ...state, hasSetProfile: true };

    case HAS_NO_PROFILE:
      return { ...state, hasSetProfile: false };

    case SAVE_USER_INFO:
      return { ...state, info: action.payload }; //

    default:
      return state;
  }
};
