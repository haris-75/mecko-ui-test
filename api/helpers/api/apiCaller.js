const axios = require("./axios");

const makeRequest = (method="GET", url, data, headers) => {
    return axios.axiosBase({
        method, url, data, headers
    })
}

module.exports = {makeRequest}