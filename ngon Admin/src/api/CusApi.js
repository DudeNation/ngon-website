import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const cusApi = {
    getAllCustomer: () => {
        return axiosClient.get(ENDPOINT.customer.getAllCustomer);
    },
    // getCustomerById: (id) => {
    //     const url = `${ENDPOINT.customer.getCustomerById}/${id}`;
    //     return axiosClient.get(url);
    // },
    // createCustomer: (data) => {
    //     return axiosClient.post(ENDPOINT.customer.createCustomer, data);
    // },
    // updateCustomer: (data) => {
    //     return axiosClient.put(ENDPOINT.customer.updateCustomer, data);
    // },
    // deleteCustomer: (id) => {
    //     const url = `${ENDPOINT.customer.deleteCustomer}/${id}`;
    //     return axiosClient.delete(url);
    // },
}

export default cusApi;