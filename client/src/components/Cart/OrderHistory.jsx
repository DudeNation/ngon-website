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
} from "@mui/material";
import React from "react";
import phobo from "../../assets/images/1.jpg";
import quickorder from "../../assets/images/quickorder.png";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import { MoneyFormat } from "../../utils/moneyFormat";
import { useNavigate } from "react-router-dom";

const orderListFakeData = [
  {
    "orderId": 657549688,
    "createTime": "5/8/2024",
    "receiveTime": "5/8/2024",
    "email": "minmin2001@gmail.com",
    "status": 2,
    "shippingAddress": "Nguyen Thien An, HOME, cau giay, ha noi",
    "paymentMethod": "visa",
    "amount": 100,
    "carts": [
      {
        "product": {
          "title": "Bun Ca",
          "price": 50,
          "desc": "Vietnamese beef noodle soup",
          "rating": "4.5 (281 reviews)",
          "image": "https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/1563423330751-PDGAIDU4C1EZF5L0WOTA/pho+ga1.jpg?format=1500w",
          "delivery": "Delivery in 40-50 minutes",
          "id": "4"
        },
        "quantity": 2
      }
    ]
  },
  {
    "orderId": 657549689,
    "createTime": "30/04/2024",
    "receiveTime": "30/04/2024",
    "email": "abc@gmail.com",
    "status": 3,
    "shippingAddress": "Nguyen Thien An, HOME, cau giay, ha noi",
    "paymentMethod": "visa",
    "amount": 250,
    "carts": [
      {
        "product": {
          "title": "Bun Ca",
          "price": 50,
          "desc": "Vietnamese beef noodle soup",
          "rating": "4.5 (281 reviews)",
          "image": "https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/1563423330751-PDGAIDU4C1EZF5L0WOTA/pho+ga1.jpg?format=1500w",
          "delivery": "Delivery in 40-50 minutes",
          "id": "4"
        },
        "quantity": 1
      },
      {
        "product": {
          "title": "Pho bo",
          "price": 100,
          "desc": "Vietnamese beef noodle soup",
          "rating": "4.5 (281 reviews)",
          "image": "https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/1563423330751-PDGAIDU4C1EZF5L0WOTA/pho+ga1.jpg?format=1500w",
          "delivery": "Delivery in 40-50 minutes",
          "id": "4"
        },
        "quantity": 2
      }
    ]
  }
];


export default function OrderHistory() {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE.ORDER_LIST)) || [];
  const orderDeliveringList = orders?.filter((order) => order.status === 1)?.reverse();
  // const orderOtherList = orders?.filter((order) => order.status !== 1);

  const StatusTypeName = (status) => {
    let statusName = "";
    switch (status) {
      case 1:
        statusName = "Delivering";
        break;
      case 2:
        statusName = "Delivered";
        break;
      case 3:
        statusName = "Canceled";
        break;
      default:
        statusName = "Delivering";
        break;
    }
    return statusName;
  };

  const StatusColor = (status) => {
    let color = "";
    switch (status) {
      case 1:
        color = "#A1A1A1";
        break;
      case 2:
        color = "#00CE08";
        break;
      case 3:
        color = "#A1A1A1";
        break;
      default:
        color = "#A1A1A1";
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
              {orderDeliveringList.length <= 1 ? `${orderDeliveringList.length} order` : `${orderDeliveringList.length} orders`}
            </span>
          </Typography>
          {orderDeliveringList?.length === 0 ? (
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
              {orderDeliveringList?.map((order, index) => {
                return (
                  <Accordion sx={{ backgroundColor: "#BF3A00", mb: 1 }} key={index}>
                    <AccordionSummary>
                      <div className="order-delivering-item">
                        <div className="order-delivering-item-img">
                          <img src={order?.carts.length > 0 ? order?.carts[0]?.product?.image : phobo} alt="order-img" />
                        </div>
                        <div className="order-delivering-item-info">
                          <span className="info-name">
                            {order?.carts.length > 0 && order?.carts.map((cart, cartId) => {
                              return (
                                <span key={cartId}>
                                  {cart?.product?.title} <span style={{ paddingLeft: "3px" }}>x{cart.quantity}</span>
                                  <span style={{ paddingRight: "3px" }}>{cartId !== (order?.carts.length - 1) ? ',' : ''}</span>
                                </span>
                              )
                            })}
                          </span>
                          <div className="info-status" style={{ color: "#00CE08", fontWeight: 500 }}>{`${StatusTypeName(order?.status)}...`}</div>
                          <div className="info-time">
                            <p>Ordered at {order?.createTime}</p>
                            <p>Expected at {order?.receiveTime}</p>
                          </div>
                        </div>
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
                              <p>{PaymentMethodName(order?.paymentMethod)}</p>
                            </div>
                          </div>
                          <div className="detail-top-2">
                            <div>
                              <p className="detail-title">Shipping address</p>
                              <p>{order?.shippingAddress}</p>
                            </div>
                          </div>
                        </div>
                        <div className="order-delivering-detail-bot">
                          <div className="detail-bot-1">
                            <p className="detail-title">Your order</p>
                            {
                              order?.carts.length > 0 && order?.carts.map((cart, id) => {
                                return (
                                  <div className="detail-item-sub" key={id}>
                                    <p>
                                      {cart?.product?.title}
                                      <span style={{ display: "inline-block", marginLeft: "8px" }}>x{cart.quantity}</span>
                                    </p>
                                    <p>{cart?.product?.price}k</p>
                                  </div>
                                )
                              })
                            }
                            <div className="detail-item-sub">
                              <p>Delivery fee</p>
                              <p>65k</p>
                            </div>
                            <div className="detail-item-sub">
                              <p>Coupon</p>
                              <p>-65k</p>
                            </div>
                            <div className="detail-item-sub">
                              <p>Total</p>
                              <p className="detail-item-sub-total">{MoneyFormat(Number(order?.amount) * 1000)}</p>
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
              {orderListFakeData.length <= 1 ? `${orderListFakeData.length} order` : `${orderListFakeData.length} orders`}
            </span>
          </Typography>
          <div className="orer-list">
            {
              orderListFakeData.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: '50px'}}>		
                  <Typography color='primary' variant="h6">No order</Typography>
                </Box>  
              ) : (
                orderListFakeData.map((order, index) => {
                    return (
                      <Box mb={1} key={index}>
                        <Typography color="primary.dark" mb={1} fontWeight="500">
                          {order?.createTime}
                        </Typography>
                        <Accordion sx={{ backgroundColor: "#EDEDED" }}>
                          <AccordionSummary>
                            <div className="order-list-item">
                              <div className="order-item-img">
                                <img src={order?.carts.length > 0 ? order?.carts[0]?.product?.image : phobo} alt="order-img" />
                              </div>
                              <div className="order-item-info">
                                <div className="item-info-name">
                                  {
                                    order?.carts.length > 0 && order?.carts.map((cart, cartId) => {
                                      return (
                                        <p className="item-info-name-title" key={cartId}>
                                          {cart?.product?.title} <span>x{cart.quantity}</span>
                                          {cartId !== (order?.carts.length - 1) ? ',' : ''}
                                        </p>
                                      )
                                    })
                                  }
                                  <p className="item-info-name-status" style={{ color: StatusColor(order?.status) }}>{StatusTypeName(order?.status)}</p>
                                </div>
                                <div className="item-info-time">
                                  <p>Ordered at {order?.createTime}</p>
                                  <p>Expected at {order?.receiveTime}</p>
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
                                    <p>{PaymentMethodName(order?.paymentMethod)}</p>
                                  </div>
                                </div>
                                <div className="detail-top-2">
                                  <div>
                                    <p className="detail-title">Shipping address</p>
                                    <p>{order?.shippingAddress}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="order-list-detail-bot">
                                <div className="detail-bot-1">
                                  <p className="detail-title">Your order</p>
                                  {
                                    order?.carts.length > 0 && order?.carts.map((cart, id) => {
                                      return (
                                        <div className="detail-item-sub" key={id}>
                                          <p>
                                            {cart?.product?.title}
                                            <span style={{ display: "inline-block", marginLeft: "8px" }}>x{cart.quantity}</span>
                                          </p>
                                          <p>{cart?.product?.price}k</p>
                                        </div>
                                      )
                                    })
                                  }
                                  <div className="detail-item-sub">
                                    <p>Delivery fee</p>
                                    <p>65k</p>
                                  </div>
                                  <div className="detail-item-sub">
                                    <p>Coupon</p>
                                    <p>-65k</p>
                                  </div>
                                  <div className="detail-item-sub">
                                    <p>Total</p>
                                    <p className="detail-item-sub-total">{MoneyFormat(Number(order?.amount) * 1000)}</p>
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
