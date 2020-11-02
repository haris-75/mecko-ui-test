import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import todoApp from "./todo/reducer";
import chatApp from "./chat/reducer";
import surveyListApp from "./surveyList/reducer";
import surveyDetailApp from "./surveyDetail/reducer";
import search from "./search/reducer";
import ui from "./ui/reducer";
import job from "./jobs/reducer";
// import dashboard from "./dashboard/reducer";
import demo from "./demo/reducer";

const reducers = combineReducers({
  menu,
  settings,
  ui,
  job,
  authUser,
  demo,
  search,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp
});

export default reducers;
