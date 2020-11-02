const axios = require('axios');
const BackendConfig = require("../../config/backend-config");

const axiosBase = axios.create({
    baseURL: BackendConfig.API_BASE
});

module.exports = {axiosBase};
