import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
export default function index() {
  return (
    <Box
      sx={{
        padding: 5,
      }}
    >
      <Card
        sx={{
          display: "flex",
          //   alignItems: 'center',
          flexDirection: "column",
          boxShadow: "0 0 8px #d0d0d0",
        }}
        variant="outlined"
      >
        <Typography
          sx={{ pt: 1, px: 2 }}
          color="text.secondary"
          variant="h5"
          gutterBottom
        >
          404 Page Not Found
        </Typography>
        <Divider />
        <Typography sx={{ pt: 1, px: 2 }} color="text.secondary" gutterBottom>
          The page you requested was not found.
        </Typography>
      </Card>
    </Box>
  );
}
