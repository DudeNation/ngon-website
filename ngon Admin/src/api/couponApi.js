import { ENDPOINT } from "../constants/endpoint";
import axiosClient from "./axiosClient";

const couponApi = {
    getAllCoupon: () => {
        return axiosClient.get(ENDPOINT.coupon.getAllCoupon);
    },

    createCoupon: (data) => {
        return axiosClient.post(ENDPOINT.coupon.createCoupon, data);
    },

    deleteCoupon: (couponId) => {
        return axiosClient.delete(`${ENDPOINT.coupon.deleteCoupon}/${couponId}`);
    },
};

export default couponApi;