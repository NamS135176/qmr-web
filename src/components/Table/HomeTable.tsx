import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useTranslation } from "react-i18next";

const Progress = ({ value }: any) => {
  return (
    <LinearProgress
      sx={{ height: 15, borderRadius: 5 }}
      variant="determinate"
      value={value}
    />
  );
};
export default function HomeTable({ data }: any) {
  const { t, i18n } = useTranslation();
  const currency: any = localStorage.getItem("currency");
  let totalPrice = 0;

  const d = data?.sort((a, b) => {
    return b.total - a.total;
  });

  const graphChangeName = d.map((item) => {
    if (item.category_name === "?") {
      i18n.language === "en"
        ? (item.category_name = "Uncategorized")
        : (item.category_name = "未分類");
    }
    return item;
  });
  console.log({ graphChangeName });
  if (d) {
    for (const element of d) {
      totalPrice += element.total;
    }
  }
  return (
    <Box
      sx={{
        paddingLeft: {
          xs: 2,
          md: 10,
        },
        paddingRight: {
          xs: 2,
          md: 10,
        },
        paddingTop: {
          xs: 2,
          md: 5,
        },
      }}
    >
      {d ? (
        <>
          <Paper
            elevation={1}
            square
            sx={{
              backgroundColor: "#78CD51",
              color: "white",
              padding: 1,
              fontSize: 15,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Typography>{t("categories.title")}</Typography>
          </Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("categories.name")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("categories.price")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {" "}
                    {t("categories.total")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {d.map((row, index) => (
                  <TableRow
                    key={row.category_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      background: index % 2 === 0 ? "#f9f9f9" : "white",
                    }}
                  >
                    <TableCell>{row.category_name}</TableCell>
                    <TableCell align="left">
                      {JSON.parse(currency)?.symbol}
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                        currencyDisplay: "code",
                      })
                        .format(row.total)
                        .replace("JPY", "")
                        .trim()}
                    </TableCell>
                    <TableCell align="left">
                      <Progress value={(row.total * 100) / totalPrice} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
