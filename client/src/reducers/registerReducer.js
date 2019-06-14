import { REGISTER_USER, REGISTER_FAIL } from "@actions/types";

const initialState = {
  isRegistered: null,
  loading: true,
  serverErrors: {}
};

export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, isRegistered: true, loading: false };

    case REGISTER_FAIL:
      return { ...state, isRegistered: false, serverErrors: action.payload };
    default:
      return state;
  }
};
