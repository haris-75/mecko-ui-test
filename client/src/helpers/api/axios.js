import axios from 'axios';
import * as AppConfig from '../../config/app.js';

const axiosBase = axios.create({
    baseURL: AppConfig.BASE_URL
});

export const secureAxios = axios.create({
    baseURL: AppConfig.BASE_URL
});

export default axiosBase;
