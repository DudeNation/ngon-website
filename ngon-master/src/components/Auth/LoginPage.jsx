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
import { LOCAL_STORAGE } from "../../constants/endpoint";
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
  };

  const handleSubmitLogin = async (data) => {
    try {
      const response = await authApi.login(data);

      if (response.status !== 200) {
        throw new Error("Invalid email or password. Please try again.");
      }
      localStorage.clear();
      const { data: { user, token } } = response;

      localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(user));
      localStorage.setItem(LOCAL_STORAGE.SHIPPING_ADDRESS, JSON.stringify(user.address));
      localStorage.setItem("token", token);
      window.location.reload();
      
    }
    catch (error) {
      alert(error.message);
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
        
      </div>
    </div>
  );
}
