import React from "react";
import NavBar from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { LOCAL_STORAGE } from "../../constants/endpoint";

export default function Sidebar({ isToggle, onToggle }) {
  const path = useLocation();
  const navigate = useNavigate();
  const active = NavBar.findIndex((value) => value.url === path?.pathname);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
    localStorage.removeItem(LOCAL_STORAGE.SHIPPING_ADDRESS);
    localStorage.removeItem(LOCAL_STORAGE.PAYMENT_METHOD);
    localStorage.removeItem(LOCAL_STORAGE.ORDER_LIST);
    localStorage.removeItem(LOCAL_STORAGE.CART_LIST);
    navigate("/");
  };

  return (
    <div className={`${isToggle ? "sidebar active" : "sidebar"}`}>
      <div className="sidebar-icon" onClick={onToggle}>
        <Close />
      </div>
      <ul className="sidebar-menu">
        {NavBar.map((item, index) => {
          return (
            <li
              onClick={onToggle}
              key={index}
              className={`${index === active ? "active" : ""}`}
            >
              <Link to={item.url}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
			<div className="sidebar-footer" onClick={handleLogout}>Logout</div>
    </div>
  );
}
