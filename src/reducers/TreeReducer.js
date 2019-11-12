import FOCUS_USER from '../actions/Tree'

const initialState = {
  userFocus: {},
  seniors: [],
  juniors: []
};

const tree = (state = initialState, action) => {
    switch (action.type) {
        case FOCUS_USER:
            return Object.assign({}, state, {

            });
    }
};

export default tree;