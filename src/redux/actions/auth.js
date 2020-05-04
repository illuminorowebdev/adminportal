import actionTypes from 'redux/constants';

export const updateAuth = (payload) => ({
  type: actionTypes.ACTION_UPDATE_AUTH,
  payload,
});

export const initAuth = (payload) => ({
  type: actionTypes.ACTION_INIT_AUTH,
  payload,
});

export const login = (payload) => ({
  type: actionTypes.ACTION_LOGIN,
  payload,
});

export const logout = () => ({
  type: actionTypes.ACTION_LOGOUT,
});
