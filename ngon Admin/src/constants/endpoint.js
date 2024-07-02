export const ENDPOINT = {
	menu: { 
		updateFood: "/ngon/updatefoods", 
		getAllNoodle: "/ngon/noodles",
		getAllRice: "/ngon/Rice",
		getAllBanhMi: "/ngon/BanhMi",
		getAllDrink: "/ngon/Drink",
		deleteItem: "/ngon/deleteItem",
		updateLocale: "/ngon/availabe",
	},
	auth: {
		login: "/admin/auth/login",
		logout: "/admin/logout",
		checkAuth: "/checkAuth",
		register: "/admin/auth/register",
		loginInitiate: "/login/initiate",
		verifyLogin: "/login/verify",
		changePassword: "/admin/change-password",
		forgotPassword: "/admin/forgot-password",
		resetPassword: "/admin/reset-password",
		checkCode: "/admin/check-verification-code",
	},
	order: {
		getAllOrder: "/OrderList",
		updateOrder: "/OrderList/updateStatus",
	},
	customer: {
		getAllCustomer: "/users",
	},
	dashboard: {
		getTotal: "/dashboard/Total",
		getTotalOrder: "/dashboard/TotalOrder",
		getTopOrdered: "/dashboard/TopOrdered",
	},
	coupon: {
		getAllCoupon: "/admin/coupons-list",
		createCoupon: "/admin/new-coupon",
		deleteCoupon: "/admin/delete-coupons",
	},
};

export const LOCAL_STORAGE = {
	USER_INFO: "ngon-client-user-info",
	SHIPPING_ADDRESS: "ngon-client-shipping-address",
	PAYMENT_METHOD: "ngon-client-payment-method",
	CART_LIST: "ngon-client-cart-list",
	ORDER_LIST: "ngon-client-order-list",
};