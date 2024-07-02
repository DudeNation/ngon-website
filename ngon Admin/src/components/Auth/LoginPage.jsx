import { Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required.')
			.email('This is not email.')
			.matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
	});
	
  const { control, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
		},
		resolver: yupResolver(validationSchema)
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const handleSubmitLogin = async (data) => {
    try {
      const response = await authApi.loginInitiate(data); // Assume this calls /login/initiate
  
      // Check if the response status is not 200 OK
      if (response.status !== 200) {
        // You can throw a new error with a custom message or use the response status text
        throw new Error("Invalid email or password. Please try again.");
      }
  
      // If response.status === 200, proceed as before
      alert("Verification code sent to your email. Please enter it to continue.");
      localStorage.setItem('emailForOtp', data.email);
  
      const expiryTime = new Date().getTime() + (10 * 60 * 1000); // 10 minutes in milliseconds
      localStorage.setItem('emailForOtpExpiry', expiryTime.toString());
  
      setTimeout(() => {
        const storedExpiryTime = localStorage.getItem('emailForOtpExpiry');
        const currentTime = new Date().getTime();
        if (currentTime > storedExpiryTime) {
          localStorage.removeItem('emailForOtp');
          localStorage.removeItem('emailForOtpExpiry');
        }
      }, 3 * 60 * 1000); // Check in 10 minutes
  
      navigate("/otp-page");
    } catch (error) {
      alert("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="login">
      <Typography color="primary" variant="h3" fontWeight="bold">
        Login
      </Typography>
      <Box mt={3}>
        <Box>
          <Typography color="primary.dark" fontWeight="bold" mb={2} variant="body2">
            Email
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                id="outlined-start-adornment"
                sx={{ width: "100%" }}
                size="small"
                variant="outlined"
                type="email"
                value={field.value}
								onChange={field.onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
            )}
					/>
					{errors.email ? <Typography color='red' fontSize={12}>{errors.email?.message}</Typography> : ''}
        </Box>
        <Box my={2}>
          <Typography color="primary.dark" fontWeight="bold" mb={2} variant="body2">
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                id="outlined-start-adornment"
                sx={{ width: "100%" }}
                size="small"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={field.value}
                onChange={field.onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", fontWeight: "500", textTransform: "initial" }}
            onClick={handleSubmit(handleSubmitLogin)}
          >
            Login
          </Button>
        </Box>
      </Box>
      <div className="forgot-pass">
        <Link to={"/my-page/forgot-password"}>Forgot Password?</Link>
      </div>
      
    </div>
  );
}
