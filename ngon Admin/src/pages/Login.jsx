import React, {useEffect} from "react";
import LoginPage from "../components/Auth/LoginPage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expireAt = localStorage.getItem('expireAt');
    const currentTime = new Date().getTime(); // Get current time in milliseconds
  
    if (token && expireAt) {
      const isTokenExpired = currentTime > parseInt(expireAt, 10);
      if (!isTokenExpired) {
        navigate('/dashboard'); // Token is not expired, navigate to dashboard
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expireAt');
        navigate('/login');
      }
    }
  }, []);
  return (
    <div className="my-page">
            <div className="my-page-container-banner"></div>
            <LoginPage />
    </div>
  );
}
