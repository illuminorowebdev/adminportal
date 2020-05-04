const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = `${SERVER_URL}v1/`;
const AWS_S3_URL = process.env.REACT_APP_AWS_S3_END_POINT;

export default {
  SERVER_URL,
  API_URL,
  AWS_S3_URL,
};
