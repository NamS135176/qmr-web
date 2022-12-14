import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Chart from "react-apexcharts";
import color from "constant/";
import "./style.scss";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

export default function PieChart({ data }: any) {
  const { t, i18n } = useTranslation();

  const graphChangeName = data?.map((item) => {
    if (item.name === "?") {
      item.name = "Uncategorized";
      item.nameJP = "未分類";
    }
    return item;
  });

  const labels =
    i18n.language === "en"
      ? data?.sort((a, b) => b.total - a.total).map((item) => item.name)
      : data?.sort((a, b) => b.total - a.total).map((item) => item.nameJP);

  console.log("this is data", graphChangeName);

  const d = data?.map((item) => item.total);
  const option: any = {
    labels: labels,
    legend: {
      position: "right",
      // showForZeroSeries: false,
      horizontalAlign: "right",
      // offsetX: 100,
      fontWeight: "bold",
      // labels: {
      //   colors: 'red',
      //   // useSeriesColors: false,
      // },
    },

    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          chart: {
            width: "90%",
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    colors: color,
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config.w.config.labels[config.dataPointIndex]);
        },
      },
    },
  };
  return (
    <Box
      sx={{
        width: {
          md: "90%",
          lg: "80%",
          // background: 'red',
        },

        alignItems: "center",
        display: {
          xs: "flex",
          md: "block",
        },
        justifyContent: "center",
        px: {
          xs: 1,
          md: 0,
        },
        // background: 'yellow',
      }}
    >
      {data.length ? (
        <Chart className="pie-chart" options={option} series={d} type="pie" />
      ) : (
        <>
          <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
            {t("graph.pie_nodata")}
          </Typography>
        </>
      )}
    </Box>
  );
}
