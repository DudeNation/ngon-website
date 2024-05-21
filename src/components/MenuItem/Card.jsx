import React from "react";
// import image1 from '../../assets/images/1.jpg';
import { Rating } from "@mui/material";

export default function Card({ item, handleClick, handleAddCart }) {
	return (
		<div className="menu-card-item">
			<div className="menu-card-item__img" onClick={handleClick}>
				<img src={item?.image} alt="images" />
			</div>
			<div className="menu-card-item__main">
				<div className="menu-card-item__main-name" onClick={handleClick}>
					<h3>{item?.title}</h3>
					<h3>{item?.price}k</h3>
				</div>
				<div className="menu-card-item__main-info">
					<div className="info-item" onClick={handleClick}>
						<p className="info-item-desc">{item?.desc}</p>
						<div className="info-item-rating">
							<p><Rating max={1} defaultValue={1} className="rating-star" /></p>
							<p>{item?.rating}</p>
						</div>
					</div>
					<div className="info-btn" onClick={handleAddCart}>
						+
					</div>
				</div>
			</div>
		</div>
	)
}