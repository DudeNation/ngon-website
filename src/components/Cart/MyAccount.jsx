import { Edit, Home, KeyboardArrowDown, KeyboardArrowUp, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import visa from "../../assets/images/visa.png";
import master_card from "../../assets/images/master_card.png";
import momo from "../../assets/images/momo.png";
import zalo from "../../assets/images/zalo.png";
import paypal from "../../assets/images/paypal.png";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { findDebitCardType, minLength, stripeCardExpirValidation, stripeCardNumberValidation } from "../../utils/validation";
import { CVC_INFO, EXPIRYDATE, OTHERCARDS } from "../../constants/creditcard";

const initInputPayment = {
  id: 0,
  paymentMethod: "",
  creditMethod: "",
  ewallet: "",
  cardHolder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  status: 0
};

export default function MyAccount() {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_INFO));
  const navigate = useNavigate();
  const [inputList, setInputList] = useState([]);
  const [addressList, setAddressList] = useState(() => {
    const addresses = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.SHIPPING_ADDRESS)
    );
    return addresses || [];
  });
  const [isEditing, setIsEditing] = useState("");
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: user.name ? user.name : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      password: user.password ? user.password : "",
      email: user.email ? user.email : "",
    },
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditMethod, setCreditMethod] = useState("");
  const [eWalletMethod, setEWalletMethod] = useState("");
  const [inputPaymentMethod, setInputPaymentMethod] = useState([initInputPayment]);
  const [listPaymentMethod, setListPaymentMethod] = useState(() => {
    const methods = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.PAYMENT_METHOD)
    );
    return methods || [];
  });
  const [activePayment, setActivePayment] = useState(-1);
  const [defaultPayment, setDefaultPayment] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const refContainer = useRef(null);
  const [widthClient, setWidthClient] = useState(0);
  const [isActiveBasic, setIsActiveBasic] = useState(true);
  const [isActiveShipping, setIsActiveShipping] = useState(true);
  const [isActivePayment, setIsActivePayment] = useState(true);

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

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.SHIPPING_ADDRESS,
      JSON.stringify(addressList)
    );
  }, [addressList]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.PAYMENT_METHOD,
      JSON.stringify(listPaymentMethod)
    );
  }, [listPaymentMethod]);

  // basic information
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

  const handleUpdateAddItem = () => {
    setIsEditing("");
  };

  const handleDeleteAddItem = (id) => {
    const list = [...addressList];
    const remove = list.filter((_, indexFilter) => !(indexFilter === id));
    setAddressList(remove);
    setIsEditing("");
  };

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
        id: Math.floor(Math.random() * 1000),
        addressName: "",
        recepient: "",
        street1: "",
        street2: "",
        city: "",
        phoneShipping: "",
        status: false
      },
    ]);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    const newData = inputList?.map((item) => {
      return {
        ...item,
        status: defaultAddress
      }
    })
    const addressListStatus = addressList?.filter(item => item?.status === true);
    if (addressListStatus.length === 1 && defaultAddress === true) {
      alert("There is a default address you cannot add a different default address.")
    } else {
      setAddressList([...addressList, ...newData]);
      setInputList([]);
    }
  };

  const handleSaveBasicInfo = (data) => {
    localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(data));
    setIsEditingInfo(false);
  };

  // payment method
  const handleChangePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  // const handleSetDefaultStatus = (e) => {
  //   setDefaultPayment(e.target.value);
  // };

  const handleChangeInputCreditCard = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputPaymentMethod];
    list[index][name] = value;
    list[index]["creditMethod"] = creditMethod;
    list[index]["ewallet"] = eWalletMethod;
    setInputPaymentMethod(list);
  };

  const handleOpenCreditCard = () => {
    setIsOpen(true);
    const method =
      paymentMethod === "creditCard"
        ? "creditCard"
        : paymentMethod === "cashOnDelivery"
        ? "cashOnDelivery"
          ? paymentMethod === "eWallet"
          : "eWallet"
        : "";
    if (paymentMethod === "creditCard" && inputPaymentMethod.length === 1) {
      const newData = inputPaymentMethod.map((item) => {
        return {
          ...item,
          id: Math.floor(Math.random() * 5000),
          paymentMethod: method,
          creditMethod: creditMethod,
          ewallet: eWalletMethod,
        }
      })
      setInputPaymentMethod(newData);
      // setInputPaymentMethod([
      //   ...inputPaymentMethod,
      //   {
      //     id: Math.floor(Math.random() * 5000),
      //     paymentMethod: method,
      //     creditMethod: creditMethod,
      //     ewallet: eWalletMethod,
      //     cardHolder: "",
      //     cardNumber: "",
      //     month: "",
      //     year: "",
      //     cvv: "",
      //     status: 0
      //   },
      // ]);
    } else {
      return;
    }
  };


  const handleAddPayment = () => {
    if (paymentMethod === 'eWallet') {
      const newData = inputPaymentMethod.map((item) => {
        return {
          ...item,
          id: Math.floor(Math.random() * 5000),
          paymentMethod: "eWallet",
          creditMethod: "",
          ewallet: eWalletMethod,
          cardHolder: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
          status: defaultPayment
        }
      })
      const newList = [...listPaymentMethod, ...newData];
      if (newList.length > listPaymentMethod.length) {
        setListPaymentMethod(newList);
        setInputPaymentMethod([initInputPayment]);
        setIsOpen(false);
        setCreditMethod("");
        setEWalletMethod("");
        setPaymentMethod("");
      }
    }
    if (paymentMethod === 'creditCard') {
      const newData2 = inputPaymentMethod.map((item) => {
        return {
          ...item,
          status: defaultPayment
        }
      })
      setListPaymentMethod([...listPaymentMethod, ...newData2]);
      setInputPaymentMethod([initInputPayment]);
      setIsOpen(false);
      setCreditMethod("");
      setEWalletMethod("");
      setPaymentMethod("");
    }
  };

  const addAnotherPayment = () => {
    if (paymentMethod === 'eWallet') {
      // const data = {
      //   id: Math.floor(Math.random() * 5000),
      //   paymentMethod: "eWallet",
      //   creditMethod: "",
      //   ewallet: eWalletMethod,
      //   cardHolder: "",
      //   cardNumber: "",
      //   month: "",
      //   year: "",
      //   cvv: "",
      //   status: 0
      // }
      const newData = inputPaymentMethod.map((item) => {
        return {
          ...item,
          id: Math.floor(Math.random() * 5000),
          paymentMethod: "eWallet",
          creditMethod: "",
          ewallet: eWalletMethod,
          cardHolder: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
          status: defaultPayment
        }
      })
      const newList = [...listPaymentMethod, ...newData];
      const paymentListStatus = listPaymentMethod?.filter(item => item?.status === true);
      if (paymentListStatus.length === 1 && defaultPayment === true) {
        alert("There is a default payment method you cannot add a different default payment method.")
      } else {
        if (newList.length > listPaymentMethod.length) {
          setListPaymentMethod(newList);
          setInputPaymentMethod([initInputPayment]);
          setIsOpen(false);
          setCreditMethod("");
          setEWalletMethod("");
          setPaymentMethod("");
        }
      }
    }
    if (paymentMethod === 'creditCard') {
      const newData3 = inputPaymentMethod.map((item) => {
        return {
          ...item,
          status: defaultPayment
        }
      })
      const paymentListStatus = listPaymentMethod?.filter(item => item?.status === true);
      if (paymentListStatus.length === 1 && defaultPayment === true) {
        alert("There is a default payment method you cannot add a different default payment method.")
      } else {
        // setInputPaymentMethod([initInputPayment]);
        // setListPaymentMethod([...listPaymentMethod, ...inputPaymentMethod]);
        setListPaymentMethod([...listPaymentMethod, ...newData3]);
        setInputPaymentMethod([initInputPayment]);
        setIsOpen(false);
        setCreditMethod("");
        setEWalletMethod("");
        setPaymentMethod("");
      }
    }
  };

  const onDeletePayment = (activeIndex) => {
    const list = [...listPaymentMethod];
    const remove = list.filter((_, indexFilter) => !(indexFilter === activeIndex));
    setListPaymentMethod(remove);
    // setInputPaymentMethod([]);
    setInputPaymentMethod([initInputPayment]);
    setActivePayment(-1);
  }
  
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
    localStorage.removeItem(LOCAL_STORAGE.SHIPPING_ADDRESS);
    localStorage.removeItem(LOCAL_STORAGE.PAYMENT_METHOD);
    localStorage.removeItem(LOCAL_STORAGE.ORDER_LIST);
    localStorage.removeItem(LOCAL_STORAGE.CART_LIST);
    navigate("/");
  };

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "cardNumber":
        setCreditMethod(findDebitCardType(value));
        errorText = stripeCardNumberValidation(value);
        setError({ ...error, cardError: errorText });
        break;
      case "cardHolder":
        errorText = value === "" ? "This is equired" : "";
        setError({ ...error, cardHodlerError: errorText });
        break;
      case "expiry":
        errorText =
          value === "" ? "This is equired" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "cvv":
        errorText = value === "" ? "This is equired" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  const handleBlurCreditCard = (e) => {
    handleValidations(e.target.name, e.target.value);
  };

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

  const handleActivePayment = () => {
    if (widthClient <= 600) {
      setIsActivePayment(!isActivePayment);
    } else {
      return;
    }
  }

  return (
    <div className="my-account" ref={refContainer}>
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
            {isActiveBasic && <Box sx={{ width: "80%" }}>
              {
                !isEditingInfo ? (
                  <div onDoubleClick={handleDoubleClickBasicInfo}>
                    <div className="my-account-left-item">
                      <p>
                        Name <span>*</span>
                      </p>
                      <div>
                        {getValues("name") === "" ?
                          <p className="my-account-left-item-rec"></p> :
                          <p className="my-account-left-item-r">{getValues("name")}</p>
                        }
                        {/* <TextField
                          name="name"
                          value={getValues("name")}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          disabled
                        /> */}
                      </div>
                    </div>
                    <div className="my-account-left-item">
                      <p>
                        Phone <span>*</span>
                      </p>
                      {/* <div>
                        {getValues("phoneNumber") === "" ?
                            <p className="my-account-left-item-rec"></p> :
                            <p className="my-account-left-item-r">{getValues("phoneNumber")}</p>
                          }
                        <p className="my-account-left-item-r">+84{getValues("phoneNumber")}</p>
                      </div> */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        {
                          getValues("phoneNumber") === "" ?
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
                        {getValues("phoneNumber") === "" ?
                          <p className="my-account-left-item-rec"></p> :
                          <p className="my-account-left-item-r">{getValues("phoneNumber")}</p>
                        }
                      </Box>
                      {/* <Box
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
                          +84
                        </span>
                        <TextField
                          name="phoneNumber"
                          value={getValues("phoneNumber")}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          disabled
                        />
                      </Box> */}
                    </div>
                    <div className="my-account-left-item">
                      <p>Password</p>
                      <div>
                        <div className="my-account-left-item-r2">
                          <input
                            value={getValues("password")}
                            type="password"
                          />
                          {/* <p>{getValues("password")}</p> */}
                          <VisibilityOff />
                        </div>
                        {/* <TextField
                          name="password"
                          value={getValues("password")}
                          type="password"
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" , border: "none", outline: "none"}}
                          disabled
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <VisibilityOff />
                              </InputAdornment>
                            )
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className="my-account-left-item">
                      <p>Email</p>
                      <div>
                        <p className="my-account-left-item-r">{getValues("email")}</p>
                        {/* <TextField
                          name="email"
                          value={getValues("email")}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          disabled
                        /> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onBlur={handleSubmit(handleSaveBasicInfo)}>
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
                          +84
                        </span>
                        <Controller
                          name="phoneNumber"
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
                    <div className="my-account-left-item">
                      <p>Password</p>
                      <div>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              type="password"
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
                        />
                      </div>
                    </div>
                  </form>
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
                    isEditing !== item?.id ? (
                      <div
                        className="list-address-item"
                        key={index}
                        onDoubleClick={() => handleDoubleClickItem(item?.id)}
                      >
                        <div className="list-address-item-home">
                          <Home color="primary" />
                          <span>{item.addressName}</span>
                          {item?.status === true ? <p className="circle"></p> : ""}
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
                          <p>Street 2</p>
                          <div>
                            <TextField
                              name="street2"
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                              value={item.street2}
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
                        <div className="my-account-left-item">
                          <p>
                            Phone<span>*</span>
                          </p>
                          <div>
                            <TextField
                              name="phoneShipping"
                              variant="outlined"
                              size="small"
                              required
                              sx={{ width: "100%" }}
                              value={item.phoneShipping}
                              onChange={(e) => handleEditAddress(e, index)}
                            />
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
                            mb: 1,
                          }}
                          onClick={handleUpdateAddItem}
                        >
                          Update address
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
                          onClick={() => handleDeleteAddItem(index)}
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
        <Grid item xs={12} md={6} lg={6}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start"
            }}  
            color={`${isActivePayment ? "primary" : "primary.dark"}`}
            onClick={handleActivePayment}
          >
            Payment method
            <Typography>
              {widthClient <= 600 && isActivePayment ?
                <KeyboardArrowUp sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} /> :
                <KeyboardArrowDown sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "none", } }} />}
            </Typography>
          </Typography>
          {isActivePayment && <>
            {/* list payment method */}
            <div className="payment-list">
              {listPaymentMethod.length > 0 &&
                listPaymentMethod.map((item, index) => {
                  return (
                    <div
                      className={`${index === activePayment ? "payment-list-item p-active" : "payment-list-item"}`}
                      key={index}
                      onClick={() => setActivePayment(index)}
                    >
                      <p className="payment-list-item-name">
                        <span>
                          {
                            item?.paymentMethod === "creditCard" && item?.creditMethod === "masterCard" ? "Master Card"
                            : item?.paymentMethod === "creditCard" && item?.creditMethod === "visa" ? "Visa Card"
                            : item?.ewallet === "momo" ? "MOMO wallet"
                            : item?.ewallet === "zalo" ? "ZALO PAY wallet"
                            : item?.ewallet === "paypal" ? "PAYPAL wallet"
                            : ""
                          }
                        </span>
                        {Number(item?.status) === 1 ? <span className="payment-list-item-name-dot"></span> : ""}
                      </p>
                      <div className="payment-list-item-info">
                        <div className="info-image">
                          {item?.paymentMethod === "creditCard" &&
                          item?.creditMethod === "masterCard" ? (
                            <img src={master_card} alt="payment-img" />
                          ) : item?.paymentMethod === "creditCard" &&
                            item?.creditMethod === "visa" ? (
                            <img src={visa} alt="payment-img" />
                          ) : item?.ewallet === "momo" ? (
                            <img src={momo} alt="payment-img" className="momo" />
                          ) : item?.ewallet === "zalo" ? (
                            <img src={zalo} alt="payment-img" className="zalo" />
                          ) : item?.ewallet === "paypal" ? (
                            <img
                              src={paypal}
                              alt="payment-img"
                              className="paypal"
                            />
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="info-card">
                          <p className="info-card-num">
                            {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa") ? (
                              <>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>

                                <p
                                  className="info-card-num-hide"
                                  style={{ marginLeft: "5px " }}
                                ></p>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>

                                <p
                                  className="info-card-num-hide"
                                  style={{ marginLeft: "5px " }}
                                ></p>
                                <p className="info-card-num-hide"></p>
                                <p className="info-card-num-hide"></p>
                                <p
                                  className="info-card-num-hide"
                                  style={{ marginRight: "5px " }}
                                ></p>
                              </>
                            ) : (
                              ""
                            )}

                            <p>
                              {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa")
                                ? item?.cardNumber?.slice(-4)
                                : user?.name}
                            </p>
                          </p>
                          <p>
                            {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa")
                              ? item?.expiry
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* add payment method */}
            <Box sx={{ width: "100%" }}>
              <Box my={2}>
                <FormControl sx={{ width: "100%" }}>
                  <RadioGroup
                    name="controlled-radio-buttons-group"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                    onChange={handleChangePayment}
                  >
                    <FormControlLabel
                      value="creditCard"
                      control={<Radio />}
                      label="Credit/Debit card"
                      sx={{ color: "#464646" }}
                      onClick={() => {
                        setPaymentMethod("creditCard");
                        handleOpenCreditCard()
                      }}
                    />
                    <FormControlLabel
                      value="cashOnDelivery"
                      control={<Radio />}
                      label="Cash on delivery (COD)"
                      sx={{ color: "#464646" }}
                    />
                    <FormControlLabel
                      value="eWallet"
                      control={<Radio />}
                      label="E-wallet"
                      sx={{ color: "#464646" }}
                      onClick={() => {
                        setPaymentMethod("eWallet");
                        handleOpenCreditCard()
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <div className="payment-method">
                {paymentMethod === "creditCard" && isOpen &&
                  inputPaymentMethod.map((item, index) => {
                    return (
                      <div className="payment-method-credit" key={index}>
                          {
                          creditMethod === "" ?
                            (<div className="payment-method-credit-img" style={{ opacity: 0.5}}>
                              <div>
                                <img src={visa} alt="visa" style={{ backgroundColor: "#A1A1A1"}} />
                              </div>
                              <div>
                                <img src={master_card} alt="master_card" style={{ backgroundColor: "#A1A1A1"}} />
                              </div>
                            </div>) :
                            (<div className="payment-method-credit-img">
                              <div
                                className={`${
                                  creditMethod === "visa" ? "active" : "not-active"
                                }`}
                              >
                                <img src={visa} alt="visa" />
                              </div>
                              <div
                                className={`${
                                  creditMethod === "masterCard" ? "active" : "not-active"
                                }`}
                              >
                                <img src={master_card} alt="master_card" />
                              </div>
                            {/* {(!error || !error.cardError) && CARDARR.includes(creditMethod) && (
                              <div>
                                <img src={CARDICON[creditMethod]} alt="card" />
                              </div>
                            )} */}
                            </div>)
                        }
                        <div className="payment-method-credit-form">
                          <div className="my-account-left-item">
                            <p>Card holder</p>
                            {/* <div>
                              <TextField
                                name="cardHolder"
                                variant="outlined"
                                size="small"
                                sx={{ width: "100%" }}
                                value={item.cardHolder}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                              />
                            </div> */}
                          <div className="wrapper-input">
                            <input
                              name="cardHolder"
                              required
                              value={item.cardHolder}
                              onChange={(e) =>
                                handleChangeInputCreditCard(e, index)
                              }
                              onBlur={handleBlurCreditCard}
                            />
                            {error &&
                              error.cardHodlerError &&
                              error.cardHodlerError.length > 1 && (
                                <span className="wrapper-err">{error.cardHodlerError}</span>
                              )}
                          </div>
                          </div>
                          <div className="my-account-left-item">
                            <p>Card number</p>
                            {/* <div>
                              <TextField
                                name="cardNumber"
                                variant="outlined"
                                size="small"
                                sx={{ width: "100%" }}
                                value={item.cardNumber}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                              />
                            </div> */}
                            <div className="wrapper-input">
                              <MaskedInput
                                mask={OTHERCARDS}
                                guide={false}
                                placeholderChar={"\u2000"}
                                name="cardNumber"
                                required
                                value={item.cardNumber}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                                onBlur={handleBlurCreditCard}
                              />
                              {/* {(!error || !error.cardError) && CARDARR.includes(cardType) && (
                                <img
                                  style={{
                                    float: "right",
                                    position: "relative",
                                    top: "-35px"
                                  }}
                                  src={CARDICON[cardType]}
                                  alt="card"
                                  width="50px"
                                  height="33px"
                                />
                              )} */}
                              {error && error.cardError && error.cardError.length > 1 && (
                                <span className="wrapper-err">{error.cardError}</span>
                              )} 
                            </div>
                          </div>
                          <div className="my-account-left-item">
                            <p>Expire date</p>
                            {/* <div>
                              <TextField
                                name="month"
                                variant="outlined"
                                size="small"
                                sx={{
                                  width: { xs: "20%", md: "10%", lg: "10%", xl: "10%" },
                                  mr: 1,
                                }}
                                placeholder="MM"
                                value={item.month}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                              />
                              <TextField
                                name="year"
                                variant="outlined"
                                size="small"
                                sx={{
                                  width: { xs: "20%", md: "10%", lg: "10%", xl: "10%" },
                                  mr: 1,
                                }}
                                placeholder="YY"
                                value={item.year}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                              />
                            </div> */}
                            
                          <div className="wrapper-input">
                            <MaskedInput
                              mask={EXPIRYDATE}
                              guide={false}
                              name="expiry"
                              required
                              placeholderChar={"\u2000"}
                              placeholder="MM/YY"
                              value={item.expiry}
                              onChange={(e) =>
                                handleChangeInputCreditCard(e, index)
                              }
                              onBlur={handleBlurCreditCard}
                            />
                            {error &&
                              error.expiryError &&
                              error.expiryError.length > 1 && (
                                <span className="wrapper-err">{error.expiryError}</span>
                              )}
                          </div>
                          </div>
                          <div className="my-account-left-item">
                            <p>CVV</p>
                            {/* <div>
                              <TextField
                                name="cvv"
                                variant="outlined"
                                size="small"
                                sx={{
                                  width: { xs: "20%", md: "15%", lg: "15%", xl: "15%" },
                                  mr: 1,
                                }}
                                value={item.cvv}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                              />
                              <span
                                style={{
                                  color: "#A1A1A1",
                                  margin: "8px 0",
                                  display: "inline-block",
                                }}
                              >
                                3 digits on the back
                              </span>
                            </div> */}
                            <div className="wrapper-input">
                              <MaskedInput
                                mask={CVC_INFO}
                                guide={false}
                                name="cvv"
                                required
                                placeholderChar={"\u2000"}
                                value={item.cvv}
                                onChange={(e) =>
                                  handleChangeInputCreditCard(e, index)
                                }
                                style={{ width: "20%", marginRight: "16px" }}
                                onBlur={handleBlurCreditCard}
                              />
                              <span
                                style={{
                                  color: "#A1A1A1",
                                  margin: "8px 0",
                                  display: "inline-block",
                                }}
                              >
                                3 digits on the back
                              </span>
                            {error &&
                              error.securityCodeError &&
                              error.securityCodeError.length > 1 && (
                                <p className="wrapper-err">{error.securityCodeError}</p>
                              )}
                          </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {paymentMethod === "cashOnDelivery" && (
                  <div className="payment-method-cash"></div>
                )}
                {paymentMethod === "eWallet" && isOpen ? (
                  <div className="payment-method-ewallet">
                    <div
                      onClick={() => setEWalletMethod("momo")}
                      className={`momo ${
                        eWalletMethod === "momo" ? "active-img" : ""
                      }`}
                    >
                      <img src={momo} alt="momo" />
                    </div>
                    <div
                      onClick={() => setEWalletMethod("paypal")}
                      className={`paypal ${
                        eWalletMethod === "paypal" ? "active-img" : ""
                      }`}
                    >
                      <img src={paypal} alt="paypal" />
                    </div>
                    <div
                      onClick={() => setEWalletMethod("zalo")}
                      className={`zalo ${
                        eWalletMethod === "zalo" ? "active-img" : ""
                      }`}
                    >
                      <img src={zalo} alt="zalo" />
                    </div>
                  </div>
                ) : ""}
              </div>
              <Box>
                {/* <FormControlLabel
                  name="paymentDefault"
                  value={1}
                  control={<Radio size="small" />}
                  label="Set as default payment method"
                  sx={{ fontSize: "12px!important", color: "#464646" }}
                  onChange={handleSetDefaultStatus}
                /> */}
                <FormControlLabel
                  name="paymentDefault"
                  control={
                    <Checkbox
                      size="small"
                      color="primary"
                      checked={defaultPayment}
                      onChange={(e) => setDefaultPayment(e.target.checked)}
                    />
                  }
                label="Set as default payment method"
                sx={{ fontSize: "12px!important", color: "#464646" }}
              />
                {listPaymentMethod.length === 0 && (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{
                      width: "100%",
                      fontWeight: "500",
                      textTransform: "initial",
                    }}
                    onClick={handleAddPayment}
                  >
                    Add payment method
                  </Button>
                )}
                {listPaymentMethod.length > 0 && (
                  <Button
                    variant="outlined"
                    size="medium"
                    color="primary"
                    sx={{
                      width: "100%",
                      fontWeight: "500",
                      textTransform: "initial",
                      mt: 2
                    }}
                    onClick={addAnotherPayment}
                  >
                    Add another payment method
                  </Button>
                )}
                {
                  activePayment !== -1 ?
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    sx={{
                      width: "100%",
                      fontWeight: "500",
                      textTransform: "initial",
                      mt: 2
                    }}
                    onClick={() => onDeletePayment(activePayment)}
                  >
                    Delete
                  </Button> : ""
                }
              </Box>
            </Box>
          </>}
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
        <p>Street 2</p>
        <div>
          <TextField
            name="street2"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            value={item.street2}
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
            name="phoneShipping"
            variant="outlined"
            size="small"
            required
            sx={{ width: "100%" }}
            value={item.phoneShipping}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      <FormControlLabel
        name="addressDefault"
        control={
          <Checkbox
            size="small"
            color="primary"
            checked={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.checked)}
          />
        }
        label="Set as default address"
        sx={{ fontSize: "12px!important", color: "#464646" }}
      />
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
