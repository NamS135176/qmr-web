import React from "react";
import { Bar, defaults } from "react-chartjs-2";
import Box from "@mui/material/Box";
defaults.plugins.legend.display = true;
defaults.plugins.legend.position = "bottom";
const fakeA = new Array(100).fill(1).map((i, index) => index + 1);
const fakeB = new Array(100).fill(1).map((i, index) => index + 10);
console.log("🚀 ~ file: BarChart.tsx ~ line 7 ~ fakeA", fakeA);
export default function BarChart() {
  return (
    <Box sx={{}}>
      <Bar
        options={{
          responsive: true,
        }}
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
