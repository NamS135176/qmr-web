import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import Box from "@mui/material/Box";

defaults.plugins.legend.display = false;
export default function PieChart() {
  return (
    <Box>
      <Pie
        data={{
          labels: ["1", "05", "09", "13", "17", "21", "25", "29"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
              data: [2478, 5267, 734, 784, 433],
            },
          ],
        }}
      />
    </Box>
  );
}
