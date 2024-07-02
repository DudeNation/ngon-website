
import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const orderApi = {
    getAllOrder: () => {
        return axiosClient.get(ENDPOINT.order.getAllOrder);
    },
    updateOrderStatus: (orderId, data) => {
        const url = `${ENDPOINT.order.updateOrder}/${orderId}`;
        return axiosClient.put(url, data);
    },
}

export default orderApi;