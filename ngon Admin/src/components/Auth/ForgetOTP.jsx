import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../Header/Header";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

export default function OTPPage() {
	const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let timerId;
    setTimer(60 * 3);
    timerId = setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timer < 0) {
      setTimer(0);
    }
  }, [timer]);

  const seconds = String(timer % 60).padStart(2, 0);
  const minutes = String(Math.floor(timer / 60)).padStart(2, 0);

  const validationSchema = Yup.object().shape({
    otpValue: Yup.string()
      .required("OTP is required.")
      .min(6, "OTP invalid.")
      .matches(/^[0-9]+$/, "OTP must be a number."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otpValue: "",
    },
    resolver: yupResolver(validationSchema),
  });

	const handleSubmitOTP = (data) => {
        const email = localStorage.getItem('resetEmail');
        
		handleVerifyCode(email, data.otpValue);
  };

  const handleVerifyCode = async (email, code) => {
        const response = await authApi.checkCode({ email, code });
       
        if(response.data.valid) {
            localStorage.setItem('resetCode', code);
            navigate("/my-page/forgot-password/change-password");
        } else {
            alert("Invalid code. Please try again.");
        }
  };
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
            <Typography color="primary.dark" my={3} variant="body2">
              Enter the 6 digits just sent to your email
            </Typography>
            <Box>
              <Controller
                name="otpValue"
                control={control}
                render={({ field }) => (
                  <MuiOtpInput
                    {...field}
                    length={6}
                    TextFieldsProps={{
                      size: "small",
                      type: "password",
                      sx: {
                        width: 50,
                        height: 30,
                      },
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 3,
                      mb: 5,
                    }}
                  />
                )}
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
                width: "100%",
                fontWeight: "500",
                textTransform: "initial",
              }}
              onClick={handleSubmit(handleSubmitOTP)}
            >
              Submit
            </Button>
            {errors.otpValue ? (
              <Typography color="red" fontSize={12} mt={1}>
                {errors.otpValue?.message}
              </Typography>
            ) : (
              ""
            )}
            <Typography sx={{ fontSize: 12, color: "#A1A1A1", mt: 1 }}>
              Not received any email? Resend in
              <span style={{ fontWeight: "bold" }}>
                {timer > 0 ? ` ${minutes}:${seconds}` : ` 00:00`}
              </span>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}
