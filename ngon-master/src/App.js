import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';
import OurBand from './pages/OurBand';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import RegisterPage from './components/Auth/RegisterPage';
import OTPPage from './components/Auth/OTPPage';
import ChangePasswordPage from './components/Auth/ChangePasswordPage';
import RegisOTP from './components/Auth/RegisOTP';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-brand" element={<OurBand />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/my-page/sign-up" element={<RegisterPage />} />
          <Route path="/my-page/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/my-page/forgot-password/otp" element={<OTPPage />} />
          <Route path="/my-page/forgot-password/change-password" element={<ChangePasswordPage />} />
          <Route path="/regisOTP" element={<RegisOTP />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
} 

export default App;
