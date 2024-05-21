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
import { useNavigate } from "react-router-dom";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { Controller, useForm } from "react-hook-form";
import { LOCAL_STORAGE } from "../../constants/endpoint";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../Header/Header";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("This is not email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		),
		password: Yup.string()
		.required('Password is required.')
		.min(8, '8-12 characters, 1 uppercase letter, 1 number, 1 special letter.')
		.max(12, '8-12 characters, 1 uppercase letter, 1 number, 1 special letter.')
		.matches(
      // /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#$!%?&^*+/-])[A-Za-z\d$@#$!%?&*^+/-]{8,12}/,
			'8-12 characters, 1 uppercase letter, 1 number, 1 special letter.'
		),
	confirmPassword: Yup.string()
		.required('Confirm password is required.')
		.oneOf([Yup.ref('password'), null], 'Password does not match.')
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitRegister = (data) => {
		localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify({
			email: data.email,
			password: data.password
		}));
		navigate('/my-page');
  };
  return (
    <div className="my-page">
      <Header />
			<div className="my-page-register">
			<div className="my-page-register-banner"></div>
        <div className="register">
          <Typography
            color="primary"
            variant="h3"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Sign up
          </Typography>
          <Box mt={2}>
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
              {errors.email ? (
                <Typography color="red" fontSize={12}>
                  {errors.email?.message}
                </Typography>
              ) : (
                ""
              )}
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
							{errors.password ? (
                <Typography color="red" fontSize={12}>
                  {errors.password?.message}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box my={2}>
              <Typography color="primary.dark" fontWeight="bold" mb={2} variant="body2">
                Confirm Password
              </Typography>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Confirm Password"
                    id="outlined-start-adornment"
                    sx={{ width: "100%" }}
                    size="small"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
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
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
							/>
							{errors.confirmPassword ? (
                <Typography color="red" fontSize={12}>
                  {errors.confirmPassword?.message}
                </Typography>
              ) : (
                ""
              )}
						</Box>
            <div className="term">
              By creating account, I have agreed to the
							<a href="#/"> terms and conditions.</a>
						</div>
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "100%",
                  fontWeight: "500",
									textTransform: "initial",
									backgroundColor: '#A1A1A1'
                }}
                onClick={handleSubmit(handleSubmitRegister)}
              >
                Create account
              </Button>
            </Box>
          </Box>
          <div className="register-or">
            <span>Or</span>
          </div>
          <div className="register-other">
            <Box mb={1}>
              <Button
                variant="outlined"
                size="large"
                color="grey"
                startIcon={
                  <div className="login-other-gg">
                    <img src={google} alt="gg" />
                  </div>
                }
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                }}
              >
                Sign up with Google
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="large"
                color="info"
                startIcon={
                  <div className="login-other-fb">
                    <img src={facebook} alt="fb" />
                  </div>
                }
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                }}
              >
                Sign up with Facebook
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
