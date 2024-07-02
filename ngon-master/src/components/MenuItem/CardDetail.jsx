import React from "react";
import { Dialog, InputAdornment, Rating, TextField } from "@mui/material";
import { ModeEdit, SpaOutlined, WatchLater } from "@mui/icons-material";

export default function CardDetail({ open, onClose, itemDetail, countCart, setCountCart, handleAddCart, noteValue, setNoteValue }) {

	return (
		<Dialog
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					minWidth: { xs: "unset !important", sm: "600px !important", md: "800px !important", lg: "800px !important" },
					overflow: "hidden"
				}
			}}
		>
			<div className="card-detail">
				<div className="card-detail-img">
					<img src={process.env.REACT_APP_API_URL + itemDetail?.image} alt="images" />
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
					<div className="card-detail-main-review">
						<TextField
							label="Review"
							id="outlined-start-adornment"
							sx={{ width: '100%' }}
							size="small"
							placeholder='Any note for our chef?'
							variant="outlined"
							multiline
							rows={1}
							value={noteValue}
							onChange={(e) => setNoteValue(e.target.value)}
							InputProps={{
								startAdornment: <InputAdornment position="start"><ModeEdit /></InputAdornment>,
							}}
						/>
					</div>
					<div className="card-detail-main-order">
						<div className="order-count">
							<div
								className="minus"
								onClick={() => { if (countCart > 1) setCountCart(countCart - 1) }}
							>-</div>
							<div className="num">{countCart}</div>
							<div className="plus" onClick={() => setCountCart(countCart + 1) }>+</div>
						</div>
						<div className="order-btn">
							<div className="btn-cart" onClick={handleAddCart}>Add to cart</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
