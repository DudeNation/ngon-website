import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import LoginPage from "../components/Auth/LoginPage";
import MyPageAuth from "../components/Auth/MyPageAuth";
import userApi from "../api/userApi";

export default function MyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await userApi.checkToken();
        setIsAuthenticated(response.data.valid);
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.clear();
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="my-page">
      <Header />
      <div className="my-page-container">
        {isAuthenticated ? (
          <MyPageAuth />
        ) : (
          <>
            <div className="my-page-container-banner"></div>
            <LoginPage />
          </>
        )}
      </div>
    </div>
  );
}