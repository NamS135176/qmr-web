import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { forgotPassword } from "api/member";

export default function ForgotPassScreen() {
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = useMemo(() => {
    return {
      email: "tih920@smart-idea.jp",
    };
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
      }),
    []
  );

  const onSubmit = async ({ email }) => {
    setShowError(false);
    try {
      console.log(email);

      const res: any = await forgotPassword(email);
      // window.localStorage.setItem("access_token", res.access_token);
      // var decoded = jwt_decode(res.access_token);
      console.log(res);

      setLoading(false);
      // history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowError(true);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    validateForm,
    isValid,
    values,
    errors,
    touched,
  } = formik;

  const handleForgotPass = (e: any) => {
    e.preventDefault();
    validateForm();
    if (!isValid) {
      return;
    }
    handleSubmit();
  };

  return (
    <Box
      sx={{
        width: `100%`,
        height: `100vh`,
        backgroundColor: "#383e4b",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#383e4b",
          boxSizing: "border-box",
          paddingTop: {
            xs: 5,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            // marginTop: 100,
            padding: 3,
            minWidth: 250,
            marginLeft: `auto`,
            marginRight: `auto`,
            width: {
              xs: "80%",
              md: "30%",
              lg: "20%",
            },
          }}
        >
          {showError ? (
            <p
              style={{
                fontSize: 13,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "red",
              }}
            >
              Email or password is invalid. Please try again.
            </p>
          ) : (
            <p></p>
          )}
          <img src="assets/images/logo_en.png" width="100%" />

          <p
            style={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
              wordBreak: `break-word`,
            }}
          >
            Enter your email address to reset your password. You may need to
            check your spam folder or unblock okanereco_support_d@docomo.ne.jp
          </p>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            sx={{ marginTop: 3 }}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <Box sx={{ marginTop: 2 }}>
            <Button onClick={handleForgotPass} variant="contained" fullWidth>
              Send Mail
            </Button>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Link style={{ textDecoration: "none" }} to={`/`}>
              <Button onClick={() => {}} variant="contained" fullWidth>
                Back
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
