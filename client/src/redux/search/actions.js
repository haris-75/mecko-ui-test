import { FETCH_SEARCH_RESULTS } from "../actions";

export const fetchSearchResults = payload => ({
  type: FETCH_SEARCH_RESULTS,
  payload: {
    query: payload.query,
    callback: payload.callback
  }
});
