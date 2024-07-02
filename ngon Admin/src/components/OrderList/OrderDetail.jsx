import { Dialog } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system'
import { ShoppingCart } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

const OrderDetail = ({ open, onClose, cartList, bill}) => {
  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
			open={open}
			PaperProps={{
				sx: {
					minWidth: { xs: "unset !important", sm: "600px !important", md: "800px !important", lg: "800px !important" },
					overflow: "hidden"
				}
			}}
		>
        <Box>
        {
            cartList && cartList.length > 0 ? cartList.map((cart, index) => {
            return (
              <div className="my-cart-container">
                <CartItem
                key={index}
                item={cart}
                />
              </div>
            )
            }) : <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingCart sx={{ color: "#A1A1A1", fontSize: { xs: "96px", md: "128px", lg: "164px" }, opacity: 0.5 }} />
            </Box>
        }
        </Box>
        <div className="my-order-summary title-top">
                    <p className="my-order-title">Order sumary</p>
                    <div className="my-order-summary-main">
                      {
                        cartList && cartList.map((item, index) => {
                          return (
                            <div className="main-item" key={index}>
                              <p>{item?.name}
                                <span style={{ display: "inline-block", marginLeft: "20px" }}>x{item?.quantity}</span>
                              </p>
                              <p>{item?.itemPrice * item?.quantity}k</p>
                            </div>
                          )
                        })
                      }
                      <div className="main-item">
                        <p>Delivery fee</p>
                        <p>{`${cartList && cartList.length === 0 ? "0k" : "30k"}`}</p>
                      </div>
                      <div className="main-item">
                        <p>Coupon</p>
                        <p className="main-item-coupon">{bill?.coupon?.discountPrice }k</p>
                      </div>
                      <div className="main-item">
                        <p>Memberhip</p>
                        <p className="main-item-coupon">{bill.memberShip}k</p>
                      </div>
                      <div className="main-item">
                        <p>Total</p>
                        <p className="main-item-total">{bill.grandTotal}k</p>
                      </div>
                    </div>
                  </div>
    </Dialog>
  )
}
export function CartItem({ item, onDeleteCart, onChangeQty }) {
    return (
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={process.env.REACT_APP_API_URL + item?.meal.image} alt="cart-img" />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-info-name">
            <p className="name-title">{item?.meal.name}</p>
            <Tooltip title={item?.chefNote !== "" ? item?.chefNote : ""} placement="bottom">
              <p className="name-desc">{item?.chefNote !== "" ? item?.chefNote : ""}</p>
            </Tooltip>
          </div>
          <div className="cart-item-info-price">{item?.meal.price}k</div>
        </div>
      </div>
    );
  }
export default OrderDetail