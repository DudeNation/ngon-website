import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const authApi = {
    signup: (data) => {
        const url = ENDPOINT.user.signup;

        return axiosClient.post(url, data);
    },
    login: (data) => {
        const url = ENDPOINT.user.login;

        return axiosClient.post(url, data);
    },
    logout: () => {
        const url = ENDPOINT.user.logout;
        return axiosClient.post(url);
    },
    register : (data) => {
        const url = ENDPOINT.user.register;

        return axiosClient.post(url, data);
    },
    verifyOTP : (data) => {
        const url = ENDPOINT.user.registerOTP;
        return axiosClient.post(url, data);
    },
    forgotPassword : (data) => {
        const url = ENDPOINT.user.forgotPassword;
        return axiosClient.post(url, data);
    },
    resetPassword : (data) => {
        const url = ENDPOINT.user.resetPassword;
        return axiosClient.post(url, data);
    },
    forgetVerifyCode : (data) => {
        const url = ENDPOINT.user.forgetOTP;
        return axiosClient.post(url, data);
    },
};

export default authApi;