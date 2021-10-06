import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { login } from "api/member";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function LoginScreen() {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [email, setEmail] = useState("tih920@smart-idea.jp");
  const [password, setPassword] = useState("Smart2012");

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setShowError(false);
      try {
        const res: any = await login(values.email, values.password);
        console.log(res);
        history.push("/home");
      } catch (error) {
        console.log("sdfsdfsdf");
        setShowError(true);
        // history.push("/home");
      }
    },
  });

  const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = useCallback(
    async (event: any) => {
      event.preventDefault();
      setShowError(false);
      try {
        const res: any = await login(email, password);
        console.log(res);

        window.localStorage.setItem("access_token", res.access_token);
        history.push("/");
      } catch (error) {
        console.log("handleLogin... error", error);
        setShowError(true);
      }
    },
    [email, password, history]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
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
            paddingBottom: 5,
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
            <img src={"assets/images/logo_en.png"} width="100%" />
            <p
              style={{
                fontSize: 15,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
              }}
            >
              Log in to Quick Money Recorder PC
            </p>
            <p
              style={{
                fontSize: 15,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
              }}
            >
              (Please input email address and password which has been registered
              to QMR Subscription)
            </p>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              sx={{ marginTop: 3 }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              sx={{ marginTop: 3 }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box
              sx={{
                borderBottom: 1,
                marginTop: 2,
                paddingBottom: 3,
                borderColor: "#eee",
              }}
            >
              <Button
                // onClick={handleLogin}
                variant="contained"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Box>
            <Box sx={{ paddingTop: 2 }}>
              <p
                style={{
                  fontSize: 15,
                  margin: 0,
                  padding: 0,
                  lineHeightStep: 1,
                  lineHeight: "1.1",
                }}
              >
                Quick Money Recorder PC is Beta version. Some function may not
                work.
              </p>
            </Box>
            <Box sx={{ paddingTop: 1 }}>
              <Link
                href="/forgot-password"
                sx={{
                  fontSize: 15,
                  margin: 0,
                  padding: 0,
                  lineHeightStep: 1,
                  lineHeight: "1.1",
                  color: "black",
                  "&:hover": {
                    color: "#428bca",
                  },
                }}
              >
                *If you forgot your password, re-issue new password here
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}