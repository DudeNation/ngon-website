import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/MenuItem/Card";
import { Box, CircularProgress, Grid } from "@mui/material";
import CardDetail from "../components/MenuItem/CardDetail";
import menuApi from "../api/menuApi";
// import { LOCAL_STORAGE } from "../constants/endpoint";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../redux/action/cartAction";

export default function MenuPage() {
	const dispatch = useDispatch();
	const [active, setActive] = useState(1);
	const [tab, setTab] = useState(1);
	const [openCardDetail, setOpenCardDetail] = useState(false);
	const [noodleList, setNoodleList] = useState([]);
	const [noodleIsLoading, setNoodleIsLoading] = useState(false);
	const [itemDetail, setIitemDetail] = useState();
	const [riceList, setRiceList] = useState([]);
	const [riceIsLoading, setRiceIsLoading] = useState(false);
	const [countCart, setCountCart] = useState(1);
	const [noteValue, setNoteValue] = useState("");
	const [drinkList, setDrinkList] = useState([]);
	const [drinkIsLoading, setDrinkIsLoading] = useState(false);
	const [banhMiIsLoading, setBanhMiIsLoading] = useState(false);
	 const [banhMiList, setBanhMiList] = useState([]);
	 
	const handleOpenCardDetail = (item) => {
		setOpenCardDetail(true);
		setIitemDetail(item)
	}

	const handleCloseCardDetail = () => {
		setOpenCardDetail(false);
		setCountCart(1);
		setNoteValue("");
	}
	// get all noodle
	useEffect(() => {
		const getNoodle = async () => {
			try {
				setNoodleIsLoading(true)
				const response = await menuApi.getAllNoodle();
				setNoodleList(response?.data);
				setNoodleIsLoading(false);
			} catch (error) {
				console.log(error?.message);
				setNoodleIsLoading(false);
			}
		}
		getNoodle();
	}, []);

	useEffect(() => {
		const getRice = async () => {
			try {
				setRiceIsLoading(true)
				const response = await menuApi.getAllRice();
				setRiceList(response?.data);
				setRiceIsLoading(false);
			} catch (error) {
				console.log(error?.message);
				setRiceIsLoading(false);
			}
		}
		getRice();
	}, []);

	useEffect(() => {
		const getDrink = async () => {
			try {
				setDrinkIsLoading(true)
				const response = await menuApi.getAllDrink();
				setDrinkList(response?.data);
				setDrinkIsLoading(false);
			} catch (error) {
				console.log(error?.message);
				setDrinkIsLoading(false);
			}
		}
		getDrink();
	}, []);

	useEffect(() => {
		const getBanhMi = async () => {
			try {
				setBanhMiIsLoading(true)
				const response = await menuApi.getAllBanhMi();
				setBanhMiList(response?.data);
				setBanhMiIsLoading(false);
			} catch (error) {
				console.log(error?.message);
				setBanhMiIsLoading(false);
			}
		}
		getBanhMi();
	}, []);
	
	const handleAddCart = (item) => {
		const data = {
			product: item,
			note: noteValue,
			quantity: countCart
		}
		dispatch(addToCartAction(data));
		// setCartList([...cartList, data]);
	}

  return (
    <div className="container">
			<Header />
			
			<div className="menu-list">
				<div className={active === 1 ? 'active' : ''} onClick={() => { setTab(1); setActive(1)}}>Noodles</div>
				<div className={active === 2 ? 'active' : ''} onClick={() => { setTab(2); setActive(2) }}>Rice</div>
				<div className={active === 3 ? 'active' : ''} onClick={() => { setTab(3); setActive(3) }}>Banh mi</div>
				<div className={active === 4 ? 'active' : ''} onClick={() => { setTab(4); setActive(4) }}>Drink</div>
			</div>
			<div className="menu-list-item">
				{
					tab === 1 && (
					<div>
						{
							noodleIsLoading ? (
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
									<CircularProgress color="primary"/>
								</Box>
								) : (
									<Grid container spacing={2}>
										{
											noodleList.map((item, index) => {
											return (
												<Grid item xs={6} md={4} lg={3} key={index}>
													<Card
														item={item}
														handleClick={() => handleOpenCardDetail(item)}
														handleAddCart={() => handleAddCart(item)}
													/>
												</Grid>
											)
										})
									}
								</Grid>
								)
						}
					</div>
					)
				}
				{
					tab === 2 && (
					<div>
						{
							riceIsLoading ? (
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
									<CircularProgress color="primary"/>
								</Box>
								) : (
									<Grid container spacing={2}>
										{
											riceList.map((item, index) => {
											return (
												<Grid xs={6} md={4} lg={3} key={index}  sx={{ paddingLeft: "16px", paddingTop: "16px" }}>
													<Card
														item={item}
														handleClick={() => handleOpenCardDetail(item)}
														handleAddCart={() => handleAddCart(item)}
													/>
												</Grid>
											)
										})
									}
								</Grid>
								)
						}
					</div>
					)
				}
				{
					tab === 3 && (
						<div>
							{
								banhMiIsLoading ? (
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
										<CircularProgress color="primary"/>
									</Box>
									) : (
										<Grid container spacing={2}>
											{
												banhMiList.map((item, index) => {
												return (
													<Grid item xs={6} md={4} lg={3} key={index}>
														<Card
															item={item}
															handleClick={() => handleOpenCardDetail(item)}
															handleAddCart={() => handleAddCart(item)}
														/>
													</Grid>
												)
											})
										}
									</Grid>
									)
							}
						</div>
					)
				}
				{
					tab === 4 && (
						<div>
							{
								drinkIsLoading ? (
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
										<CircularProgress color="primary"/>
									</Box>
									) : (
										<Grid container spacing={2}>
											{
												drinkList.map((item, index) => {
												return (
													<Grid item xs={6} md={4} lg={3} key={index}>
														<Card
															item={item}
															handleClick={() => handleOpenCardDetail(item)}
															handleAddCart={() => handleAddCart(item)}
														/>
													</Grid>
												)
											})
										}
									</Grid>
									)
							}
						</div>
					)
				}
			</div>
			<CardDetail 
				open={openCardDetail}
				onClose={handleCloseCardDetail}
				itemDetail={itemDetail}
				countCart={countCart}
				setCountCart={setCountCart}
				handleAddCart={() => handleAddCart(itemDetail)}
				noteValue={noteValue}
				setNoteValue={setNoteValue}
			/>
    </div>
  );
}
