import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import OTPPage from './components/Auth/OTPPage';
import ChangePasswordPage from './components/Auth/ChangePasswordPage';
import PrivateRoute from './components/Auth/PrivateRoute';
import OrderList from './components/OrderList/OrderList';
import CustomerList from './components/CustomerList/CustomerList';
import Dashboard from './components/Dashboard/Dashboard';
import ForgetOTP from './components/Auth/ForgetOTP';
import Coupon from './pages/Coupon';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-list" element={<PrivateRoute component={CustomerList} />} />
          <Route path="/menu" element={<PrivateRoute component={MenuPage} />} />
          <Route path="/order-list" element={<PrivateRoute component={OrderList} />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-page" element={<PrivateRoute component={MyPage} />} />   
          <Route path="/my-page/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp-page" element={<OTPPage />} />
          <Route path="/my-page/forgot-password/otp" element={<ForgetOTP />} />
          <Route path="/my-page/forgot-password/change-password" element={<ChangePasswordPage />} />
          <Route path="/coupon" element={<Coupon />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
} 

export default App;
