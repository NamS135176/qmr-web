import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import Nav from "components/Nav";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import CameraAlt from "@mui/icons-material/CameraAlt";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import EditModal from "components/Modal/EditModal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DateHomeModal from "components/Modal/DateHomeModal";
import CustomCell from "components/CustomCell";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ListPageScreen() {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  useEffect(() => {});
  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Nav />
      <DateHomeModal open={open} onClose={handleClose} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box>
          <Button
            sx={{
              background: "white",
              color: "black",
              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
            variant="contained"
          >
            <KeyboardArrowLeftIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography>2021-10-05 ~ 2021-10-06</Typography>
          <IconButton
            // className={classes.menuButton}
            // edge="start"
            // aria-label="menu"
            onClick={handleOpen}
          >
            <DateRangeIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <Box>
          <Button
            sx={{
              background: "white",
              color: "black",
              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
            variant="contained"
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
      <EditModal
        data={itemData}
        setOpen={setOpenModal}
        open={openModal}
      ></EditModal>
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
          <Typography>{t("table.table_head")}</Typography>
        </Paper>
        <Paper square elevation={1} sx={{ padding: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    {t("table.column1")}{" "}
                  </TableCell>
                  <CustomCell></CustomCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("table.column2")}
                  </TableCell>
                  <CustomCell></CustomCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("table.column3")}
                  </TableCell>
                  <CustomCell></CustomCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("table.column4")}
                  </TableCell>
                  <CustomCell></CustomCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("table.column5")}
                  </TableCell>
                  <CustomCell></CustomCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {t("table.column6")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    sx={
                      index % 2 === 0
                        ? { backgroundColor: "#f9f9f9" }
                        : { backgroundColor: "white" }
                    }
                    key={row.name}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ddd" }}
                      align="left"
                    ></TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ddd" }}
                      align="left"
                    ></TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ddd" }}
                      align="left"
                    ></TableCell>
                    <TableCell align="left">{row.carbs}</TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ddd" }}
                      align="left"
                    ></TableCell>
                    <TableCell align="left">
                      <CameraAlt sx={{ fontSize: 25, color: "black" }} />
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ddd" }}
                      align="left"
                    ></TableCell>
                    <TableCell align="left">
                      <Button
                        sx={{
                          backgroundColor: "#67c2ef",
                          minWidth: 40,
                          marginRight: 1,
                        }}
                        onClick={() => {
                          setOpenModal(true);
                          setItemData(row);
                        }}
                      >
                        <EditOutlined sx={{ fontSize: 25, color: "white" }} />
                      </Button>
                      <Button
                        onClick={() => {
                          const r = window.confirm(t("editmodal.confirm"));
                        }}
                        sx={{ backgroundColor: "#fabb3d", minWidth: 40 }}
                      >
                        <DeleteOutlined sx={{ fontSize: 25, color: "white" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
