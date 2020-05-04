import axiosInstance from './axios';

export const getData = (endPoint, payload = {}) =>
  axiosInstance.get(endPoint, payload);

export const postData = (endPoint, body, headers) =>
  axiosInstance.post(endPoint, body, { headers });

export const patchData = (endPoint, body, headers) =>
  axiosInstance.patch(endPoint, body, { headers });

export const deleteData = (endPoint, body, headers) =>
  axiosInstance.delete(endPoint, body, { headers });

export const putData = (endPoint, body, headers) =>
  axiosInstance.put(endPoint, body, { headers });
