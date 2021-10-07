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

const data = [
  { categoryName: "Socializing", price: 123 },
  { categoryName: "Rent", price: 234 },
];
const Progress = ({ value }: any) => {
  return (
    <LinearProgress
      sx={{ height: 15, borderRadius: 5 }}
      variant="determinate"
      value={value}
    />
  );
};
export default function HomeTable() {
  const { t, i18n } = useTranslation();

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
            {data.map((row, index) => (
              <TableRow
                key={row.categoryName}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  background: index % 2 === 0 ? "#f9f9f9" : "white",
                }}
              >
                <TableCell>{row.categoryName}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <Progress value={20} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
