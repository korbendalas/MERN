import { GET_CURRENT_USER, HAS_NO_PROFILE, DELETE_USER } from "@actions/types";

const initialState = {
  hasSetProfile: null,
  loading: true,
  profile: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        hasSetProfile: true,
        loading: false,
        profile: action.payload
      };

    case HAS_NO_PROFILE:
      return { ...state, hasSetProfile: false, loading: false };
    case DELETE_USER:
      return { ...state, hasSetProfile: false, loading: false };
    default:
      return state;
  }
};
