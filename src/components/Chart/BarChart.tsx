import React from "react";
import { Bar, defaults, Chart } from "react-chartjs-2";
import Box from "@mui/material/Box";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

defaults.plugins.legend.display = true;
defaults.plugins.legend.position = "bottom";
const fakeA = new Array(100).fill(1).map((i, index) => index + 1);
const fakeB = new Array(100).fill(1).map((i, index) => index + 10);
console.log("🚀 ~ file: BarChart.tsx ~ line 7 ~ fakeA", fakeA);
export default function BarChart() {
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
        pan: {
          enabled: true,
          mode: "xy",
          threshold: 5,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "category",
        min: 5,
        max: 365,
      },
      y: {
        type: "linear",
      },
    },
  };
  return (
    <Box sx={{}}>
      <Bar
        options={options}
        data={{
          labels: fakeA,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#59AF32",
                "#59AF32",
                "#59AF32",
                "#59AF32",
                "#59AF32",
              ],
              data: fakeB,
            },
          ],
        }}
      />
    </Box>
  );
}
