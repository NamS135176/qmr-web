import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
          {data.map((row) => (
            <TableRow
              key={row.categoryName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
}
