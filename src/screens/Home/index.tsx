import React, { useContext, useState, useEffect } from "react";
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
import DatePicker from "components/DatePicker";
import "./style.scss";
import DateSelectContext from "utils/context";
import { getSummary } from "api/summary";
import CircularProgress from "@mui/material/CircularProgress";

interface Summary {
  price_balance: Number;
  price_expense: Number;
  price_income: Number;
}
export default function Home() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState({} as Summary);
  const { t, i18n } = useTranslation();
  const dateSelect = useContext(DateSelectContext);
  const { dateFrom, dateTo } = useContext(DateSelectContext);
  const getSummaryData = async () => {
    console.log({ dateFrom: dateFrom[0], dateTo: dateTo[0] });
    const summary = await getSummary(dateFrom, dateTo);
    // const summary = await getSummary(`2021-09-01`, `2021-09-30`);
    setSummary(summary);
    console.log({ summary });
  };
  useEffect(() => {
    getSummaryData();
  }, [dateFrom, dateTo]);
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  return summary ? (
    <Box>
      <Nav page="home" />
      <DatePicker dateSelect={dateSelect} isOpen={handleOpen} />
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
                  {summary.price_income}
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
                  {summary.price_expense}
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
                  {summary.price_balance}
                </Typography>
              </Box>
            </Card>
          </Box>
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
          mt: 4,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: 300,
              md: 450,
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
                md: 300,
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
        <Box
          sx={{
            width: {
              xs: 300,
              md: 450,
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
              md: 300,
              sx: 100,
            },
            boxShadow: 2,
          }}
          className="bar-chart"
        >
          <div className="bar-chart-fake">
            <BarChart />
          </div>
        </Box>
      </Box>
      <Box sx={{ mt: 3, mb: 3 }}>
        <HomeTable />
      </Box>
      <DateHomeModal open={open} onClose={handleClose} />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
