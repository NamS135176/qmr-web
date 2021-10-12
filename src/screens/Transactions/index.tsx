import React, { useEffect, useState, useContext } from "react";
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
import DatePicker from "components/DatePicker";
import DateSelectContext from "utils/context";
import { getCategory } from "api/category";
import { getListTransactions } from "api/transaction";
import { AnyARecord } from "dns";
import CircularProgress from "@mui/material/CircularProgress";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function ListPageScreen() {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState({ time: "2021-10-04 09:30:00" });
  const [open, setOpen] = useState(false);
  const dateSelect = useContext(DateSelectContext);
  const { dateFrom, dateTo } = useContext(DateSelectContext);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res1: any = await getCategory();
      const res2: any = await getListTransactions(dateFrom, dateTo, 20, 0);
      setCategories(res1.categories);
      const newList = res2.data.map((item: any) => {
        let cate: any = res1.categories.find(
          (it: any) => it.id == item.category_id
        );
        item.cate = cate.name;
        item.memo = item.memo.replaceAll("+", " ");
        item.memo = item.memo.replaceAll("%2B", "+");
        return item;
      });
      setTransactions(newList);
      setOffset(res2.offset);
      setTotal(res2.total);
      setLoading(false);
    };
    // getCate();
    getList();
  }, [dateFrom, dateTo]);
  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Nav page="list" />
      <DateHomeModal open={open} onClose={handleClose} />
      <DatePicker dateSelect={dateSelect} isOpen={handleOpen} />

      <EditModal
        data={itemData}
        setOpen={setOpenModal}
        open={openModal}
        listCategories={categories}
      ></EditModal>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
            paddingBottom: {
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
                  {transactions.map((row: any, index) => (
                    <TableRow
                      sx={
                        index % 2 === 0
                          ? { backgroundColor: "#f9f9f9" }
                          : { backgroundColor: "white" }
                      }
                      key={index}
                    >
                      <TableCell>{row.time}</TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ddd" }}
                        align="left"
                      ></TableCell>
                      <TableCell align="left">{row.cate}</TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ddd" }}
                        align="left"
                      ></TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ddd" }}
                        align="left"
                      ></TableCell>
                      <TableCell
                        sx={{ maxWidth: 300, wordBreak: "break-word" }}
                        align="left"
                      >
                        {row.memo}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ddd" }}
                        align="left"
                      ></TableCell>
                      <TableCell align="left">
                        {row.photo == "" ? (
                          <></>
                        ) : (
                          <CameraAlt sx={{ fontSize: 25, color: "black" }} />
                        )}
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
                          <DeleteOutlined
                            sx={{ fontSize: 25, color: "white" }}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Box>{total > 20 ? <Typography>ok page</Typography> : <></>}</Box> */}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
