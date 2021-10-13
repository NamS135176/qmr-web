import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
export default function CustomCell(props) {
  // const [direction, setDirection] = useState('')
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
      align="right"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          onClick={() => {
            props.setDirect("up" + props.sort);
            props.setOrder(props.sort);
            props.setSort("asc");
            props.getList(0, props.sort, "asc");

            props.setPage(1);
          }}
          aria-label="delete"
          size="small"
        >
          {props.direct == `up${props.sort}` ? (
            <ArrowDropUp sx={{ fontSize: 15, color: "black" }} />
          ) : (
            <ArrowDropUp sx={{ fontSize: 15, color: "#ddd" }} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            props.setDirect("down" + props.sort);
            props.setOrder(props.sort);
            props.setSort("desc");
            props.getList(0, props.sort, "desc");

            props.setPage(1);
          }}
          aria-label="delete"
          size="small"
        >
          {props.direct == `down${props.sort}` ? (
            <ArrowDropDown sx={{ fontSize: 15, color: "black" }} />
          ) : (
            <ArrowDropDown sx={{ fontSize: 15, color: "#ddd" }} />
          )}
        </IconButton>
      </Box>
    </TableCell>
  );
}
