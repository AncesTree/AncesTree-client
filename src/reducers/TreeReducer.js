import { FETCH_LINEAGE_SUCESS, FETCH_LINEAGE_ERROR } from '../actions/Tree'

const initialState = {
  userFocus: {},
  seniors: [],
  juniors: []
};

const tree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LINEAGE_SUCESS:
      return Object.assign({}, state, {
        seniors: action.results.senior,
        juniors: action.results.junior,
        userFocus : action.results.focus
      });
    case FETCH_LINEAGE_ERROR:
      return Object.assign({}, state, {
      });
    default:
      return state;

  }
};

export default tree;