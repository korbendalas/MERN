import {
  REGISTER_USER,
  REGISTER_FAIL,
  AUTHENTICATE_USER,
  GET_CURRENT_USER,
  HAS_NO_PROFILE,
  DEAUTHENTICATE_USER,
  DELETE_USER
} from "@actions/types";
import {
  registerUser,
  loginUser,
  getCurrentProfile,
  createCurrentProfile,
  deleteCurrentProfile
} from "@endpoints/user";

import { authenticate } from "@services/token";
import { LOGIN_FAIL } from "./types";

export const register = credentials => async dispatch => {
  const { data, error } = await registerUser(credentials);
  if (data) {
    dispatch({
      type: REGISTER_USER,
      payload: data.data
    });
  } else if (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data
    });
  }
};
export const resetRegister = () => {
  return {
    type: REGISTER_FAIL
  };
};

export const login = (credentials, history) => async dispatch => {
  const { data, error } = await loginUser(credentials);

  if (data) {
    authenticate(data.data.token);
    dispatch({ type: AUTHENTICATE_USER });
    history.replace("/dashboard");
    //  console.log(data.data.token);
  } else if (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    //  console.log("login err", error.response.data);
    return Promise.reject(error); //vidi ovo
  }
};

export const logOut = history => async dispatch => {
  localStorage.removeItem("access_token");
  dispatch({ type: DEAUTHENTICATE_USER });
  history.replace("/");
};

export const getProfile = () => async dispatch => {
  const { data, error } = await getCurrentProfile();
  if (data) {
    dispatch({ type: GET_CURRENT_USER, payload: data.data });
    // console.log("current profile action", data);
  } else if (error.response.status === 404) {
    dispatch({ type: HAS_NO_PROFILE });
    // console.log("current profile err", error.response);
  }
};

export const createProfile = (credentials, history) => async dispatch => {
  const { data, error } = await createCurrentProfile(credentials);

  if (data) {
    // authenticate(data.data.token);
    dispatch({ type: GET_CURRENT_USER, payload: data.data });
    if (history) history.replace("/dashboard");
  } else if (error) {
    // console.log(error.response.data.message);
    return Promise.reject(error); //vidi ovo
  }
};

export const deleteProfile = history => async dispatch => {
  const { data, error } = await deleteCurrentProfile();

  if (data) {
    dispatch({ type: DELETE_USER });
    localStorage.removeItem("access_token");
    history.replace("/");
  } else if (error) {
    //  console.log(error.response.data.message);
    return Promise.reject(error); //vidi ovo
  }
};
