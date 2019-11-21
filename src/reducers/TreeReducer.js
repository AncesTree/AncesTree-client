import { FETCH_LINEAGE_SUCESS, FETCH_LINEAGE_ERROR ,FETCH_RESEARCH_SUCESS , FETCH_RESEARCH_ERROR } from '../actions/Tree'

const initialState = {
  userFocus: {},
  seniors: [],
  juniors: [],
  searchResult : []
};

const tree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LINEAGE_SUCESS:
      return Object.assign({}, state, initialState, {
        seniors: action.results.senior,
        juniors: action.results.junior,
        userFocus : action.results.focus
      });
    case FETCH_LINEAGE_ERROR:
      return Object.assign({}, state, initialState, {
      });
    case FETCH_RESEARCH_SUCESS:
    return Object.assign({}, state, initialState, {
      searchResult: action.results.users
    });
  case FETCH_RESEARCH_ERROR:
    return Object.assign({}, state, initialState, {
    });
    default:
      return state;
  }
};

export default tree;