import { ENDPOINT } from "file:///D:/ngon-master/client/src/constants/endpoint.js";
import axiosClient from "file:D:/ngon-master/client/src/api/axiosClient.mjs";

const menuApi = {
	getAllNoodle: () => {
		return axiosClient.get(ENDPOINT.menu.getAllNoodle);
	},
	getNoodleId: (id) => {
		const url = `${ENDPOINT.menu.showNoodle}/${id}`;

		return axiosClient.get(url);
	},
	updateNoodle: (id) => {
		const url = `${ENDPOINT.menu.showNoodle}/${id}`;

		return axiosClient.put(url);
	},
	getAllRice: () => {
		return axiosClient.get(ENDPOINT.menu.getAllRice);
	},
	getRiceId: (id) => {
		const url = `${ENDPOINT.menu.showRice}/${id}`;

		return axiosClient.get(url);
	},
	updateRice: (id) => {
		const url = `${ENDPOINT.menu.showRice}/${id}`;

		return axiosClient.put(url);
	},
}

export default menuApi;