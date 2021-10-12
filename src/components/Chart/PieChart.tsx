import React from "react";
import { Pie, defaults } from "react-chartjs-2";
import Box from "@mui/material/Box";
import color from "constant/";
defaults.plugins.legend.display = true;
defaults.plugins.legend.position = "bottom";
export default function PieChart({ data }: any) {
  console.log({ data });
  const labels = data
    ?.sort((a, b) => b.total - a.total)
    .map((item) => item.category_name);
  const d = data?.map((item) => item.total);
  return (
    <Box sx={{}}>
      {data ? (
        <Pie
          data={{
            labels: labels,
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: color,
                data: d,
              },
            ],
          }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
