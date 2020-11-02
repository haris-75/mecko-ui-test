import axios from "./axios";

export const makeRequest = (method="GET", url, data, headers) => {
    return axios({
        method, url, data, headers
    })
}

export const call = async (method = "GET", url, data, headers) =>
  await axios({
    method,
    url,
    data,
    headers
  })
    .then(response => {
      return {
        isError: false,
        data: response.data,
        headers: response.headers
      };
    })
    .catch(error => {
      return {
        isError: true,
        errorDetails: {
          status: error.response.status,
          message: error.response.data
        }
      };
    });
