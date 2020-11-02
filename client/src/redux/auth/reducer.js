import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  UPDATE_REMAINING_SPACE
} from "../actions";

const INIT_STATE = {
  user: {
    token: localStorage.getItem("token")
  },
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      let data = action.payload;
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          token: data.token,
        }
      };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          token: localStorage.getItem("token")
        }
      };
    default:
      return { ...state };
  }
};
