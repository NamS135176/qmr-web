import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Chart from "react-apexcharts";
import color from "constant/";
defaults.plugins.legend.display = false;
// defaults.plugins.legend.position = "bottom";
export default function PieChart({ data }: any) {
  const labels = data
    ?.sort((a, b) => b.total - a.total)
    .map((item) => item.category_name);
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
        width: "100%",
        alignItems: "center",
        display: {
          xs: "flex",
          md: "block",
        },
        justifyContent: "center",
      }}
    >
      {data ? <Chart options={option} series={d} type="pie" /> : <></>}
    </Box>
  );
}
