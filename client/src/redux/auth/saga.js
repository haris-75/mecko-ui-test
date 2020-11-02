import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../helpers/Firebase";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  CHECK_AUTH_STATUS,
  FORGOT_PASSWORD_START,
  RESET_PASSWORD,
  VALIDATE_NEW_USER,
  GET_EMAIL_FROM_TOKEN,
  NULLIFY_CATALOG,
  NULLIFY_DASHBOARD_DATA
} from "../actions";

import { logoutUser, loginUserSuccess, registerUserSuccess } from "./actions";

import { DEFAULT_ERROR_RESPONSE } from "../../constants/defaultValues";

import axios from "../../helpers/api/axios";
import * as apiUrls from "../../helpers/api/apiUrls";
import * as apiCaller from "../../helpers/api/apiCaller";
import { async } from "q";

function loginSuccessUtil(data) {
  console.log(data);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user_email", data.user.email);
  localStorage.setItem(
    "user_name",
    data.user.first_name + " " + data.user.last_name
  );
}

function* loginUser({ payload }) {
  const { email, password } = payload.user;
  const { history, callback } = payload;

  const url = apiUrls.AUTHENTICATE_USER;
  const method = "POST";
  const data = { email, password };
  const headers = null;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      method,
      url,
      data,
      headers
    );
    if (response) {
      const payload = {
        token: response.data.token,
        user: response.data.user
      };
      loginSuccessUtil(payload);
      yield put(loginUserSuccess(payload));
      history.push("/");
    }
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      callback({
        isError: true,
        errorDetails: {
          status: error.response.status,
          message: "Invalid Credentials"
        }
      });
    } else {
      callback(DEFAULT_ERROR_RESPONSE);
    }
  }
}

function* registerUser({ payload }) {
  const { history, callback } = payload;
  const method = "POST";
  const url = apiUrls.SINGUP_USER;
  const data = payload.user;
  const headers = null;

  console.log(data);

  try {
    const response = yield call(
      apiCaller.makeRequest,
      method,
      url,
      data,
      headers
    );
    if (response) {
      callback({
        data: response.data,
        isError: false,
        message:
          "Verification email sent. Please click the link sent to verify."
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      callback(DEFAULT_ERROR_RESPONSE);
    } else {
      callback({
        isError: true,
        errorDetails: {
          status: error.response.status,
          message: error.response.data
        }
      });
    }
  }
}

function* validateNewUser({ payload }) {
  const { validationToken, callback } = payload;
  const url = `${apiUrls.VALIDATE_NEW_USER}/${validationToken}`;

  try {
    const response = yield call(apiCaller.makeRequest, "GET", url, null, null);
    if (response) {
      callback({
        data: response.data,
        isError: false,
        message: "Account verified. You can now login"
      });
    }
  } catch (error) {
    callback(DEFAULT_ERROR_RESPONSE);
  }
}

function* logout({ payload }) {
  localStorage.removeItem("token");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");

  yield put({ type: "LOGOUT_USER_SUCCESS" });
  yield put({ type: NULLIFY_CATALOG });
  yield put({ type: NULLIFY_DASHBOARD_DATA });
}

function isUserAlreadyAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  // const expireTime = new Date(localStorage.getItem("expireTime"));
  // const currentTime = new Date();
  //
  // if (currentTime.getTime() < expireTime.getTime()) {
  //   return true;
  // }
  return true;
}

function* checkAuthStatus() {
  if (isUserAlreadyAuthenticated()) {
    const payload = {
      token: localStorage.getItem("token")
    };
    yield put(loginUserSuccess(payload));
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");

    yield put({ type: "LOGOUT_USER_SUCCESS" });
  }
}

function* forgotPasswordInitiate({ payload }) {
  const { data, callback } = payload;

  const url = apiUrls.FORGOT_PASSWORD_INITIATE;

  try {
    const response = yield call(apiCaller.makeRequest, "POST", url, data, null);
    if (response) {
      callback({
        isError: false,
        data: response.data,
        message: response.data.message
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      callback(DEFAULT_ERROR_RESPONSE);
    } else {
      callback({
        isError: true,
        errorDetails: {
          status: error.response.status,
          message: error.response.data.message
        }
      });
    }
  }
}
function* getEmailFromToken({ payload }) {
  const { validationToken, callback } = payload;
  const url = `${apiUrls.GET_EMAIL_FROM_TOKEN}/${validationToken}`;
  try {
    const response = yield call(apiCaller.makeRequest, "GET", url, null, null);
    if (response) {
      callback({
        isError: false,
        data: { ...response.data }
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      callback(DEFAULT_ERROR_RESPONSE);
    } else {
      callback({
        isError: true,
        errorDetails: {
          status: error.response.status,
          message: error.response.message
        }
      });
    }
  }
}

function* resetPassword({ payload }) {
  const { data, callback } = payload;
  const url = `${apiUrls.UPDATE_PASSWORD}`;
  const method = "POST";

  try {
    const resp = yield apiCaller.call(method, url, data, null);
    if (!resp.isError) {
      callback({ ...resp, message: "Password reset successfully." });
    } else {
      callback(resp);
    }
  } catch (error) {
    callback(DEFAULT_ERROR_RESPONSE);
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUser);
  yield takeEvery(VALIDATE_NEW_USER, validateNewUser);
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(CHECK_AUTH_STATUS, checkAuthStatus);
}

export function* watchPasswordReset() {
  yield takeEvery(FORGOT_PASSWORD_START, forgotPasswordInitiate);
  yield takeEvery(GET_EMAIL_FROM_TOKEN, getEmailFromToken);
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchPasswordReset)
  ]);
}
