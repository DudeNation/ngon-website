import React, { useState } from "react";
import NavBar from "./navbar";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LOCAL_STORAGE } from "../../constants/endpoint";
import { Dehaze } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function Header() {
  const path = useLocation();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const active = NavBar.findIndex((value) => value.url === path?.pathname);
  // const carts = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_LIST)) || [];
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  }

  return (
    <div className="header">
      <Sidebar onToggle={handleToggle} isToggle={isToggle} />
      <div className="header-container">
        <div className="header-container-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h1>ngon</h1>
        </div>
        <div className="header-container-main">
          {NavBar.map((item, index) => {
            return (
              <div
                key={index}
                className={`menu-item `}
              >
                <div className="menu-item-icon">
                  {index === active ? item.icon2 : item.icon}
                  {item.url === "/my-cart" && cartList.length > 0 ? 
    <div className="menu-item-icon-cart">
        {cartList.reduce((total, currentItem) => total + currentItem.quantity, 0)}
    </div> 
    : ""}
                </div>
                <div className={`menu-item-name ${index === active ? "active" : ""}`}>
                  <Link to={item.url}>{item.title}</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="header-container-toggle" onClick={handleToggle}>
          <Dehaze />
        </div>
      </div>
    </div>
  );
}

export default Header;
