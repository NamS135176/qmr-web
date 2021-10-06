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
export default function Home() {
  const [open, setOpen] = useState(false);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          mt: 3,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "space-around",
          },
          alignItems: "center",
          mt: 3,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: 200,
              md: 300,
            },
          }}
        >
          <PieChart />
        </Box>
        <Box
          sx={{
            width: {
              xs: 300,
              md: 500,
            },
          }}
        >
          <BarChart />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <HomeTable />
      </Box>
      <DateHomeModal open={open} onClose={handleClose} />
    </Box>
  );
}