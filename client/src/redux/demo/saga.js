import { all, fork, takeEvery } from "@redux-saga/core/effects";
import { MASK_FILE, UNMASK_FILE } from "../actions";
import axios from "../../helpers/api/axios";
import * as apiCaller from "../../helpers/api/apiCaller";

import * as utils from "./utils";

function* maskFile({ payload }) {
  // 1234567890123456
  const { callback, email, mask_key, text } = payload;

  const method = "POST";
  const data = {
    email,
    mask_key,
    text
  };
  const headers = null;
  const url = "/try/mask";

  try {
    const response = yield apiCaller.call(method, url, data, headers);
    console.log(response);
    if (!response.isError) {
      const filename = utils.getFileNameFromHeaders(
        response.headers["content-disposition"]
      );
      callback({
        data: response.data,
        filename
      });
    }
  } catch (e) {}
}

function* unmaskFile({ payload }) {
  // 1234567890123456
  const { callback, mask_key, source } = payload;
  let formData = new FormData();

  formData.append("source", source);
  formData.append("mask_key", mask_key);
  axios({
    method: "post",
    url: "/try/unmask",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
    .then(function(response) {
      callback({
        isError: false,
        data: response.data
      });
    })
    .catch(error => {
      callback({
        isError: true,
        status: error.response.status
      });
    });

  // console.log(payload);
}

export function* watchCatalogActions() {
  yield takeEvery(MASK_FILE, maskFile);
  yield takeEvery(UNMASK_FILE, unmaskFile);
}

export default function* rootSaga() {
  yield all([fork(watchCatalogActions)]);
}
