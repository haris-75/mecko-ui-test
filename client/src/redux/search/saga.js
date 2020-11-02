import { FETCH_SEARCH_RESULTS, SEARCH_RESULTS_FETCH_SUCCESS } from "../actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as apiUrls from "../../helpers/api/apiUrls";
import * as apiCaller from "../../helpers/api/apiCaller";
import { DEFAULT_ERROR_RESPONSE } from "../../constants/defaultValues";

function* fetchSearchResults({ payload }) {
  console.log("came in fetch");
  console.log(payload);
  const { query, callback } = payload;

  const url = `${apiUrls.FETCH_SEARCH_RESULTS}?q=${query}`;
  const method = "GET";
  let headers = {};
  headers["Jwt-Token"] = localStorage.getItem("token");

  try {
    const resp = yield apiCaller.call(method, url, null, headers);
    if (!resp.isError) {
      const payload = {
        results: resp.data.results,
        stats: resp.data.stats
      };
      yield put({ type: SEARCH_RESULTS_FETCH_SUCCESS, payload });
      callback({ ...resp, message: "Results fetched." });
    } else {
      callback(resp);
    }
  } catch (error) {
    callback(DEFAULT_ERROR_RESPONSE);
  }
}

function* watchSearchEngineActions() {
  yield takeEvery(FETCH_SEARCH_RESULTS, fetchSearchResults);
}

export default function* rootSaga() {
  yield all([fork(watchSearchEngineActions)]);
}
