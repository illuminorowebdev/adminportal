import actionTypes from 'redux/constants';

const initialState = {
  loading: false,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_UPDATE_APP:
      return { ...state, ...action.payload };
    case actionTypes.ACTION_SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.ACTION_INIT_APP:
      return initialState;
    default:
      return state;
  }
};
