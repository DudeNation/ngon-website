import { Edit, Home, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import Changepass  from "../Account/Changepass";
import userApi from "../../api/userApi";

export default function MyAccount() {
  const [isChangepassOpen, setIsChangepassOpen] = useState(false);
  const handleChangePassword = () => {
    setIsChangepassOpen(!isChangepassOpen);
  };
  
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_INFO));
  const navigate = useNavigate();
  const [inputList, setInputList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: user.name ? user.name : "",
      phone: user.phone ? user.phone : "",
      password: user.password ? user.password : "",
      email: user.email ? user.email : "",
    },
  });

  const [defaultAddress, setDefaultAddress] = useState(false);

  const refContainer = useRef(null);
  const [widthClient, setWidthClient] = useState(0);
  const [isActiveBasic, setIsActiveBasic] = useState(true);
  const [isActiveShipping, setIsActiveShipping] = useState(true);

  const onResize = useCallback(() => {
    if (refContainer.current) setWidthClient(refContainer.current.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  //set Address List
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await userApi.getAddress(user.email);
        const addresses = response.data; // Assuming the API returns the addresses directly
        localStorage.setItem(LOCAL_STORAGE.SHIPPING_ADDRESS, JSON.stringify(addresses));
        setAddressList(addresses);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        // Optionally handle the error, e.g., by setting an error state
      }
    };

    // Call the fetchAddresses function
    fetchAddresses();
  }, [user.email]); 

  const handleEditAddress = (e, index) => {
    const { name, value } = e.target;
    const list = [...addressList];
    list[index][name] = value;

    setAddressList(list);
  };

  const handleDoubleClickBasicInfo = () => {
    setIsEditingInfo(true);
  }

  const handleDoubleClickItem = (id) => {
    setIsEditing(id);
  };

  const handleUpdateAddItem = async (id) => {
    try {
      const address = addressList.find((item) => item._id === id);
      const email = user.email;
      const addressId = id;
    
      const response = await userApi.updateAddress({ email, addressId, address});
      if (response.status === 200) {
        const addresses = response.data; 
        localStorage.setItem(LOCAL_STORAGE.SHIPPING_ADDRESS, addresses);
        setAddressList(addresses);
        setIsEditing("");
      }
    }
    catch (error) {
      
      console.error('Failed to update address:', error);
      // Optionally handle the error, e.g., by setting an error state
    }
  };

  const handleDeleteAddItem = async (id) => {
    try {
      const response = await userApi.deleteAddress(user.email, id);
      console.log(response);
      if (response.status === 200) {
        const addresses = response.data; 
        localStorage.setItem(LOCAL_STORAGE.SHIPPING_ADDRESS, addresses);
        setAddressList(addresses);
        setIsEditing("");
        
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
      // Optionally handle the error, e.g., by setting an error state
    }
  };

  const [rank, setRank] = useState("");

  useEffect(() => {
    const fetchTotalSpending = async () => {
      try {
        const response = await userApi.getTotalSpending(user.email);
    
        const totalSpending = response.data.totalSpending; 
        if (totalSpending < 1000) {
          setRank("Bronze");
        } else if (totalSpending < 5000) {
          setRank("Silver");
        } else if (totalSpending < 10000) {
          setRank("Gold");
        } else {
          setRank("Diamond");
        }
      } catch (error) {
        console.error("Error fetching total spending:", error);
      }
    };

    fetchTotalSpending();
  }, [user.email]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    setInputList(list);
  };

  const handleAddAddressClick = () => {
    setInputList([
      ...inputList,
      {
        addressName: "",
        recepient: "",
        street1: "",
        city: "",
        phone: "",
        isDefault: false,
      },
    ]);
  };

  const handleSaveClick = (e) => {  
    try {
      const response = userApi.newAddress(user.email, inputList);
      if (response.status === 200) {
        const addresses = response.data; // Assuming the API returns the addresses directly
        localStorage.setItem(LOCAL_STORAGE.SHIPPING_ADDRESS, addresses);
        setAddressList(addresses);
        setInputList([]);
      }
    } catch (error) {
      console.error('Failed to add address:', error);
      // Optionally handle the error, e.g., by setting an error state
    }
  };

  const handleSaveBasicInfo = async (data) => {  
    try {
      // Assuming user.email is accessible in this context
      const updatedData = { ...data, email: user.email };
  
      const response = await userApi.updateUser(updatedData);
   
      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(updatedData));
        window.location.reload();
      } 
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await authApi.logout();
     
        if (response.status === 200) {
          localStorage.clear();
          navigate("/"); // Ensure 'navigate' is imported from 'react-router-dom' or your routing library
        }
      } catch (error) {
        console.error(error);
      }
    };
    logout(); // Call the logout function
} 

  const handleActiveBasic = () => {
    if (widthClient <= 600) {
      setIsActiveBasic(!isActiveBasic);
    } else {
      return;
    }
  }

  const handleActiveShipping = () => {
    if (widthClient <= 600) {
      setIsActiveShipping(!isActiveShipping);
    } else {
      return;
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Bronze':
        return '#cd7f32'; // Bronze color
      case 'Silver':
        return '#c0c0c0'; // Silver color
      case 'Gold':
        return '#ffd700'; // Gold color
      case 'Diamond':
        return '#0f52ba'; // Diamond color
      default:
        return '#000'; // Default color (black)
    }
  };
  

  return (
    <div className="my-account" ref={refContainer}>
      {/* Logout Button */}
      <div className="my-account-logout">
        <Button
          variant="contained"
          size="medium"
          color="primary"
          sx={{
            fontWeight: "500",
            textTransform: "initial",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          {/* basic info */}
          <Box>
            <Typography color="primary.dark" variant="body2">
              Please complete the missing information to finish opening your
              account.
            </Typography>
            <Typography
              variant="h6"
              my={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
              color={`${isActiveBasic ? "primary" : "primary.dark"}`}
              onClick={handleActiveBasic}
            >
              Basic information 
              <Typography>
                {widthClient <= 600 && isActiveBasic ?
                  <KeyboardArrowUp sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} /> :
                  <KeyboardArrowDown sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} />}
              </Typography>
            </Typography>

            <div className="my-account-left-item">
              <p>Rank</p>
              <div>
                <p style={{ color: getRankColor(rank), fontWeight: 'bold', fontSize: '18px' }}>
                  {rank}
                </p>
              </div>
            </div>

            {isActiveBasic && <Box sx={{ width: "80%" }}>
              {
                !isEditingInfo ? (
                  <div onDoubleClick={handleDoubleClickBasicInfo}>
                    <div className="my-account-left-item">
                      <p>Email</p>
                      <div>
                        <p className="my-account-left-item-r">{getValues("email")}</p>
                       
                      </div>
                    </div>
                    <div className="my-account-left-item">
                      <p>
                        Name <span>*</span>
                      </p>
                      <div>
                        {getValues("name") === "" ?
                          <p className="my-account-left-item-rec"></p> :
                          <p className="my-account-left-item-r">{getValues("name")}</p>
                        }
                        
                      </div>
                    </div>
                    <div className="my-account-left-item">
                      <p>
                        Phone <span>*</span>
                      </p>
                      
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        {
                          getValues("phone") === "" ?
                            <span
                              style={{
                                color: "#464646",
                                display: "block",
                                marginRight: 10,
                              }}
                            >
                              +84
                            </span> : ""
                        }
                        {getValues("phone") === "" ?
                          <p className="my-account-left-item-rec"></p> :
                          <p className="my-account-left-item-r">{getValues("phone")}</p>
                        }
                        
                      </Box>
              
                    </div>
                    <div className="my-account-left-item">
                  <p>Password</p>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      sx={{
                        fontWeight: "300",
                        textTransform: "initial",
                        width: "60%",
                        mb: 2,
                      }}
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                  </div>
                  <Changepass open={isChangepassOpen} onClose={handleChangePassword} />
                </div>
                    
                  </div>
                ) : (
                  <div>
                  <form onBlur={handleSubmit(handleSaveBasicInfo)}>
                    <div className="my-account-left-item">
                      <p>Email</p>
                      <div>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              type="email"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Edit />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                         disabled
                        />
                      </div>
                    </div> 
                    <div className="my-account-left-item">
                      <p>
                        Name <span>*</span>
                      </p>
                      <div>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Edit />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="my-account-left-item">
                      <p>
                        Phone <span>*</span>
                      </p>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "#464646",
                            display: "block",
                            marginRight: 10,
                          }}
                        >
                          
                        </span>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Edit />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Box>
                    </div>
                  </form>
                  <div className="my-account-left-item">
                  <p>Password</p>
                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      sx={{
                        fontWeight: "500",
                        textTransform: "initial",
                        width: "100%",
                        mb: 2,
                      }}
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                  </div>
                  <Changepass open={isChangepassOpen} onClose={handleChangePassword} />
                </div>
                </div>
                )
              }
            </Box>}
          </Box>
          {/* shipping */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "80%", lg: "80%", xl: "80%" },
              mt: { xs: 4, sm: 4, md: 6, lg: 6, xl: 6 }
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mb: 2
              }}  
              color={`${isActiveBasic ? "primary" : "primary.dark"}`}
              onClick={handleActiveShipping}
            >
              Shipping address
              <Typography>
                {widthClient <= 600 && isActiveShipping ?
                  <KeyboardArrowUp sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} /> :
                  <KeyboardArrowDown sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} />}
              </Typography>
            </Typography>
            {/* list shipping address */}
            { isActiveShipping && <>
              <div className="list-address">
                {addressList.length > 0 &&
                  addressList.map((item, index) =>
                    isEditing !== item?._id ? (
                      <div
                        className="list-address-item"
                        key={index}
                        onDoubleClick={() => handleDoubleClickItem(item?._id)}
                      >
                        <div className="list-address-item-home">
                          <Home color="primary" />
                          <span>{item.addressName}</span>
                          {item?.isDefault === true ? <p className="circle"></p> : ""}
                          </div>
                        <p>{item.recepient}</p>
                        <p>
                          {item.street1}, {item.city}
                        </p>
                      </div>
                    ) : (
                      <div className="edit-address" key={`add-${index}`}>
                        <div className="my-account-left-item">
                          <p>Name of address</p>
                          <div>
                            <TextField
                              name="addressName"
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                              value={item.addressName}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          </div>
                        </div>
                        <div className="my-account-left-item">
                          <p>
                            Recepient<span>*</span>
                          </p>
                          <div>
                            <TextField
                              name="recepient"
                              variant="outlined"
                              size="small"
                              required
                              sx={{ width: "100%" }}
                              value={item.recepient}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          </div>
                        </div>
                        <div className="my-account-left-item">
                          <p>
                            Phone<span>*</span>
                          </p>
                          <div>
                            <TextField
                              name="phone"
                              variant="outlined"
                              size="small"
                              required
                              sx={{ width: "100%" }}
                              value={item.phone}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          </div>
                        </div>
                        <div className="my-account-left-item">
                          <p>
                            Street 1<span>*</span>
                          </p>
                          <div>
                            <TextField
                              name="street1"
                              variant="outlined"
                              size="small"
                              required
                              sx={{ width: "100%" }}
                              value={item.street1}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          </div>
                        </div>
                        <div className="my-account-left-item">
                          <p>
                            City<span>*</span>
                          </p>
                          <div>
                            <TextField
                              name="city"
                              variant="outlined"
                              size="small"
                              required
                              sx={{ width: "100%" }}
                              value={item.city}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          </div>
                        </div>
                        {/* <FormControlLabel
                          name="addressDefault"
                          control={
                            <Checkbox
                              size="small"
                              color="primary"
                              checked={item.defaultAddress}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
                          }
                        label="Set as default payment method"
                        sx={{ fontSize: "12px!important", color: "#464646" }}
                      /> */}
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          sx={{
                            width: "100%",
                            fontWeight: "500",
                            textTransform: "initial",
                            mb: 1,
                          }}
                          onClick={() => handleUpdateAddItem(item?._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          sx={{
                            width: "100%",
                            fontWeight: "500",
                            textTransform: "initial",
                            mb: 1,
                          }}
                          onClick={() => handleDeleteAddItem(item?._id)}
                        >
                          Delete address
                        </Button>
                      </div>
                    )
                  )}
              </div>
              {/* add shipping address */}
              {inputList.map((item, index) => {
                return (
                  <AddShippingAddress
                    key={index}
                    item={item}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleSaveClick={handleSaveClick}
                    defaultAddress={defaultAddress}
                    setDefaultAddress={setDefaultAddress}
                  />
                );
              })}
              {inputList.length === 0 && addressList.length === 0 && (
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  sx={{
                    width: "100%",
                    fontWeight: "500",
                    textTransform: "initial",
                  }}
                  onClick={handleAddAddressClick}
                >
                  Add an address
                </Button>
              )}
              {addressList.length > 0 && (
              <Button
                variant="outlined"
                size="large"
                color="primary"
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                }}
                onClick={handleAddAddressClick}
              >
                Add another address
              </Button>
              )}
            </>}
          </Box>
        </Grid>
        
      </Grid>
    </div>
  );
}

export function AddShippingAddress({
  item,
  index,
  defaultAddress,
  handleInputChange,
  handleSaveClick,
  setDefaultAddress,
}) {
  return (
    <form onSubmit={handleSaveClick} autoComplete="off">
      <div className="my-account-left-item">
        <p>Name of address</p>
        <div>
          <TextField
            name="addressName"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            value={item.addressName}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      <div className="my-account-left-item">
        <p>
          Recepient<span>*</span>
        </p>
        <div>
          <TextField
            name="recepient"
            variant="outlined"
            size="small"
            required
            sx={{ width: "100%" }}
            value={item.recepient}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      <div className="my-account-left-item">
        <p>
          Street 1<span>*</span>
        </p>
        <div>
          <TextField
            name="street1"
            variant="outlined"
            size="small"
            required
            sx={{ width: "100%" }}
            value={item.street1}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>

      <div className="my-account-left-item">
        <p>
          City<span>*</span>
        </p>
        <div>
          <TextField
            name="city"
            variant="outlined"
            size="small"
            required
            sx={{ width: "100%" }}
            value={item.city}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      <div className="my-account-left-item">
        <p>
          Phone<span>*</span>
        </p>
        <div>
          <TextField
            name="phone"
            variant="outlined"
            size="small"
            required
            sx={{ width: "100%" }}
            value={item.phone}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      {/* <FormControlLabel
        name="addressDefault"
        control={
          <Checkbox
            size="small"
            color="primary"
            checked={item.defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.checked)}
          />
        }
        label="Set as default address"
        sx={{ fontSize: "12px!important", color: "#464646" }}
      /> */}
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
        type="submit"
      >
        Save address
      </Button>
    </form>
  );
}
