import { getToggleButtonGroupUtilityClass } from "@mui/material";

export const ENDPOINT = {
	menu: {
		getAllNoodle: "/ngon/menu/listNoodles",
		showNoodle: "/ngon/noodles", // /noodles/:id,
    	showRice: "/ngon/rice", // /noodles/:id,
		getAllRice: "/ngon/menu/listRice",
		getAllDrink: "/ngon/menu/listDrink",
		getAllBanhMi: "/ngon/menu/listBanhmi",
		
	},
	user: {
		signup: "/users/signup",
		login: "/users/login",
		logout: "/users/logout",
		getAddress: "/users/address",
		newAddress : "/users/newAddress",
		deleteAddress : "/users/deleteAddress",
		updateAddress : "/users/updateAddress",
		updateUser: "/users/updateUser",
		orders: "/users/orders",
		orderDelivery: "/users/orderDelivery",
		orderDone: "/users/orderDone",
		checkToken: "/users/checkToken",
		changePassword: "/users/changePassword",
		register: "/users/register",
		registerOTP: "/users/verifyOTP",
		forgotPassword: "/users/forgot-password",
		resetPassword: "/users/reset-password",
		forgetOTP: "/users/check-verification-code",
		useCoupon: "/users/useCoupon",
		getTotalSpending: "/users/totalSpend",
		cancelOrder: "/users/cancelOrder",
	},
};

export const LOCAL_STORAGE = {
	USER_INFO: "ngon-client-user-info",
	SHIPPING_ADDRESS: "ngon-client-shipping-address",
	PAYMENT_METHOD: "ngon-client-payment-method",
	CART_LIST: "ngon-client-cart-list",
	ORDER_LIST: "ngon-client-order-list",
};