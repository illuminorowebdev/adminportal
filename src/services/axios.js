import axios from 'axios';
import { updateAuth } from 'redux/actions/auth';

import { store } from 'App';
import config from 'config';

axios.defaults.baseURL = config.API_URL;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const { tokenType, accessToken, loggedIn } = store.getState().auth;
    const token = `${tokenType} ${accessToken}`;
    const newHeaders = {
      'Content-Type': 'application/json',
    };
    if (loggedIn) {
      newHeaders.Authorization = token;
    }
    config.headers = Object.assign({}, config.headers, newHeaders);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (originalRequest.url === `auth/login` ||
        originalRequest.url === `auth/refresh-token`)
    ) {
      // router.history.push('/auth/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, email } = store.getState().auth;
      return axios
        .post(`auth/refresh-token`, {
          email,
          refreshToken,
        })
        .then((response) => {
          const { data: res } = response;
          if (res.code === 200) {
            store.dispatch(updateAuth({ ...res.token }));
            const { tokenType, accessToken } = res.token;
            axios.defaults.headers.common[
              'Authorization'
            ] = `${tokenType} ${accessToken}`;
            return axios(originalRequest);
          }
        });
    }
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axios;
