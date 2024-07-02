import React from "react";
import NavBar from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import authApi from "../../api/authApi";
export default function Sidebar({ isToggle, onToggle }) {
  const path = useLocation();
  const navigate = useNavigate();
  const active = NavBar.findIndex((value) => value.url === path?.pathname);

  const handleLogout = () => {
    const logout = async () => {
      const token = localStorage.getItem('token'); // Assuming your token key in localStorage is 'token'
      if (!token) {
        return; // If token is not available, do nothing
      }
  
      try {
        const response = await authApi.logout(); // Assuming authApi.logout() is your logout API function
        console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          navigate("/"); // Navigate to the root ("/") after successful logout
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
  
    logout(); // Call the logout function
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
