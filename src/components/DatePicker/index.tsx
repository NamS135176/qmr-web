import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import { useTranslation } from "react-i18next";
export default function Index({ isOpen, dateSelect }) {
  const { dateFrom, dateTo, monthYear, openModal } = dateSelect;
  const { t, i18n } = useTranslation();
  const handlePreviousMonth = () => {
    const currentTime = moment(monthYear[0])
      .subtract(1, "months")
      .endOf("month");

    openModal[1](false);
    monthYear[1](currentTime);
    dateFrom[1](moment(currentTime).startOf("month").format("YYYY-MM-DD"));
    dateTo[1](moment(currentTime).endOf("month").format("YYYY-MM-DD"));
    console.log(dateFrom[0]);
  };
  const handleNextMonth = () => {
    const currentTime = moment(monthYear[0]).add(1, "months").endOf("month");

    openModal[1](false);
    monthYear[1](currentTime);
    dateFrom[1](moment(currentTime).startOf("month").format("YYYY-MM-DD"));
    dateTo[1](moment(currentTime).endOf("month").format("YYYY-MM-DD"));
    console.log(dateFrom[0]);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box>
          <Button
            onClick={handlePreviousMonth}
            sx={{
              background: "white",
              color: "black",
              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
            variant="contained"
          >
            <KeyboardArrowLeftIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
          }}
        >
          {openModal[0] ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>{dateFrom[0]}</Typography>
              <Typography sx={{ paddingLeft: 1, paddingRight: 1 }}>
                ~
              </Typography>
              <Typography>{dateTo[0]}</Typography>
            </Box>
          ) : (
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  alignItems: "center",
                  justifyContent: "center",
                  width: {
                    md: 130,
                    xs: 100,
                  },
                }}
              >
                {i18n.language == "en" ? (
                  <Typography sx={{ textAlign: "center" }}>
                    {moment(monthYear[0]).format("MMMM YYYY")}
                  </Typography>
                ) : (
                  <Typography sx={{ textAlign: "center" }}>
                    {moment(monthYear[0]).format("YYYY年 MM月")}
                  </Typography>
                )}
              </Box>
            </div>
          )}
          <IconButton
            // className={classes.menuButton}
            // edge="start"
            // aria-label="menu"
            onClick={isOpen}
          >
            <DateRangeIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <Box>
          <Button
            onClick={handleNextMonth}
            sx={{
              background: "white",
              color: "black",
              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
            variant="contained"
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
    </div>
  );
}
