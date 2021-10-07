import React from "react";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
export default function CustomCell() {
  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        maxWidth: 10,
        borderRight: "1px solid #ddd",
        paddingRight: {
          xs: 3,
          md: 0,
        },
      }}
      align="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ArrowDropUp sx={{ fontSize: 20, color: "black" }} />
        <ArrowDropDown sx={{ fontSize: 20, color: "black" }} />
      </Box>
    </TableCell>
  );
}
