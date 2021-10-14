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
import Button from "@mui/material/Button";
import EditModal from "components/Modal/EditModal";
import DateHomeModal from "components/Modal/DateHomeModal";
import CustomCell from "components/CustomCell";
import DatePicker from "components/DatePicker";
import DateSelectContext from "utils/context";
import { getCategory } from "api/category";
import { getListTransactions, deleteTransaction } from "api/transaction";
import { AnyARecord } from "dns";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

export default function ListPageScreen() {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState({ time: "2021-10-04 09:30:00" });
  const [open, setOpen] = useState(false);
  const dateSelect = useContext(DateSelectContext);
  const { dateFrom, dateTo } = useContext(DateSelectContext);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("downtime");
  const [order, setOrder] = useState("time");
  const [sort, setSort] = useState("desc");

  const handlePaging = (offset, total) => {
    if (total <= 20) {
      setTotal(0);
    } else {
      const nextpage = (total - 20) % 20;
      if (nextpage != 0) {
        setTotal(Math.floor(total / 20) + 1);
        console.log(Math.floor(total / 20) + 1);
      } else {
        setTotal(Math.floor(total / 20));
        console.log(Math.floor(total / 20));
      }
      // setPage(Math.round(offset/20))
      // console.log(Math.ceil((offset + 1)/20));
    }
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const getList = async (offset, time, sort) => {
    setLoading(true);
    const res1: any = await getCategory();
    const res2: any = await getListTransactions(
      dateFrom[0],
      dateTo[0],
      20,
      offset,
      time,
      sort
    );
    console.log({ res2 });

    setCategories(res1.categories);
    const newList = res2.data.map((item: any) => {
      let cate: any = res1.categories.find(
        (it: any) => it.id == item.category_id
      );
      item.cate = cate.name;
      item.memo = item.memo.replaceAll("+", " ");
      item.memo = decodeURIComponent(item.memo);
      return item;
    });
    setTransactions(newList);
    handlePaging(res2.offset, res2.total);
    setLoading(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    getList((value - 1) * 20, order, sort);
  };

  useEffect(() => {
    getList(0, order, sort);
  }, [dateFrom, dateTo]);
  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Nav page="list" />
      <DateHomeModal open={open} onClose={handleClose} />
      <DatePicker dateSelect={dateSelect} isOpen={handleOpen} />

      {openModal ? (
        <EditModal
          data={itemData}
          setOpen={setOpenModal}
          open={openModal}
          listCategories={categories}
          getList={getList}
          page={page}
          order={order}
          sort={sort}
        ></EditModal>
      ) : (
        <></>
      )}
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
                    <CustomCell
                      setPage={setPage}
                      setOrder={setOrder}
                      setSort={setSort}
                      getList={getList}
                      sort="time"
                      setDirect={setDirection}
                      direct={direction}
                    ></CustomCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      {t("table.column2")}
                    </TableCell>
                    <CustomCell
                      setPage={setPage}
                      setOrder={setOrder}
                      setSort={setSort}
                      getList={getList}
                      sort="category_id"
                      setDirect={setDirection}
                      direct={direction}
                    ></CustomCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      {t("table.column3")}
                    </TableCell>
                    <CustomCell
                      setPage={setPage}
                      setOrder={setOrder}
                      setSort={setSort}
                      getList={getList}
                      sort="price"
                      setDirect={setDirection}
                      direct={direction}
                    ></CustomCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      {t("table.column4")}
                    </TableCell>
                    <CustomCell
                      setPage={setPage}
                      setOrder={setOrder}
                      setSort={setSort}
                      getList={getList}
                      sort="memo"
                      setDirect={setDirection}
                      direct={direction}
                    ></CustomCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      {t("table.column5")}
                    </TableCell>
                    <CustomCell
                      setPage={setPage}
                      setOrder={setOrder}
                      setSort={setSort}
                      getList={getList}
                      sort="photo"
                      setDirect={setDirection}
                      direct={direction}
                    ></CustomCell>
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
                      <TableCell align="left" sx={{ minWidth: 80 }}>
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
                      <TableCell align="left" sx={{ minWidth: 150 }}>
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
                          onClick={async () => {
                            const r = window.confirm(t("editmodal.confirm"));
                            if (r) {
                              const res = await deleteTransaction(row.id);
                              getList((page - 1) * 20, order, sort);
                              //  console.log('ssdkjfhsdjkfhskdjhf');
                            }
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
            {total != 0 ? (
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <Pagination
                  page={page}
                  onChange={handleChangePage}
                  count={total}
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            ) : (
              <></>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
