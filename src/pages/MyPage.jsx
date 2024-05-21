import React from "react";
import Header from "../components/Header/Header";
import LoginPage from "../components/Auth/LoginPage";
import { LOCAL_STORAGE } from "../constants/endpoint";
import MyPageAuth from "../components/Auth/MyPageAuth";

export default function MyPage() {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_INFO));

  return (
    <div className="my-page">
      <Header />
      <div className="my-page-container">
        {user?.email && user?.email !== '' ? (
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
