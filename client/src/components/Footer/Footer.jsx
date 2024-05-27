import { Facebook, Instagram, MapOutlined } from "@mui/icons-material";
import React from "react";

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer-left">
				<div className="footer-left-loca">
					<h4>Location</h4>
					<p>123 Nguyen Hue Street, District 1, HCMC</p>
					<p>456 Le Loi Boulevard, District 3, HCMC</p>
					<p>789 Pham Ngu Lao Street, District 5, HCMC</p>
				</div>
				<div className="footer-left-hour">
					<div className="hour-item">
						<h4>Open hours</h4>
						<p>veryday 11am-21pm</p>
						<p>Delivery 11am-23pm</p>
					</div>
					<div className="hour-item">
						<h4>Hotline</h4>
						<p>1811-1234</p>
					</div>
				</div>
			</div>
			<div className="footer-center">
				<p>© Ngon 2024. All rights reserved. See our terms and conditions and privacy policy.</p>
			</div>
			<div className="footer-right">
				<p><MapOutlined sx={{fontSize: 30}}/></p>
				<p><Instagram sx={{fontSize: 30}}/></p>
				<p><Facebook sx={{fontSize: 30}}/></p>
			</div>
		</div>
	)
}
