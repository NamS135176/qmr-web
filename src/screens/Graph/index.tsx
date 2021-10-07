import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DateHomeModal from "components/Modal/DateHomeModal";
import DownloadIcon from "@mui/icons-material/Download";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Nav from "../../components/Nav";
import BarChart from "components/Chart/BarChart";
import PieChart from "components/Chart/PieChart";
import HomeTable from "components/Table/HomeTable";
export default function Graph() {
  const [open, setOpen] = useState(false);
  const [chart, setChart] = useState("pie");
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  return (
    <Box>
      <Nav />
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
          <Typography>2021-10-05 ~ 2021-10-06</Typography>
          <IconButton
            // className={classes.menuButton}
            // edge="start"
            // aria-label="menu"
            onClick={handleOpen}
          >
            <DateRangeIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <Box>
          <Button
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
      {/* {money} */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            mt: 3,
            width: "1500px",
            // background: 'red',

            alignItems: "center",
            // flexWrap: {
            //   xs: 'wrap',
            // },
          }}
        >
          <Box
            sx={{
              minWidth: {
                xs: 200,
                md: 300,
                lg: 400,
              },
              m: {
                xs: 1,
                sm: 0,
              },
              boxShadow: 3,
            }}
          >
            <Card
              sx={{ display: "flex", alignItems: "center" }}
              variant="outlined"
            >
              <Box sx={{ p: 1, pb: 0, pr: 2 }}>
                <DownloadIcon
                  sx={{ background: "#BDEA74", color: "white", fontSize: 50 }}
                />
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  {t("money.income")}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                  ₫ 23000
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              minWidth: {
                xs: 200,
                md: 300,
                lg: 400,
              },
              m: {
                xs: 1,
                sm: 0,
              },
              boxShadow: 3,
            }}
          >
            <Card
              sx={{ display: "flex", alignItems: "center" }}
              variant="outlined"
            >
              <Box sx={{ p: 1, pb: 0, pr: 2 }}>
                <DownloadIcon
                  sx={{ background: "#36A9E1", color: "white", fontSize: 50 }}
                />
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  {t("money.expense")}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                  ₫ 23000
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              minWidth: {
                xs: 200,
                md: 300,
                lg: 400,
              },
              m: {
                xs: 1,
                sm: 0,
              },
              boxShadow: 3,
            }}
          >
            <Card
              sx={{ display: "flex", alignItems: "center" }}
              variant="outlined"
            >
              <Box sx={{ p: 1, pb: 0, pr: 2 }}>
                <LocalAtmIcon
                  sx={{ background: "#EAE874", color: "white", fontSize: 50 }}
                />
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  {t("money.total")}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                  ₫ 23000
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button
          sx={{
            background: chart === "pie" ? "#78CD51" : "#D6D9E0",
            color: "white",
            "&:hover": {
              background: chart === "pie" ? "#78CD51" : "#D6D9E0",
              color: "white",
            },
            p: 2,
            px: 4,
            mr: 3,
          }}
          onClick={() => {
            setChart("pie");
          }}
        >
          Pie
        </Button>
        <Button
          sx={{
            background: chart === "bar" ? "#78CD51" : "#D6D9E0",
            color: "white",
            "&:hover": {
              background: chart === "bar" ? "#78CD51" : "#D6D9E0",
              color: "white",
            },
            p: 2,
            px: 4,
          }}
          onClick={() => {
            setChart("bar");
          }}
        >
          Bar
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "space-around",
          },
          alignItems: "center",
          mt: 4,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            display: chart === "pie" ? "block" : "none",
          }}
        >
          <Box
            sx={{
              width: {
                xs: 300,
                md: 600,
              },
              background: "white",
              boxShadow: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 200,
                  md: 400,
                },
                background: "white",
                padding: {
                  xs: 1,
                  md: 3,
                },
              }}
            >
              <PieChart />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: 300,
              md: 600,
            },
            background: "white",
            padding: {
              xs: 1,
              md: 3,
            },
            mt: {
              xs: 2,
              md: 0,
            },
            height: {
              md: 400,
            },
            boxShadow: 2,
            display: chart === "bar" ? "block" : "none",
          }}
        >
          <BarChart />
        </Box>
      </Box>

      <DateHomeModal open={open} onClose={handleClose} />
    </Box>
  );
}
