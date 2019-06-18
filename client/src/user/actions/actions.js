import {
  REGISTER_USER,
  REGISTER_FAIL,
  AUTHENTICATE_USER,
  SAVE_USER_INFO,
  HAS_NO_PROFILE,
  DEAUTHENTICATE_USER,
  DELETE_USER,
  HAS_SET_PROFILE,
  LOGIN_FAIL
} from "@actions/types";

import {
  registerUser,
  loginUser,
  getCurrentProfile,
  createCurrentProfile,
  deleteCurrentProfile
} from "@endpoints/user";

import { authenticate } from "@services/token";

export const register = credentials => async dispatch => {
  //
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

//###################### ????? ##################################
export const resetRegister = () => {
  return {
    type: REGISTER_FAIL
  };
};
//###########################???###################

//
export const login = (credentials, history) => async dispatch => {
  const { data, error } = await loginUser(credentials);

  if (data) {
    authenticate(data.data.token); // set token to local storage
    dispatch({ type: AUTHENTICATE_USER });

    history.replace("/dashboard");
  } else if (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });

    return Promise.reject(error); //vidi ovo
  }
};

export const logOut = history => async dispatch => {
  localStorage.removeItem("access_token");
  dispatch({ type: DEAUTHENTICATE_USER });
  history.replace("/");
};

///
export const getProfile = () => async dispatch => {
  const { data, error } = await getCurrentProfile();
  if (data) {
    dispatch({ type: SAVE_USER_INFO, payload: data.data });
    // info->payload
    localStorage.setItem("user", JSON.stringify(data.data));
  } else if (error.response.status === 404) {
    dispatch({ type: HAS_SET_PROFILE });
    //default->true
    //hasSetProfile->false
  }
};

// export const createProfile = (credentials, history) => async dispatch => {
//   const { data, error } = await createCurrentProfile(credentials);

//   if (data) {
//     // authenticate(data.data.token);
//     dispatch({ type: GET_CURRENT_USER, payload: data.data });
//     if (history) history.replace("/dashboard");
//   } else if (error) {
//     // console.log(error.response.data.message);
//     return Promise.reject(error); //vidi ovo
//   }
// };

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
