import { Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import authApi from "../../api/authApi";
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
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { Controller, useForm } from "react-hook-form";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("This is not a valid email.")
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitLogin = async (data) => {
    try {
      const response = await authApi.login(data);
      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, response.data.refreshToken);
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      // Display error message to user
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
          {errors.email && <Typography color="red" fontSize={12}>{errors.email.message}</Typography>}
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
          {errors.password && <Typography color="red" fontSize={12}>{errors.password.message}</Typography>}
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
      <div className="login-or">
        <span>Or</span>
      </div>
      <div className="login-other">
        <Box>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%", fontWeight: "500", textTransform: "initial" }}
            onClick={() => navigate("/my-page/sign-up")}
          >
            Create an account
          </Button>
        </Box>
        <Box my={1}>
          <Button
            variant="outlined"
            size="large"
            color="grey"
            startIcon={
              <div className="login-other-gg">
                <img src={google} alt="Google" />
              </div>
            }
            sx={{
              width: "100%",
              fontWeight: "500",
              textTransform: "initial",
            }}
          >
            Login with Google
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="large"
            color="info"
            startIcon={
              <div className="login-other-fb">
                <img src={facebook} alt="Facebook" />
              </div>
            }
            sx={{
              width: "100%",
              fontWeight: "500",
              textTransform: "initial",
            }}
          >
            Login with Facebook
          </Button>
        </Box>
      </div>
    </div>
  );
}
