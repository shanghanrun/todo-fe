// Netlify를 사용하려면, 이것의 파일명을 api.js로 바꾸고
// 커밋하고 push 한 이후에 사용한다.

import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
