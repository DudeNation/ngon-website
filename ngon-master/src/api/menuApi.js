import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const menuApi = {
	
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
	getAllDrink: () => {
		return axiosClient.get(ENDPOINT.menu.getAllDrink);
	},
	getAllBanhMi: () => {
		return axiosClient.get(ENDPOINT.menu.getAllBanhMi);
	},
	getAllNoodle: () => {
		return axiosClient.get(ENDPOINT.menu.getAllNoodle);
	},
}

export default menuApi;
