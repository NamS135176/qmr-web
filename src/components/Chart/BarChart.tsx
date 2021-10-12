import React from "react";
import { Bar, defaults, Chart } from "react-chartjs-2";
import Box from "@mui/material/Box";
import zoomPlugin from "chartjs-plugin-zoom";
import moment from "moment";
Chart.register(zoomPlugin);

defaults.plugins.legend.display = true;
defaults.plugins.legend.position = "bottom";
export default function BarChart({ data, dateFrom, dateTo }: any) {
  const dateA = moment(dateFrom, "YYYY-MM-DD");
  const dateB = moment(dateTo, "YYYY-MM-DD");
  const arrDays: string[] = [];
  const arrFullDays: string[] = [];
  for (let i = 0; i < moment.duration(dateB.diff(dateA)).asDays() + 1; i++) {
    arrDays.push(moment(dateFrom, "YYYY-MM-DD").add(i, "days").format("DD"));
    arrFullDays.push(
      moment(dateFrom, "YYYY-MM-DD").add(i, "days").format("YYYY-MM-DD")
    );
  }
  const arrData = arrFullDays.map((item) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["date"] === item) {
        count = data[i]["total"];
        break;
      }
    }
    return count;
  });
  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 1.5,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true, // SET SCROOL ZOOM TO TRUE
          },
          mode: "x",
          speed: 100,
        },
      },
    },
  };
  return (
    <Box sx={{}}>
      <Bar
        options={options}
        data={{
          labels: arrDays,
          datasets: [
            {
              label: "Graph",
              backgroundColor: ["#BDDFAD"],
              data: arrData,
              borderWidth: 2,
              borderColor: "#59AF32",
              hoverBackgroundColor: "#A4D38F",
            },
          ],
        }}
      />
    </Box>
  );
}
