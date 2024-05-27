import axiosClient from './axiosClient.js';
import { ENDPOINT } from '../constants/endpoint.js';

const authApi = {
    login: (data) => {
        return axiosClient.post(ENDPOINT.auth.login, data);
    },
    register: (data) => {
        return axiosClient.post(ENDPOINT.auth.register, data);
    },
    logout: () => {
        return axiosClient.post(ENDPOINT.auth.logout);
    },
};

export default authApi;