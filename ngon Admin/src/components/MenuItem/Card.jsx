import React from "react";
// import image1 from '../../assets/images/1.jpg';
import { Rating } from "@mui/material";
import menuApi from "../../api/menuApi";
export default function Card({ item, handleClick, handleDelete}) {
	
	const handleChange = async () => {
		if(item.available) {
			item.available = false;
		}
		else {
			item.available = true;
		}
		menuApi.updateLocale(item.mealID, item.available)
		.then(response => {
			console.log(response.data.message);
			window.location.reload();
		  })
		  .catch(error => {
		
		  });
		
	}

	return (
		<div className="menu-card-item">
			<div className="menu-card-item__img" onClick={handleClick}>
				<img src={ process.env.REACT_APP_API_URL+item?.image} alt="images" />
			</div>
			<div className="menu-card-item__main">
				<div className="menu-card-item__main-name" onClick={handleClick}>
					<h3>{item?.name}</h3>
					<h3>{item?.price}k</h3>
				</div>
				<div className="menu-card-item__main-info">
					<div className="info-item" onClick={handleClick}>
						<p className="info-item-desc">{item?.description}</p>
						<div className="info-item-rating">
							<p><Rating max={1} defaultValue={1} className="rating-star" /></p>
							<p>{item?.rating}</p>
						</div>
					</div>
					{item.available ? (
						<div className="info-btn" onClick={handleChange}>
							A
						</div>
						) : (
						<div className="info-btn" onClick={handleChange}>
							S
						</div>
						)}
					<div className="info-btn" onClick={handleDelete}>
						-
					</div>
				</div>
			</div>
		</div>
	)
}
