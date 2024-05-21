import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, DeleteOutline, ShoppingCart } from "@mui/icons-material";
import menuApi from "../api/menuApi";
import { LOCAL_STORAGE } from "../constants/endpoint";
import visa from "../assets/images/visa.png";
import master_card from "../assets/images/master_card.png";
import momo from "../assets/images/momo.png";
import zalo from "../assets/images/zalo.png";
import paypal from "../assets/images/paypal.png";
import logo from "../assets/images/logo.png";
import { MoneyFormat } from "../utils/moneyFormat";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, increaseQuantityAction, removeCartDataAction, setCartDataAction } from "../redux/action/cartAction";

export default function MyCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_INFO));
  const [noodleList, setNoodleList] = useState([]);
  const addressList =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE.SHIPPING_ADDRESS)) || [];
  const paymentMethodList =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE.PAYMENT_METHOD)) || [];
  
  const cartList = useSelector((state) => state.cart.cartList);
  
  // const [cartList, setCartList] = useState(() => {
  //   const carts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE.CART_LIST)
  //   );
  //   return carts || [];
  // });
  const [orderList, setOrderList] = useState(() => {
    const orders = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.ORDER_LIST)
    );
    return orders || [];
  });
  
  const totalAmount = cartList.reduce((acc, cur) => {
    acc += cur?.product.price * cur.quantity;
    return acc;
  }, 0) || 0;

  const findStatus = paymentMethodList?.find((item) => item?.status === true);
  const checkDefaultStatus = `${(findStatus === undefined || findStatus === null) ? "cashOnDelivery" :
    (findStatus?.paymentMethod !== "" && findStatus?.creditMethod !== "" ? findStatus?.creditMethod :
      findStatus?.ewallet !== "" ? findStatus?.ewallet : "")
    }`;
  
  const findAddressStatus = addressList?.find((item) => item?.status === true);
  const checkDefaultAddressStatus = (findAddressStatus === undefined || findAddressStatus === null) ? "" :
    `${findAddressStatus?.recepient}, ${findAddressStatus?.addressName}, ${findAddressStatus?.street1}, ${findAddressStatus?.city}`;

  const [address, setAddress] = useState(`${checkDefaultAddressStatus}`);
  const [paymentMethod, setPaymentMethod] = useState(`${checkDefaultStatus}`);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [newOrderCart, setNewOrderCart] = useState();

  const randomOrderNumber = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.CART_LIST,
      JSON.stringify(cartList)
    );
    localStorage.setItem(
      LOCAL_STORAGE.ORDER_LIST,
      JSON.stringify(orderList)
    );
  }, [cartList, orderList]);

  useEffect(() => {
    const getNoodle = async () => {
      try {
        setProductLoading(true);
        const response = await menuApi.getAllNoodle();
        setNoodleList(response?.data.slice(0,4));
        setProductLoading(false);
      } catch (error) {
        console.log(error?.message);
        setProductLoading(false);
      }
    };
    getNoodle();
  }, []);

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeleteCart = (index) => {
    // const data = [...cartList];
    // const newData = data.filter((_, indexFilter) => !(indexFilter === index));
    // setCartList(newData);
    dispatch(removeCartDataAction(index));
  }

  const handleChangeQty = (index, qty)  => {
    // const newCarts = cartList.map((cart) => {
    //   if (cart.product.id === cartId) {
    //     cart.quantity = qty;
    //   }
    //   return cart;
    // });
    // setCartList(newCarts);
    dispatch(increaseQuantityAction({ index, qty }));
  };

  const handleAddOtherCart = (item) => {
    const data = {
			product: item,
      quantity: 1,
      note: "",
    }
    dispatch(addToCartAction(data));
    // setCartList([...cartList, data]);
  }

  const handleCheckout = () => {
    const orderData = {
      orderId: randomOrderNumber(10000, 100000000),
      createTime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      receiveTime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      email: user?.email,
      status: 1,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      amount: totalAmount,
      carts: cartList
    }
    if (cartList?.length === 0) {
      alert("No product to order!Please choose a product.");
    }
    if (address === "") {
      alert("Please choose an address.");
    }
    if (address !== "" && cartList.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setNewOrderCart(orderData);
        setOrderList([...orderList, orderData]);
        setOpen(true);
        setLoading(false);
        dispatch(setCartDataAction([]));
        // setCartList([]);
      }, 2000);
    }
  };

  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        navigate('/my-page');
        window.scrollTo(0, 0);
      }, 3000);
    }
  }, [open, navigate])

  const PaymentMethodName = (payment) => {
    let name = "";
    switch (payment) {
      case "cashOnDelivery":
        name = "Cash on delivery";
        break;
      case "visa":
        name = "Visa Card";
        break;
      case "masterCard":
        name = "Master Card";
        break;
      case "momo":
        name = "MOMO wallet";
        break;
      case "paypal":
        name = "Paypal wallet";
        break;
      case "zalo":
        name = "ZALO PAY wallet";
        break;
      default:
        name = "Cash on delivery";
        break;
    }
    return name;
  }

  return (
    <div className="my-cart container">
      <Header />
      {
        user?.email && user?.email !== '' ?
          (<div className="my-cart-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ width: "90% " }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography color="primary" variant="h6" fontWeight="bold">
                      My cart
                    </Typography>
                    <Typography
                      color="grey.dark"
                      sx={{ marginTop: "4px", ml: 1, fontSize: "13px" }}
                    >
                      {cartList.length <= 1 ? `${cartList.length} item` : `${cartList.length} items`}
                    </Typography>
                  </Box>
                  {/* list-cart */}
                  <Box>
                    {
                      cartList.length > 0 ? cartList.map((cart, index) => {
                        return (
                          <CartItem
                            key={index}
                            item={cart}
                            onDeleteCart={() => handleDeleteCart(index)}
                            onChangeQty={() => handleChangeQty(index, cart.quantity + 1)}
                            // onChangeQty={() => handleChangeQty(cart)}
                          />
                        )
                      }) : <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ShoppingCart sx={{ color: "#A1A1A1", fontSize: { xs: "96px", md: "128px", lg: "164px" }, opacity: 0.5 }} />
                      </Box>
                    }
                  </Box>
                  {/* these items */}
                  <Box mt={5}>
                    <Typography
                      color="primary"
                      variant="h6"
                      fontWeight="bold"
                      mb={2}
                    >
                      How about these items?
                    </Typography>
                    {
                      productLoading ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <CircularProgress color="primary" />
                      </Box> :
                        <Grid container spacing={2}>
                          {noodleList.map((item, index) => {
                            return (
                              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                                <OtherCartItem
                                  item={item}
                                  onAddOtherCart={() => handleAddOtherCart(item)}
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                    }
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
                      onClick={() => navigate("/menu")}
                    >
                      Go to the menu
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography color="primary" variant="h6" fontWeight="bold">
                  My order
                </Typography>
                <div className="my-order">
                  <div className="my-order-deliver">
                    <div className="my-order-deliver-item">
                      <p className="my-order-title">Delivery to</p>
                      <FormControl sx={{ width: "100%" }}>
                        <RadioGroup
                          name="controlled-radio-buttons-group"
                          onChange={handleChangeAddress}
                          defaultValue={
                            `${(findAddressStatus === undefined || findAddressStatus === null) ? "" : 
                            `${findAddressStatus?.recepient}, ${findAddressStatus?.addressName}, ${findAddressStatus?.street1}, ${findAddressStatus?.city}`
                            }`
                          }
                        >
                          {addressList.length > 0 &&
                            addressList.map((item, index) => {
                              return (
                                <FormControlLabel
                                  key={index}
                                  name={`address-${index + 1}`}
                                  value={`${item?.recepient}, ${item?.addressName}, ${item?.street1}, ${item?.city}`}
                                  control={<Radio size="small" />}
                                  label={
                                    <p style={{ color: "#A1A1A1" }}>
                                      <span
                                        style={{
                                          display: "inline-block",
                                          marginRight: "5px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {item?.addressName}
                                      </span>
                                      {item?.street1}, {item?.city}
                                    </p>
                                  }
                                  sx={{
                                    width: "100%",
                                    backgroundColor: "#F5F5F5",
                                    borderRadius: "10px",
                                    padding: "2px 5px 2px 5px",
                                    margin: "4px",
                                  }}
                                />
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="my-order-payment title-top">
                    <p className="my-order-title">Payment method</p>
                    <FormControl sx={{ width: "100%" }} required>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                        onChange={handleChangePaymentMethod}
                        defaultValue={
                          `${(findStatus === undefined || findStatus === null) ? "cashOnDelivery" : 
                            (findStatus?.paymentMethod !== "" && findStatus?.creditMethod !== "" ? findStatus?.creditMethod :
                            findStatus?.ewallet !== "" ? findStatus?.ewallet : "")
                          }`
                        }
                      >
                        {paymentMethodList.length > 0 &&
                          paymentMethodList.map((item, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                name={`payment-${index}`}
                                value={`${item?.paymentMethod !== "" && item?.creditMethod !== "" ? item?.creditMethod :
                                    item?.ewallet !== "" ? item?.ewallet : ""
                                  }`}
                                control={<Radio size="small" />}
                                label={
                                  <div className="order-payment-item">
                                    <div className="order-payment-item-image">
                                      {item?.paymentMethod === "creditCard" &&
                                        item?.creditMethod === "masterCard" ? (
                                        <img src={master_card} alt="payment-img" />
                                      ) : item?.paymentMethod === "creditCard" &&
                                        item?.creditMethod === "visa" ? (
                                        <img src={visa} alt="payment-img" />
                                      ) : item?.ewallet === "momo" ? (
                                        <img
                                          src={momo}
                                          alt="payment-img"
                                          className="momo"
                                        />
                                      ) : item?.ewallet === "zalo" ? (
                                        <img
                                          src={zalo}
                                          alt="payment-img"
                                          className="zalo"
                                        />
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
                                    <div className="order-payment-item-card">
                                      <p className="card-num">
                                        {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa") ? (
                                          <>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>

                                            <p
                                              className="card-num-hide"
                                              style={{ marginLeft: "5px " }}
                                            ></p>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>

                                            <p
                                              className="card-num-hide"
                                              style={{ marginLeft: "5px " }}
                                            ></p>
                                            <p className="card-num-hide"></p>
                                            <p className="card-num-hide"></p>
                                            <p
                                              className="card-num-hide"
                                              style={{ marginRight: "5px " }}
                                            ></p>
                                          </>
                                        ) : (
                                          ""
                                        )}

                                        <p>
                                          {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa")
                                            ? item?.cardNumber?.slice(-4)
                                            : `${PaymentMethodName(item?.ewallet)}`}
                                        </p>
                                      </p>
                                      <p>
                                        {item?.paymentMethod === "creditCard" && (item?.creditMethod === "masterCard" || item?.creditMethod === "visa")
                                          ? item?.expiry
                                          : user?.name}
                                      </p>
                                    </div>
                                  </div>
                                }
                                sx={{
                                  width: "100%",
                                  backgroundColor: "#F5F5F5",
                                  borderRadius: "10px",
                                  padding: "2px 5px 2px 5px",
                                  margin: "4px",
                                }}
                              />
                            );
                          })}
                        <FormControlLabel
                          name={`payment-cod`}
                          value={`cashOnDelivery`}
                          control={<Radio size="small" />}
                          label={
                            <p style={{ color: "#A1A1A1" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                }}
                              >
                                COD
                              </span>
                              Cash on delivery
                            </p>
                          }
                          sx={{
                            width: "100%",
                            backgroundColor: "#F5F5F5",
                            borderRadius: "10px",
                            padding: "2px 5px 2px 5px",
                            margin: "4px",
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="my-order-coupon title-top">
                    <p className="my-order-title">Coupon
                      <span style={{ display: "inline-block", marginLeft: "5px", color: "#BF3A00" }}>1 available</span>
                    </p>
                    <FormControl sx={{ width: "100%" }}>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          name={`coupon`}
                          value="65"
                          checked
                          control={<Radio size="small" />}
                          label={
                            <p style={{ color: "#A1A1A1" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                }}
                              >
                                Freeship
                              </span>
                              1/4/2024-30/4/2024
                            </p>
                          }
                          sx={{
                            width: "100%",
                            backgroundColor: "#F5F5F5",
                            borderRadius: "10px",
                            padding: "2px 5px 2px 5px",
                            margin: "4px",
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="my-order-summary title-top">
                    <p className="my-order-title">Order sumary</p>
                    <div className="my-order-summary-main">
                      {
                        cartList.map((item, index) => {
                          return (
                            <div className="main-item" key={index}>
                              <p>{item?.product.title}
                                <span style={{ display: "inline-block", marginLeft: "20px" }}>x{item?.quantity}</span>
                              </p>
                              <p>{item?.product.price * item?.quantity}k</p>
                            </div>
                          )
                        })
                      }
                      <div className="main-item">
                        <p>Delivery fee</p>
                        <p>{`${cartList.length === 0 ? "0k" : "65k"}`}</p>
                      </div>
                      <div className="main-item">
                        <p>Coupon</p>
                        <p className="main-item-coupon">{`${cartList.length === 0 ? "0k" : "-65k"}`}</p>
                      </div>
                      <div className="main-item">
                        <p>Total</p>
                        <p className="main-item-total">{totalAmount}k</p>
                      </div>
                    </div>
                  </div>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      sx={{
                        width: "100%",
                        fontWeight: "500",
                        textTransform: "initial",
                      }}
                      onClick={handleCheckout}
                    >
                      {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : ""}
                      Checkout
                    </Button>
                  </Box>
                </div>
              </Grid>
            </Grid>
            <OrderDetail
              open={open}
              onClose={handleClose}
              order={newOrderCart}
              // address={address}
              // payment={paymentMethod}
              navigate={navigate}
            />
          </div>)
          : (
            <div className="my-cart-login">
              <Typography color="primary.dark" variant="h6" fontWeight="bold" mb={2}>
                You need login to view this page
              </Typography>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                sx={{
                  fontWeight: "500",
                  textTransform: "initial",
                }}
                onClick={() => navigate("/my-page")}
              >
                Go to Login
              </Button>
            </div>
          )
      }
    </div>
  );
}

export function CartItem({ item, onDeleteCart, onChangeQty }) {
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item?.product.image} alt="cart-img" />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-info-name">
          <p className="name-title">{item?.product.title}</p>
          <Tooltip title={item?.note !== "" ? item?.note : item?.product.desc} placement="bottom">
            <p className="name-desc">{item?.note !== "" ? item?.note : item?.product.desc}</p>
          </Tooltip>
        </div>
        <div className="cart-item-info-price">{item?.product.price}k</div>
        <div className="cart-item-info-num">
          <div className="icon-btn" onClick={onDeleteCart}>
            <DeleteOutline />
          </div>
          <p className="num-cart">{item?.quantity}</p>
          <div className="icon-btn" onClick={onChangeQty}>
            <Add />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OtherCartItem({ item, onAddOtherCart }) {
  return (
    <div className="other-cart-item">
      <div className="other-cart-item-img">
        <img src={item?.image} alt="cart-img" />
      </div>
      <div className="other-cart-item-info">
        <div className="other-cart-item-info-name">
          <p className="name-title">{item?.title}</p>
          <p className="name-price">{item?.price}k</p>
        </div>
        <div className="other-cart-item-info-add" onClick={onAddOtherCart}>
          <Add />
        </div>
      </div>
    </div>
  );
}

export function OrderDetail(props) {
  const { onClose, open, order, navigate } = props;

  const totalAmount = order?.carts?.reduce((acc, cur) => {
    acc += cur?.product.price * cur.quantity;
    return acc;
  }, 0) || 0;

  return (
    <Dialog onClose={onClose} open={open}>
      <div className="order-detail">
        <div className="order-detail-top">
          <img src={logo} alt="logo" />
          <h3>Ngon</h3>
        </div>
        <div className="order-detail-title">
          <p className="main-title">Your order is on the way!</p>
          <p className="sub-title">Expected arrival at 8:35-8:45</p>
        </div>
        <div className="order-detail-main">
          <div className="order-detail-main-left">
            <div className="left-item">
              <p className="main-item-name">Order number</p>
              <p>{order?.orderId}</p>
            </div>
            <div className="left-item left-item-order">
              <p className="main-item-name">Your order</p>
              {
                order?.carts.map((item, index) => {
                  return (
                    <div className="left-item-sub" key={index}>
                      <p>{item?.product.title}
                        <span style={{ display: "inline-block", marginLeft: "20px" }}>x{item?.quantity}</span>
                      </p>
                      <p>{item?.product.price * item?.quantity}k</p>
                    </div>
                  )
                })
              }
              <div className="left-item-sub">
                <p>Delivery fee</p>
                <p>65k</p>
              </div>
              <div className="left-item-sub">
                <p>Coupon</p>
                <p>-65k</p>
              </div>
              <div className="left-item-sub">
                <p>Total</p>
                <p className="left-item-sub-total">{MoneyFormat(totalAmount * 1000)}</p>
              </div>
            </div>
          </div>
          <div className="order-detail-main-right">
            <div className="left-item">
              <p className="main-item-name">Shipping address</p>
              {/* <p>{address}</p> */}
              <p>{order?.shippingAddress}</p>
            </div>
            <div className="left-item">
              <p className="main-item-name">Payment method</p>
              {/* <p>
                {payment === "masterCard" ? "Master card" : payment === "visa" ? "Visa" : payment === "momo" ? "MOMO wallet" :
                payment === "zalo" ? "ZALO wallet" : payment === "paypal" ? "PAYPAL wallet" : "Cash on delivery" }
              </p>  */}
              <p>
                {order?.paymentMethod === "masterCard" ? "Master Card" : order?.paymentMethod === "visa" ? "Visa Card" : order?.paymentMethod === "momo" ? "MOMO wallet" :
                order?.paymentMethod === "zalo" ? "ZALO PAY wallet" : order?.paymentMethod === "paypal" ? "PAYPAL wallet" : "Cash on delivery" }
              </p>
            </div>
          </div>
        </div>
        <div className="order-detail-bot">
          <p>If you need any assistance,</p>
          <p>reach us at 1800-1234.</p>
        </div>
        <Box mt={3}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            sx={{
              width: "100%",
              fontWeight: "500",
              textTransform: "initial",
            }}
            onClick={() => navigate("/menu")}
          >
            Go back to Menu
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}
