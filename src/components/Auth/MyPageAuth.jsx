import React, { useState } from "react";
import MyAccount from "../Cart/MyAccount";
import OrderHistory from "../Cart/OrderHistory";

export default function MyPageAuth() {
	const [active, setActive] = useState(1);
	const [tab, setTab] = useState(1);

	return (
		<div className="my-auth container">
			<div className="my-auth-list">
				<div className={active === 1 ? 'active' : ''} onClick={() => { setTab(1); setActive(1)}}>My account</div>
				<div className={active === 2 ? 'active' : ''} onClick={() => { setTab(2); setActive(2) }}>Order history</div>
			</div>
			<div className="my-auth-item">
				{tab === 1 && <MyAccount />}
				{tab === 2 && <OrderHistory />}
			</div>
		</div>
	);
}
