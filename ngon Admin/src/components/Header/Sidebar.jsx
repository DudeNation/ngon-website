import React from "react";
import NavBar from "./navbar";
import { Link, useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
export default function Sidebar({ isToggle, onToggle }) {
  const path = useLocation();

  const active = NavBar.findIndex((value) => value.url === path?.pathname);

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
    </div>
  );
}
