import React from "react";
import Header from "../components/Header/Header";
import NewCoupon from "../components/Coupon/NewCoupon";
import CouponList from "../components/Coupon/CouponList";

export default function Home() {
	return <div className='container' style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh' // Adjust the height as needed to fill the screen or container
      }}>

		<Header />
        <NewCoupon />
        <CouponList />
	</div>;
}
