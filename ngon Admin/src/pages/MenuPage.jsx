import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/MenuItem/Card";
import { Box, CircularProgress, Grid  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import menuApi from "../api/menuApi";
// import { LOCAL_STORAGE } from "../constants/endpoint";
import AddItem from "../components/MenuItem/AddItem";

export default function MenuPage() {
	const [active, setActive] = useState(1);
	const [tab, setTab] = useState(1);
	const [openCardDetail, setOpenCardDetail] = useState(false);
	const [noodleList, setNoodleList] = useState([]);
	const [noodleIsLoading, setNoodleIsLoading] = useState(false);
	const [itemDetail, setIitemDetail] = useState();
	const [riceList, setRiceList] = useState([]);
	const [riceIsLoading, setRiceIsLoading] = useState(false);
	const [BanhMiList, setBanhMiList] = useState([]);
	const [BanhMiIsLoading, setBanhMiIsLoading] = useState(false);
	const [DrinkList, setDrinkList] = useState([]);
	const [DrinkIsLoading, setDrinkIsLoading] = useState(false);

	const handleOpenCardDetail = (item) => {
		setOpenCardDetail(true);
		setIitemDetail(item)
	}

	const handleCloseCardDetail = () => {
		setOpenCardDetail(false);
		setIitemDetail(null)
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
				setNoodleIsLoading(false);
			}
		}
		getNoodle();
	}, []);
	//get all rice
	useEffect(() => {
		const getRice = async () => {
			try {
				setRiceIsLoading(true)
				const response = await menuApi.getAllRice();
				setRiceList(response?.data);
				setRiceIsLoading(false);
			} catch (error) {
				setRiceIsLoading(false);
			}
		}
		getRice();
	}, []);	
	//get all banh mi
	useEffect(() => {
		const getBanhMi = async () => {
			try {
				setBanhMiIsLoading(true)
				const response = await menuApi.getAllBanhMi();
				setBanhMiList(response?.data);
				setBanhMiIsLoading(false);
			} catch (error) {
				setBanhMiIsLoading(false);
			}
		}
		getBanhMi();
	},[]);
	//get all drink
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
	//Delete item
	const handleDelete = (item) => {
		menuApi.deleteFood(item.mealID)
		  .then(response => {
			console.log(response.data.message);
			if (response.status !== 404) {
			  window.location.reload();
			}
		  })
		  .catch(error => {
			if (error.response && error.response.status === 404) {
			  console.error('Error: ', error.response.data.message);
			}
		  });
	  };

  return (
    <div className="container">
			<Header />
			<div className="search-add">
				{/* <input className = "searchbar" type="text" placeholder="Search..." onChange={event => setSearchTerm(event.target.value)} /> */}
				<button className="search-button" onClick={() => handleOpenCardDetail(null)}>
					<AddIcon />New  
				</button>
			</div>
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
														handleDelete={() => handleDelete(item)}
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
														handleDelete={() => handleDelete(item)}
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
								BanhMiIsLoading ? (
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
										<CircularProgress color="primary"/>
									</Box>
									) : (
										<Grid container spacing={2}>
											{
												BanhMiList.map((item, index) => {
												return (
													<Grid item xs={6} md={4} lg={3} key={index}>
														<Card
															item={item}
															handleClick={() => handleOpenCardDetail(item)}
															handleDelete={() => handleDelete(item)}
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
								DrinkIsLoading ? (
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>
										<CircularProgress color="primary"/>
									</Box>
									) : (
										<Grid container spacing={2}>
											{
												DrinkList.map((item, index) => {
												return (
													<Grid item xs={6} md={4} lg={3} key={index}>
														<Card
															item={item}
															handleClick={() => handleOpenCardDetail(item)}
															handleDelete={() => handleDelete(item)}
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
			{/* <CardDetail */}
			 <AddItem 
				open={openCardDetail}
				onClose={handleCloseCardDetail}
				itemDetail={itemDetail}
			/>
    </div>
  );
}
