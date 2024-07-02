import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const dashboardApi = {
	getTotal: () => {
		const url = `${ENDPOINT.dashboard.getTotal}`;
		return axiosClient.get(url);
	},
    getTotalOrder: () => {
        const url = `${ENDPOINT.dashboard.getTotalOrder}`;
        return axiosClient.get(url);
    },
    getTopOrdered: () => {
        const url = `${ENDPOINT.dashboard.getTopOrdered}`;
        return axiosClient.get(url);
    }
}

export default dashboardApi;
