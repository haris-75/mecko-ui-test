import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_START,
  VALIDATE_NEW_USER,
  GET_EMAIL_FROM_TOKEN,
  RESET_PASSWORD
} from "../actions";

export const loginUser = payload => ({
  type: LOGIN_USER,
  payload: {
    user: payload.data,
    history: payload.history,
    callback: payload.callback
  }
});

export const forgotPasswordInitiate = payload => ({
  type: FORGOT_PASSWORD_START,
  payload: {
    data: payload.data,
    callback: payload.callback
  }
});

export const loginUserSuccess = data => ({
  type: LOGIN_USER_SUCCESS,
  payload: data
});

export const registerUser = payload => ({
  type: REGISTER_USER,
  payload: {
    user: payload.user,
    history: payload.history,
    callback: payload.callback
  }
});
export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
});

export const validateNewUser = payload => ({
  type: VALIDATE_NEW_USER,
  payload: {
    validationToken: payload.validationToken,
    callback: payload.callback
  }
});

export const getEmailFromToken = payload => ({
  type: GET_EMAIL_FROM_TOKEN,
  payload: {
    validationToken: payload.validationToken,
    callback: payload.callback
  }
});

export const resetPassword = payload => ({
  type: RESET_PASSWORD,
  payload: {
    data: payload.data,
    callback: payload.callback
  }
});

export const checkAuthStatus = () => ({
  type: "CHECK_AUTH_STATUS"
});

export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history }
});
