import React from "react";
import { Dialog,  Rating, TextField, Button } from "@mui/material";
import {  SpaOutlined, WatchLater } from "@mui/icons-material";
import { useState,useEffect, useRef } from "react";
import CardDetail from "./CardDetail";
import upload from "../../assets/images/Download.png";
import menuApi from "../../api/menuApi";
import axios from "axios";

export default function AddItem({ open, onClose, itemDetail}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');//???
  const [delivery, setDelivery] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState(''); 
  const [type, setType] = useState(null);
  const [id, setId] = useState(''); //ID 
  const [available, setAvailable] = useState(true);
  const [displayImage, setDisplayImage] = useState(''); //???

  const inputRef = useRef(); 

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  useEffect(() => {
    setName(itemDetail?.name);
    setPrice(itemDetail?.price);
    setDescription(itemDetail?.description);
    setRating(itemDetail?.rating);
    setDelivery(itemDetail?.delivery);
    setImage(itemDetail?.image);
    setType(itemDetail?.type);
    setId(itemDetail?.mealID);
    setAvailable(itemDetail?.available);
  }, [itemDetail]);

  const itemUnder = { 
    name : name, 
    price : price, 
    description : description, 
    rating : rating, 
    delivery : delivery, 
    image : newImage ? displayImage : image, 
    type : type, 
  };

  const clearData = () => {
    setName('');
    setPrice('');
    setDescription('');
    setRating('');
    setDelivery('');
    setImage('');
    setNewImage('');
    setType('');
    setId('');
    setAvailable('');
    setDisplayImage('');
  }

  const handleSave = async () => {
    let imageUrl = image;
    if (newImage) {
      try {
        let formData = new FormData();
        formData.append('meal', newImage);

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/meals/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.image_url;
        
      } catch (err) {
        console.error(err);
        // handle error
      }
    }
    let newId = id;
    if (!id) {
      let number = getRandomInt(100000000, 999999999);
      newId = type + number;
    }
    const data = {
      mealID: newId,
      name: name,
      price: Number(price),
      description: description,
      type: type,
      image : imageUrl,
      available: available || true,
      rating: rating,
      delivery: delivery,
    };

    menuApi.updateFood(data)    
      .then(response => {
        console.log(response.data.message);
        window.location.reload();
      })
      .catch(error => {
        alert("Input day du");
      });
   
  };

	return (
		<Dialog
      onClose={() => {
        onClose();
        clearData();
      }}
			open={open}
			PaperProps={{
				sx: {
					minWidth: { xs: "unset !important", sm: "600px !important", md: "800px !important", lg: "800px !important" },
					overflow: "hidden"
				}
			}}
		>
      <div className="add-card"  style={{ display: 'flex', flexDirection: 'column' }}>
        <CardDetail itemDetail={itemUnder}/>
        <div className="card-detail">
          <div className="card-detail-img">
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={inputRef} 
              onChange={(e) => {
                setNewImage(e.target.files[0]);
                setDisplayImage(URL.createObjectURL(e.target.files[0]))
              }}
            />
            <img 
              src={newImage ? displayImage : (image ?  process.env.REACT_APP_API_URL+ image : upload)}
              alt="images" 
              onClick={() => inputRef.current.click()} 
            />
          </div>

          <div className="card-detail-main">
            <div className="card-detail-main-name">
              <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
              />
              <TextField
                  value={price }
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
              />
            </div>

            <div className="card-detail-main-desc">
              <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
              />
            </div>

            <div className="card-detail-main-info">

              <div className="card-detail-main-type">
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value = {null}>------</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Banh Mi">Banh Mi</option>
                  <option value="Drink">Drink</option>
                  <option value="Rice">Rice</option>
                </select>
              </div>
              
              <div className="info-item-rating">
                <p><Rating max={1} defaultValue={1} /></p>
                <TextField
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Rating"
               />
              </div>
              
              <div className="info-item-rating">
                <p><SpaOutlined /></p>
                <p>Non-vegan</p>
              </div>

              <div className="info-item-rating">
                <p><WatchLater /></p>
                <TextField
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  placeholder="Delivery Time"
               />
              </div>
            </div> 
            </div> 
        </div>     
        
      </div>
      <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            width: "100%",
            fontWeight: "500",
            textTransform: "initial",
            my: 1,
          }}
          onClick={handleSave}
        >
          Save
      </Button>
		</Dialog>
	)
}
