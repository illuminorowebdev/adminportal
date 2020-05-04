import { postData, getData, deleteData, patchData, putData } from './base';

const apiEndPoints = {
  login: 'auth/admin-login',
  changePassword: 'users/change-password',
  profile: 'users/profile',
  signout: 'auth/sign-out',
};

export const signin = (body) =>
  new Promise((resolve, reject) => {
    postData(apiEndPoints.login, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const signout = (body) =>
  new Promise((resolve, reject) => {
    postData(apiEndPoints.signout, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const changePassword = (body) =>
  new Promise((resolve, reject) => {
    postData(apiEndPoints.changePassword, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const getProfile = () =>
  new Promise((resolve, reject) => {
    getData(apiEndPoints.profile)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const updateProfile = (body) =>
  new Promise((resolve, reject) => {
    patchData(apiEndPoints.profile, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
