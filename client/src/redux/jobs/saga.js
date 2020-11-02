import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../helpers/Firebase";
import {
  FETCH_ALL_JOBS,
  FETCH_JOBS_SUCCESS,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  DELETE_JOB,
  CREATE_STAGE,
  CREATE_STAGE_SUCCESS,
  UPDATE_JOB_CANVAS,
  DELETE_STAGE,
  SAVE_STAGE,
  SAVE_STAGE_SUCCESS,
  DELETE_STAGE_SUCCESS,
  START_JOB,
  FETCH_SAMPLE_DATA,
  FETCH_SAMPLE_DATA_SUCCESS,
  UPDATE_CANVAS_SUCCESS
} from "../actions";

import { logoutUser } from "../auth/actions";
import { DEFAULT_ERROR_RESPONSE } from "../../constants/defaultValues";

import * as apiUrls from "../../helpers/api/apiUrls";
import * as apiCaller from "../../helpers/api/apiCaller";

function* createJob({ payload }) {
  const { name, callback } = payload;

  const url = apiUrls.CREATE_JOB;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  const data = { name };

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      data,
      headers
    );
    if (response) {
      yield put({ type: CREATE_JOB_SUCCESS, data: response.data.result });
      callback({
        isError: false
      });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
          break;
        case 500:
          callback({ isError: true, message: "Something went wrong." });
          break;
        default:
          callback({ isError: true, message: "Something went wrong" });
      }
    }
  }
}

function* deleteJob({ payload }) {
  const { jobId, callback } = payload;

  const url = `${apiUrls.DELETE_JOB}/${jobId}`;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "DELETE",
      url,
      null,
      headers
    );
    if (response) {
      yield put({ type: DELETE_JOB_SUCCESS, jobId });
      callback({ isError: false });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
          break;
        default:
          callback({ isError: true, message: "Something went wrong." });
      }
    }
  }
}

function* fetchAllJobs() {
  const url = apiUrls.FETCH_ALL_JOBS;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "GET",
      url,
      null,
      headers
    );
    if (response) {
      yield put({ type: FETCH_JOBS_SUCCESS, data: response.data });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

function* startJob({ payload }) {
  const { callback, ...data } = payload;

  const url = apiUrls.START_JOB;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      data,
      headers
    );
    if (response) {
      callback({ isError: false });
    }
  } catch (error) {}
}

export function* createStage({ payload }) {
  const url = apiUrls.CREATE_STAGE;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  const { callback, ...data } = payload;
  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      data,
      headers
    );

    if (response) {
      yield put({ type: CREATE_STAGE_SUCCESS, payload: response.data.data });
      callback({ isError: false });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

function* updateCanvas({ payload }) {
  const url = apiUrls.UPDATE_CANVAS;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      payload,
      headers
    );
    if (response) {
      yield put({
        type: UPDATE_CANVAS_SUCCESS,
        payload: { jobId: payload.jobId, updatedStages: response.data.stages }
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

function* deleteStage({ payload }) {
  const url = apiUrls.DELETE_STAGE;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  const { callback, ...data } = payload;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "DELETE",
      url,
      data,
      headers
    );
    if (response) {
      yield put({ type: DELETE_STAGE_SUCCESS, payload });
      console.log("Stafla");
      console.log(response);
      callback({ isError: false, stageId: response.data.stageId });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

export function* saveOrUpdateStage({ payload }) {
  const { callback, ...data } = payload;
  const url = apiUrls.SAVE_STAGE;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      data,
      headers
    );
    if (response) {
      yield put({ type: SAVE_STAGE_SUCCESS, payload });
      callback({ isError: false });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

function* fetchSampleDataForStage({ payload }) {
  console.log(payload);

  const { callback, ...data } = payload;
  const url = apiUrls.FETCH_SAMPLE_DATA;
  let headers = {};
  headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const response = yield call(
      apiCaller.makeRequest,
      "POST",
      url,
      data,
      headers
    );
    if (response) {
      yield put({ type: FETCH_SAMPLE_DATA_SUCCESS, payload });
      callback({ isError: false, data: response.data });
    }
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          yield put(logoutUser(null));
      }
    }
  }
}

export function* watchJobs() {
  yield takeEvery(FETCH_ALL_JOBS, fetchAllJobs);
  yield takeEvery(CREATE_JOB, createJob);
  yield takeEvery(DELETE_JOB, deleteJob);
  yield takeEvery(UPDATE_JOB_CANVAS, updateCanvas);
  yield takeEvery(START_JOB, startJob);
}

export function* watchStages() {
  yield takeEvery(CREATE_STAGE, createStage);
  yield takeEvery(DELETE_STAGE, deleteStage);
  yield takeEvery(SAVE_STAGE, saveOrUpdateStage);
  yield takeEvery(FETCH_SAMPLE_DATA, fetchSampleDataForStage);
}

export default function* rootSaga() {
  yield all([fork(watchJobs), fork(watchStages)]);
}
