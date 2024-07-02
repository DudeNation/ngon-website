import React, {useEffect, useState} from "react";
import {  Rating } from "@mui/material";
import {  SpaOutlined, WatchLater } from "@mui/icons-material";

export default function CardDetail({itemDetail }) {	 
	const [image, setImage] = useState('');
	useEffect(() => {
		if(itemDetail?.image && itemDetail.image.includes('assets')){
			
			setImage(`${process.env.REACT_APP_API_URL}${itemDetail?.image}`)
		}
		else{
			setImage(itemDetail.image)
		}
	}, [itemDetail])
	return (
			<div className="card-detail">
				<div className="card-detail-img">
				<img src={ image} alt="images"  />
				</div>
				<div className="card-detail-main">
					<div className="card-detail-main-name">
						<h2>{itemDetail?.name}</h2>
						<h2>{itemDetail?.price}k</h2>
					</div>
					<div className="card-detail-main-desc">
						{itemDetail?.description}
					</div>
					<div className="card-detail-main-info">
						<div className="info-item-rating">
							<p><Rating max={1} defaultValue={1} /></p>
							<p>{itemDetail?.rating}</p>
						</div>
						<div className="info-item-rating">
							<p><SpaOutlined /></p>
							<p>Non-vegan</p>
						</div>
						<div className="info-item-rating">
							<p><WatchLater /></p>
							<p>{itemDetail?.delivery}</p>
						</div>
					</div>
				</div>
			</div>
	)
}
