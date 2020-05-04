import { postData, getData, deleteData, patchData, putData } from './base';

const apiEndPoints = {
  login: 'auth/admin-login',
  changePassword: 'users/change-password',
  profile: 'users/profile',
  signout: 'auth/sign-out',
  projects: 'projects/',
  createProjectsPresignedUrls: 'projects/presigned-urls',
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

export const createProjectPresignedUrls = (body) =>
  new Promise((resolve, reject) => {
    postData(apiEndPoints.createProjectsPresignedUrls, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const uploadFileToS3 = (urlInfo, file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(urlInfo.fields).forEach((key) => {
      formData.append(key, urlInfo.fields[key]);
    });
    formData.append('file', file);
    fetch(urlInfo.url, {
      method: 'post',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return resolve();
        }
        reject(res.status);
      })
      .catch((err) => reject(err));
  });

export const listProjects = (query) =>
  new Promise((resolve, reject) => {
    getData(apiEndPoints.projects, { params: query })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const createProject = (payload) =>
  new Promise((resolve, reject) => {
    postData(apiEndPoints.projects, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const getProject = (id) =>
  new Promise((resolve, reject) => {
    getData(apiEndPoints.projects + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const updateProduct = (id, payload) =>
  new Promise((resolve, reject) => {
    patchData(apiEndPoints.projects + id, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
