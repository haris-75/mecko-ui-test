import { FETCH_DATA_START, FETCH_DATA_END } from "../actions";

const INITIAL_STATE = {
  isDataFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return { ...state, isDataFetching: true };
      break;
    case FETCH_DATA_END:
      return { ...state, isDataFetching: false };
    default:
      return { ...state };
  }
};
