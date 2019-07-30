import axios from "axios";
import fetch from "isomorphic-unfetch";

const API_BASE_PATH = "http://localhost:3000/api";

export const init = () => {
  axios.defaults.baseURL = "http://localhost:3000/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.put["Content-Type"] = "application/json";
};

// export const get = (url, params, config = {}) => {
//   return axios.get(url, { ...config, params }).then(response => response.data);
// };

// export const post = (url, body, config = {}) => {
//   return axios.post(url, body, config).then(response => response.data);
// };

export const put = (url, body, config = {}) => {
  return axios.put(url, body, config).then(response => response.data);
};

export const del = (url, config = {}) => {
  return axios.delete(url, config).then(response => response.data);
};

export const post = async (url, body, headers = {}) => {
  return fetch(`${API_BASE_PATH}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
};
