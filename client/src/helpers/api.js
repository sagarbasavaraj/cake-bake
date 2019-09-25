import fetch from "isomorphic-unfetch";

const API_BASE_PATH = "http://localhost:3000/api";

const checkStatus = async (response) => {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = await response.json()
    return Promise.reject(error);
  }
}

export const post = async (url, body, headers = {}) => {
  return fetch(`${API_BASE_PATH}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(response => response.json());
};

export const get = async (url, headers = {}) => {
  return fetch(`${API_BASE_PATH}${url}`, {
    method: "GET",
    headers
  })
    .then(checkStatus)
    .then(response => response.json());
};
