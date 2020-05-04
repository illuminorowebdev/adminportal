import actionTypes from 'redux/constants';

const initialState = {
  tokenType: '',
  accessToken: '',
  refreshToken: '',
  expiresIn: '',
  loggedIn: false,
  email: '',
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_UPDATE_AUTH:
      return { ...state, ...action.payload };
    case actionTypes.ACTION_INIT_AUTH:
      return initialState;
    default:
      return state;
  }
};
