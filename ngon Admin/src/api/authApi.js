import axiosClient from './axiosClient.js';
import { ENDPOINT } from '../constants/endpoint.js';

const authApi = {
    logout: (data) => {
        return axiosClient.post(ENDPOINT.auth.logout, data);
    },
    checkAuth: () => {
        return axiosClient.get(ENDPOINT.auth.checkAuth);
    },
    loginInitiate: (data) => {
        return axiosClient.post(ENDPOINT.auth.loginInitiate, data);
    },
    verifyLogin: (data) => {
        return axiosClient.post(ENDPOINT.auth.verifyLogin, data);
    },
    changePassword: (data) => {
        return axiosClient.put(ENDPOINT.auth.changePassword, data);
    },
    forgotPassword: (data) => {
        return axiosClient.post(ENDPOINT.auth.forgotPassword, data);
    },
    resetPassword: (data) => {
        return axiosClient.post(ENDPOINT.auth.resetPassword, data);
    },
    checkCode: (data) => {
        return axiosClient.post(ENDPOINT.auth.checkCode, data);
    },
};

export default authApi;