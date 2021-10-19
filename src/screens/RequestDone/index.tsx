import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function RequestDone() {
  const history = useHistory();
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
            An e-mail has been sent to you with further instructions
          </p>

          <Box sx={{ marginTop: 2 }}>
            <Button
              onClick={() => {
                history.push("/login");
              }}
              variant="contained"
              fullWidth
            >
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
