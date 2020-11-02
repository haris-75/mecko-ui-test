import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import todoSagas from "./todo/saga";
import chatSagas from "./chat/saga";
import surveyListSagas from "./surveyList/saga";
import surveyDetailSagas from "./surveyDetail/saga";
import searchSaga from "./search/saga";
import demoSaga from "./demo/saga";
import jobSaga from "./jobs/saga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    jobSaga(),
    demoSaga(),
    searchSaga(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas()
  ]);
}
