import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const menuApi = {
	updateFood: (data) => {
		const url = `${ENDPOINT.menu.updateFood}`;
		return axiosClient.post(url, data);
	},
	getAllNoodle: () => {
		return axiosClient.get(ENDPOINT.menu.getAllNoodle);
	},

	getAllRice: () => {
		return axiosClient.get(ENDPOINT.menu.getAllRice);
	},

	getAllDrink: () => {
		return axiosClient.get(ENDPOINT.menu.getAllDrink);
	},
	getAllBanhMi: () => {
		return axiosClient.get(ENDPOINT.menu.getAllBanhMi);
	},
	deleteFood: (mealID) => {
		const url = `${ENDPOINT.menu.deleteItem}/${mealID}`;
		return axiosClient.delete(url);
	},
	updateLocale: (mealID, available) => {
		const url = `${ENDPOINT.menu.updateLocale}/${mealID}`;
		return axiosClient.put(url, { available });
	},
}

export default menuApi;
