import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  // Box,
  // Button,
  Grid,
  Typography,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useEffect, useState } from "react";
import phobo from "../../assets/images/1.jpg";
import quickorder from "../../assets/images/quickorder.png";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import { MoneyFormat } from "../../utils/moneyFormat";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";

export default function OrderHistory() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_INFO));
  const [orderDone, setOrderDone] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);

  const handleDeleteOrder = async (orderId) => {
      try {
        const response = await userApi.cancelOrder(orderId);
        if (response.status === 200) {
          window.location.reload();
        }
      }
      catch (error) {
      }
  }
  useEffect (() => {
    const fetchOrderDelivery = async () => {
      try {
        const response = await userApi.getOrderDelivery(user.email);
        if (response.status === 200) {
          setOrderDelivery(response.data);
        }
      } catch (error) {
      }
    }
    fetchOrderDelivery();
  }, [user.email]);

  useEffect (() => {
    const fetchOrderDone = async () => {
      try {
        const response = await userApi.getOrderDone(user.email);
        if (response.status === 200) {
          setOrderDone(response.data);
        }
      } catch (error) {
       
      }
    }
    fetchOrderDone();
  }, [user.email]);


  const StatusColor = (status) => {
    let color = "";
    switch (status) {
      case "Pending":
        color = "#F0AD4E"; // Bootstrap warning color for pending
        break;
      case "Confirmed":
        color = "#5BC0DE"; // Bootstrap info color for confirmed
        break;
      case "Preparing":
        color = "#5CB85C"; // Bootstrap success color for preparing
        break;
      case "Delivering":
        color = "#A1A1A1"; // Grey for delivering
        break;
      case "Delivered":
        color = "#00CE08"; // Green for delivered
        break;
      case "Cancelled":
        color = "#D9534F"; // Bootstrap danger color for cancelled
        break;
      default:
        color = "#A1A1A1"; // Grey for any other or unknown status
        break;
    }
    return color;
  };

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
    <div className="order-history">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography color="primary.dark" variant="h6" my={2}>
            Order on the way
            <span
              style={{
                display: "inline-block",
                marginLeft: "5px",
                fontWeight: 200,
              }}
            >
              {orderDelivery.length <= 1 ? `${orderDelivery.length} order` : `${orderDelivery.length} orders`}
            </span>
          </Typography>
          {orderDelivery?.length === 0 ? (
            <Box>
              <div className="order-history-noOrder">
                <img src={quickorder} alt="no-order" />
              </div>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                  my: 2,
                }}
                onClick={() => navigate("/my-cart")}
              >
                Make an order
              </Button>
            </Box>
          ) : (
            <div className="order-delivering">
              {orderDelivery?.map((order, index) => {
                return (
                  <Accordion sx={{ backgroundColor: "#BF3A00", mb: 1 }} key={index}>
                  <AccordionSummary>
                    <div className="order-delivering-item">
                      <div className="order-delivering-item-img">
                        <img src={order?.items.length > 0 ? process.env.REACT_APP_API_URL + order?.items[0]?.meal?.image : phobo} alt="order-img" />
                      </div>
                      <div className="order-delivering-item-info">
                        <span className="info-name">
                          {order?.items.length > 0 && order?.items.map((item, cartId) => (
                            <span key={cartId}>
                              {item?.name} <span style={{ paddingLeft: "3px" }}>x{item.quantity}</span>
                              <span style={{ paddingRight: "3px" }}>{cartId !== (order?.items.length - 1) ? ',' : ''}</span>
                            </span>
                          ))}
                        </span>
                        <div className="info-status" style={{ color: StatusColor(order?.status) }}>{`${order?.status}...`}</div>
                        <div className="info-time">
                          <p>Ordered at {order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="order-delete-button">
                      {order?.status === 'Pending' && (
                        <IconButton onClick={() => handleDeleteOrder(order?._id)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="order-delivering-detail">
                      <div className="order-delivering-detail-top">
                        <div className="detail-top-1">
                          <div>
                            <p className="detail-title">Order number</p>
                            <p>{order?.orderId}</p>
                          </div>
                          <div>
                            <p className="detail-title">Payment method</p>
                            <p>{PaymentMethodName(order?.payment?.method)}</p>
                          </div>
                        </div>
                        <div className="detail-top-2">
                          <div>
                            <p className="detail-title">Shipping address</p>
                            <p>{order?.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="order-delivering-detail-bot">
                        <div className="detail-bot-1">
                          <p className="detail-title">Your order</p>
                          {order?.items.length > 0 && order?.items.map((item, id) => (
                            <div className="detail-item-sub" key={id}>
                              <p>
                                {item?.name}
                                <span style={{ display: "inline-block", marginLeft: "8px" }}>x{item.quantity}</span>
                              </p>
                              <p>{item?.itemPrice * item?.quantity}k</p>
                            </div>
                          ))}
                          <div className="detail-item-sub">
                            <p>Delivery fee</p>
                            <p>{order.bill.deliveryCharge}k</p>
                          </div>
                          <div className="detail-item-sub">
                            <p>Coupon</p>
                            <p>{order.bill.coupon.discountPrice}k</p>
                          </div>
                          <div className="detail-item-sub">
                            <p>Membership</p>
                            <p>{order.bill.memberShip}k</p>
                          </div>
                          <div className="detail-item-sub">
                            <p>Total</p>
                            <p className="detail-item-sub-total">{MoneyFormat(Number(order?.bill.grandTotal) * 1000)}</p>
                          </div>
                        </div>
                        <div className="detail-bot-2"></div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                            
                );
              })}
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography color="primary" variant="h6" my={2}>
            Order history
            <span
              style={{
                display: "inline-block",
                marginLeft: "5px",
                fontWeight: 200,
                color: "#A1A1A1"
              }}
            >
              {/* {orderOtherList.length <= 1 ? `${orderOtherList.length} order` : `${orderOtherList.length} orders`} */}
              {orderDone.length <= 1 ? `${orderDone.length} order` : `${orderDone.length} orders`}
            </span>
          </Typography>
          <div className="orer-list">
            {
              orderDone.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>		
                  <Typography color='primary' variant="h6">No order</Typography>
                </Box>  
              ) : (
                orderDone.map((order, index) => {
                    return (
                      <Box mb={1} key={index}>
                        <Typography color="primary.dark" mb={1} fontWeight="500">
                          {order?.createAt}
                        </Typography>
                        <Accordion sx={{ backgroundColor: "#EDEDED" }}>
                          <AccordionSummary>
                            <div className="order-list-item">
                              <div className="order-item-img">
                                <img src={order?.items.length > 0 ? process.env.REACT_APP_API_URL + order?.items[0]?.meal?.image : phobo} alt="order-img" />
                              </div>
                              <div className="order-item-info">
                                <div className="item-info-name">
                                  {
                                    order?.items.length > 0 && order?.items.map((item, cartId) => {
                                      return (
                                        <p className="item-info-name-title" key={cartId}>
                                          {item?.name} <span>x{item.quantity}</span>
                                          {cartId !== (order?.items.length - 1) ? ',' : ''}
                                        </p>
                                      )
                                    })
                                  }
                                  <p className="item-info-name-status" style={{ color: StatusColor(order?.status) }}>{(order?.status)}</p>
                                </div>
                                <div className="item-info-time">
                                <p>Ordered at {order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : ''}</p>
                          
                                </div>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="order-list-detail">
                              <div className="order-list-detail-top">
                                <div className="detail-top-1">
                                  <div>
                                    <p className="detail-title">Order number</p>
                                    <p>{order?.orderId}</p>
                                  </div>
                                  <div>
                                    <p className="detail-title">Payment method</p>
                                    <p>{PaymentMethodName(order?.payment?.method)}</p>
                                  </div>
                                </div>
                                <div className="detail-top-2">
                                  <div>
                                    <p className="detail-title">Shipping address</p>
                                    <p>{order?.address}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="order-list-detail-bot">
                                <div className="detail-bot-1">
                                  <p className="detail-title">Your order</p>
                                  {
                                    order?.items.length > 0 && order?.items.map((item, id) => {
                                      return (
                                        <div className="detail-item-sub" key={id}>
                                          <p>
                                            {item?.name}
                                            <span style={{ display: "inline-block", marginLeft: "8px" }}>x{item?.quantity}</span>
                                          </p>
                                          <p>{item?.itemPrice * item?.quantity}k</p>
                                        </div>
                                      )
                                    })
                                  }
                                  <div className="detail-item-sub">
                                    <p>Delivery fee</p>
                                    <p>{order.bill.deliveryCharge}k</p>
                                  </div>
                                  <div className="detail-item-sub">
                                    <p>Coupon</p>
                                    <p>{order.bill.coupon.discountPrice}k</p>
                                  </div>
                                  <div className="detail-item-sub">
                                    <p>Coupon</p>
                                    <p>{order.bill.memberShip}k</p>
                                  </div>
                                  <div className="detail-item-sub">
                                    <p>Total</p>
                                    <p className="detail-item-sub-total">{MoneyFormat(Number(order?.bill?.grandTotal) * 1000)}</p>
                                  </div>
                                </div>
                                <div className="detail-bot-2"></div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    )
                  })
              )
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
