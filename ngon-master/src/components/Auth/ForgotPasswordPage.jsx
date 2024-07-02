import { Mail } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
// import { LOCAL_STORAGE } from "../../constants/endpoint";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../Header/Header";
import authApi from "../../api/authApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is wrong. Try again.")
      .email("Email is wrong. Try again.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

	const handleSubmitEmail = async (data) => {
		const email = data.email;
    try {
      const response =  await authApi.forgotPassword({ email }); // Added await here
      localStorage.setItem("resetEmail", email);
      if (response.status === 200) {
        alert("Reset password link sent to your email. Please check your email.");
        navigate("/my-page/forgot-password/otp");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Failed to send reset password link:", error);
      alert("Failed to send reset password link. Please try again.");
    }
		
  };

  return (
    <div className="my-page">
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
            <Box>
              <Typography color="primary.dark" mb={2} variant="body2">
                Enter email address associated with your account
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
            <Box mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                }}
                onClick={handleSubmit(handleSubmitEmail)}
              >
                Reset password
              </Button>
            </Box>
          </Box>
          <div className="forgotpass-or">
            <span>Or</span>
          </div>
          <div className="forgotpass-other">
            <Box>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  width: "100%",
                  fontWeight: "500",
                  textTransform: "initial",
                }}
                onClick={() => navigate("/my-page")}
              >
                Back to login
              </Button>
            </Box>
           
          </div>
        </div>
      </div>
    </div>
  );
}

// export function OTPInput({ control, handleSubmitOTP }) {
//   return (
//     <Box>
//       <Typography color="primary.dark" my={3} variant="body2">
//         Enter the 6 digits just sent to your email
//       </Typography>
//       <Box>
//         <Controller
//           name="otpValue"
//           control={control}
//           render={({ field }) => (
//             <MuiOtpInput
// 							value={field.value}
// 							onChange={field.onChange}
//               length={6}
//               TextFieldsProps={{
//                 size: "small",
//                 type: "password",
//                 sx: {
//                   width: 50,
//                   height: 30,
//                 },
//               }}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 mt: 3,
//                 mb: 5,
//               }}
//             />
//           )}
//         />
//       </Box>
//       <Button
//         variant="contained"
//         size="large"
//         color="primary"
//         sx={{
//           width: "100%",
//           fontWeight: "500",
//           textTransform: "initial",
//         }}
//         onClick={handleSubmitOTP}
//       >
//         Submit
// 			</Button>
// 			<Typography sx={{ fontSize: 12, color: '#A1A1A1', mt: 1 }}>
// 				Not received any email? Resend in  02:52
// 			</Typography>
//     </Box>
//   );
// }
