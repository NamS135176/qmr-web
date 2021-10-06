import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  InputBase,
  Button,
  Link
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/images/logo_en.png";
import api from "../../api/api";
import { useHistory } from "react-router-dom";



export default function LoginScreen() {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async () => {
    setShowError(false);
    try {
      const res: any = await api.post("/login", {
        email: email,
        password: password,
      });
      console.log(res);
      history.push("/home");
    } catch (error) {
      console.log("sdfsdfsdf");
      setShowError(true);
      // history.push("/home");
    }
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
          <img src={logo} width="100%" />
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
          <InputBase
            type="email"
            placeholder="type email"
            sx={{
              marginTop: 2,
              background: "#e4e6eb",
              width: "100%",
              padding:1,
              paddingLeft:2
            }}
            onChange={handleChangeMail}
          ></InputBase>
          <InputBase
            type="password"
            placeholder="password"
            sx={{
              marginTop: 2,
              background: "#e4e6eb",
              width: "100%",
              padding:1,
              paddingLeft:2
            }}
            onChange={handleChangePass}
          ></InputBase>
          <Box
            sx={{
              borderBottom: 1,
              marginTop: 2,
              paddingBottom: 3,
              borderColor: "#eee",
            }}
          >
            <Button
              onClick={handleLogin}
              variant="contained"
              color="neutral"
              fullWidth
            >
              Login
            </Button>
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <p  style={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
            }}>
              Quick Money Recorder PC is Beta version. Some function may not
              work.
            </p>
          </Box>
          <Box sx={{ paddingTop: 1 }}>
           <Link href="/forgot_password" sx={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
              color: "black",
              "&:hover": {
                color: "#428bca",
              },
           }}>
           *If you forgot your password, re-issue new password here
           </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
