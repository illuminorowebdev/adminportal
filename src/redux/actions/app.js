import actionTypes from 'redux/constants';

export const updateApp = (payload) => ({
  type: actionTypes.ACTION_UPDATE_APP,
  payload,
});

export const setLoading = (payload) => ({
  type: actionTypes.ACTION_SET_LOADING,
  payload,
});

export const refreshApp = (payload = false) => ({
  type: actionTypes.ACTION_REFRESH_APP,
  payload,
});

export const initApp = () => ({
  type: actionTypes.ACTION_INIT_APP,
});
