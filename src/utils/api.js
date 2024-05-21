import axios from "axios";

//로컬에서 사용할 때의 요청주소
const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,   //http://localhost:5001/api
  headers: {
    "Content-Type": "application/json",
    'authorization': "Bearer "+ sessionStorage.getItem('token')
  },
});


// 넷리파이처럼 https로 된 프론트앤드에서 http로 요청을 보낼 경우, 다음처럼
// https 주소를 가진 proxy주소로 요청을 보낸다. 이렇게 한 후 반드시 커밋하고 git push해야 된다.
// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,  // https://넷리파이주소
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
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
