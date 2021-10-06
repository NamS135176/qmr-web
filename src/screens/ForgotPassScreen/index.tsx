import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ForgotPassScreen() {
  const [showError, setShowError] = useState<boolean>(false);
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
            }}
          >
            Enter your email address to reset your password. You may need to
            check your spam folder or unblock okanereco_support_d@docomo.ne.jp
          </p>
          <InputBase
            type="email"
            placeholder="type email"
            sx={{
              marginTop: 2,
              background: "#e4e6eb",
              width: "100%",
              padding: 1,
              paddingLeft: 2,
            }}
          ></InputBase>

          <Box sx={{ marginTop: 2 }}>
            <Button
              onClick={() => {
                setShowError(!showError);
              }}
              variant="contained"
              color="neutral"
              fullWidth
            >
              Send Mail
            </Button>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Link style={{ textDecoration: "none" }} to={`/`}>
              <Button
                onClick={() => {}}
                variant="contained"
                color="neutral"
                fullWidth
              >
                Back
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
