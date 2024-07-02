import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../Header/Header";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required.")
      .min(8, "8-12 characters, 1 uppercase letter, 1 number, 1 special letter.")
      .max(20, "8-12 characters, 1 uppercase letter, 1 number, 1 special letter.")
      .matches(
        /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "8-12 characters, 1 uppercase letter, 1 number, 1 special letter."
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match. Try again."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitPassword = (data) => {
    if (data?.newPassword && data?.confirmPassword && data?.newPassword === data?.confirmPassword) {
      const email = localStorage.getItem("resetEmail");
      const verificationCode = localStorage.getItem("resetCode");
      handleResetPass(email, verificationCode, data.newPassword);
    }
  };
  const handleResetPass = async (email, verificationCode, newPassword) => {
    const response = await authApi.resetPassword({
      email,
      verificationCode,
      newPassword,
    });
    if (response.data) {
      alert("Change password successfully!");
      navigate("/login");
    }
  }
  return (
    <div className="my-pgae">
      <Header />
      <div className="my-page-forgotpass">
        <div className="my-page-forgotpass-banner"></div>
        <div className="forgotpass">
          <Typography color="primary" variant="h3" fontWeight="bold">
            Forgot
          </Typography>
          <Typography color="primary" variant="h3" fontWeight="bold">
            password?
          </Typography>
          <Box my={2}>
            <Typography
              color="primary.dark"
              fontWeight="bold"
              mb={2}
              variant="body2"
            >
              Password
            </Typography>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  label="New password"
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
            {errors.newPassword ? (
              <Typography color="red" fontSize={12}>
                {errors.newPassword?.message}
              </Typography>
            ) : (
              ""
            )}
          </Box>
          <Box my={2}>
            <Typography
              color="primary.dark"
              fontWeight="bold"
              mb={2}
              variant="body2"
            >
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
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                fontWeight: "500",
                textTransform: "initial",
                backgroundColor: "#A1A1A1",
              }}
              onClick={handleSubmit(handleSubmitPassword)}
            >
              Reset password
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
