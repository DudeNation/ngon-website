import React, { useState } from "react";
import MyAccount from "../Cart/MyAccount";
import OrderHistory from "../Cart/OrderHistory";

export default function MyPageAuth() {
	const [active, setActive] = useState(1);
	const [tab, setTab] = useState(1);

	return (
		<div className="my-auth container">
			
				{tab === 1 && <MyAccount />}
				
		</div>
	);
}
