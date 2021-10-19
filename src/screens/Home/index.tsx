import DownloadIcon from "@mui/icons-material/Download";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { getCurrencies } from "api/curency";
import { getGraph } from "api/graph";
import { getCurrentMember } from "api/member";
import { getSummary } from "api/summary";
import BarChart from "components/Chart/BarChart";
import PieChart from "components/Chart/PieChart";
import DatePicker from "components/DatePicker";
import DateHomeModal from "components/Modal/DateHomeModal";
import HomeTable from "components/Table/HomeTable";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DateSelectContext from "utils/context";
import Nav from "../../components/Nav";
import "./style.scss";

interface Summary {
  price_balance: Number;
  price_expense: Number;
  price_income: Number;
}
export default function Home() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState({} as Summary);
  const [graph, setGraph] = useState<any>();
  const { t, i18n } = useTranslation();
  const dateSelect = useContext(DateSelectContext);
  const { dateFrom, dateTo, reloadPage } = useContext(DateSelectContext);
  const currency: any = localStorage.getItem("currency");
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
      <Nav page="home" />
      <DatePicker dateSelect={dateSelect} isOpen={handleOpen} />
      {/* {money} */}
      {summary && graph ? (
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
                      {JSON.parse(currency)?.symbol}
                      {new Intl.NumberFormat("jp-JA", {
                        style: "currency",
                        currency: "JPY",
                        currencyDisplay: "code",
                      })
                        .format(Number(summary.price_income))
                        .replace("JPY", "")
                        .trim()}
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
                      {JSON.parse(currency)?.symbol}
                      {new Intl.NumberFormat("jp-JA", {
                        style: "currency",
                        currency: "JPY",
                        currencyDisplay: "code",
                      })
                        .format(Number(summary.price_expense))
                        .replace("JPY", "")
                        .trim()}
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
                      {JSON.parse(currency)?.symbol}
                      {new Intl.NumberFormat("jp-JA", {
                        style: "currency",
                        currency: "JPY",
                        currencyDisplay: "code",
                      })
                        .format(Number(summary.price_balance))
                        .replace("JPY", "")
                        .trim()}
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
                  lg: 600,
                },
                height: {
                  md: 300,
                  xs: 200,
                  lg: 450,
                },

                background: "white",
                boxShadow: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PieChart data={graph?.price_by_category} />
            </Box>
            <Box
              sx={{
                width: {
                  xs: 300,
                  md: 450,
                  lg: 600,
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
                  xs: 200,
                  lg: 450,
                },
                boxShadow: 2,
              }}
              className="bar-chart"
            >
              <div className="bar-chart-fake">
                <BarChart
                  data={graph?.price_by_time}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                />
              </div>
            </Box>
          </Box>
          <Box sx={{ mt: 3, mb: 3 }}>
            <HomeTable data={graph?.price_by_category} />
          </Box>
        </>
      ) : (
        <>
          {" "}
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
