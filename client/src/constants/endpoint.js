export const ENDPOINT = {
	menu: {
		getAllNoodle: "/ngon/noodles",
		showNoodle: "/ngon/noodles", // /noodles/:id,
		getAllRice: "/ngon/rice",
    showRice: "/ngon/rice", // /noodles/:id,
	},
	auth: {
		login: "http://localhost:5000/ngon/auth/login",
		register: "http://localhost:5000/ngon/auth/sign-up",
		logout: "/ngon/auth/logout",
		
	},
	user: {
		getProfile: "/ngon/users/profile",
		updateProfile: "/ngon/users/profile",
	},
	order: {
		createOrder: "/ngon/orders",
		getOrder: "/ngon/orders",
		getOrderDetail: "/ngon/orders", // /:id,
	},

	// Admin
	admin: {
		getAllUsers: "/ngon/admin/users",
		getUser: "/ngon/admin/users", // /:id,
		updateUser: "/ngon/admin/users", // /:id,
		deleteUser: "/ngon/admin/users", // /:id,
		getAllOrders: "/ngon/admin/orders",
		getOrder: "/ngon/admin/orders", // /:id,
		updateOrder: "/ngon/admin/orders", // /:id,
		deleteOrder: "/ngon/admin/orders", // /:id,
	},

};

export const LOCAL_STORAGE = {
	USER_INFO: "ngon-client-user-info",
	TOKEN: "ngon-client-token",
	SHIPPING_ADDRESS: "ngon-client-shipping-address",
	PAYMENT_METHOD: "ngon-client-payment-method",
	CART_LIST: "ngon-client-cart-list",
	ORDER_LIST: "ngon-client-order-list",
};