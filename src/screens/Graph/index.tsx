import React, { useState, useContext, useEffect } from "react";
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
import DateSelectContext from "utils/context";
import { getGraph } from "api/graph";
import { getSummary } from "api/summary";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

interface Summary {
  price_balance: Number;
  price_expense: Number;
  price_income: Number;
}
export default function Graph() {
  const [open, setOpen] = useState(false);
  const [chart, setChart] = useState("pie");
  const { t, i18n } = useTranslation();
  const dateSelect = useContext(DateSelectContext);
  const { dateFrom, dateTo } = useContext(DateSelectContext);
  const [summary, setSummary] = useState({} as Summary);
  const [graph, setGraph] = useState<any>();
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  const getSummaryData = async () => {
    const summary = await getSummary(
      moment(dateFrom[0]).format("YYYY-MM-DD"),
      moment(dateTo[0]).format("YYYY-MM-DD")
    );
    // const summary = await getSummary(`2021-09-08`, `2021-09-15`);
    setSummary(summary);
  };
  const getGraphData = async () => {
    const graph = await getGraph(
      moment(dateFrom[0]).format("YYYY-MM-DD"),
      moment(dateTo[0]).format("YYYY-MM-DD")
    );
    setGraph(graph);
    console.log("🚀 ~ file: index.tsx ~ line 45 ~ getGraphData ~ graph", graph);
  };
  useEffect(() => {
    getSummaryData();
    getGraphData();
  }, [dateFrom, dateTo]);
  return (
    <Box>
      <Nav />
      <DatePicker dateSelect={dateSelect} isOpen={handleOpen} />

      {/* {money} */}
      {graph && summary ? (
        <>
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
                      sx={{
                        background: "#BDEA74",
                        color: "white",
                        fontSize: 50,
                      }}
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
                      sx={{
                        background: "#36A9E1",
                        color: "white",
                        fontSize: 50,
                      }}
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
                      sx={{
                        background: "#EAE874",
                        color: "white",
                        fontSize: 50,
                      }}
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
                  <PieChart data={graph?.price_by_category} />
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
              <BarChart
                data={graph?.price_by_time}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      )}

      <DateHomeModal open={open} onClose={handleClose} />
    </Box>
  );
}
