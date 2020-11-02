import { SEARCH_RESULTS_FETCH_SUCCESS } from "../actions";

const INITIAL_STATE = {
  search: {
    results: [],
    stats: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_FETCH_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload.results,
          stats: action.payload.stats
        }
      };
  }
  return { ...state };
};
