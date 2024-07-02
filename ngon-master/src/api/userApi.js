import Changepass from "../components/Account/Changepass";
import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const userApi = {
    getAddress: (email) => {
        return axiosClient.get(`${ENDPOINT.user.getAddress}/${email}`);
    },
    newAddress: (email, data) => {
        return axiosClient.post(`${ENDPOINT.user.newAddress}/${email}`, data);
    },
    deleteAddress: (email, id) => {
        return axiosClient.delete(`${ENDPOINT.user.deleteAddress}/${email}/${id}`);
    },
    updateAddress: ( data) => {
        
        return axiosClient.put(`${ENDPOINT.user.updateAddress}`,  data );
    },
    updateUser: (data) => {
        return axiosClient.put(`${ENDPOINT.user.updateUser}`, data);
    },
    newOrder: (data) => {
        return axiosClient.post(`${ENDPOINT.user.orders}`, data);
    },
    getOrderDelivery: (email) => {
        return axiosClient.get(`${ENDPOINT.user.orderDelivery}/${email}`);
    },
    getOrderDone: (email) => {
        return axiosClient.get(`${ENDPOINT.user.orderDone}/${email}`);
    },
    checkToken: () => {
        return axiosClient.get(`${ENDPOINT.user.checkToken}`);
    },
    Changepass: (data) => {
        return axiosClient.put(`${ENDPOINT.user.changePassword}`, data);
    },
    useCoupon: (code, email) => {
        return axiosClient.post(`${ENDPOINT.user.useCoupon}`, { code, email });
    },
    getTotalSpending: (email) => {
        return axiosClient.get(`${ENDPOINT.user.getTotalSpending}/${email}`);
    },
    cancelOrder: ( id) => {
        return axiosClient.put(`${ENDPOINT.user.cancelOrder}/${id}`);
    },
}

export default userApi;