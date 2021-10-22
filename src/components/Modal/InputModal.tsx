import React, { useState, useEffect, useContext, useMemo } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import "./style.scss";
import Typography from "@mui/material/Typography";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Button from "@mui/material/Button";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { getCategory } from "api/category";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import { createTransaction } from "api/transaction";
import moment from "moment";
import DateSelectContext from "utils/context";
import CustomizeModal from "./CustomizeModal";
import DetailModal from "./DetailModal";

export default function InputModal(props) {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const listNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [up, setUp] = useState(false);
  const [money, setMoney] = useState("0");
  const [listExpense, setListExpense] = useState([]);
  const [listIncome, setListIncome] = useState([]);
  const [income, setIncome] = useState({});
  const { t, i18n } = useTranslation();
  const [exFocus, setExFocus] = useState(-1);
  const [isIncome, setIsIncome] = useState(false);
  const [loadCate, setLoadCate] = useState(false);
  const [cateSelect, setCateSelect] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [df, setDefault] = useState<any>(false);
  const { dateFrom, dateTo, reloadPage } = useContext(DateSelectContext);
  const [listAll, setListAll] = useState<any>([]);
  const handleUp = () => {
    setUp(true);
  };
  const handleDown = () => {
    setUp(false);
  };

  const handleQuickCreate = async () => {
    if (cateSelect) {
      console.log(cateSelect.id);

      setLoading(true);
      const res: any = await createTransaction(
        cateSelect.id,
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        Number(money),
        "",
        window.navigator.userAgent
      );
      setLoading(false);
      props.setOpen(false);
      reloadPage[1](!reloadPage[0]);
    } else {
      setLoading(true);
      const res: any = await createTransaction(
        df.id,
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        Number(money),
        "",
        window.navigator.userAgent
      );
      setLoading(false);
      props.setOpen(false);
      reloadPage[1](!reloadPage[0]);
    }
  };

  const getCate = async () => {
    setLoadCate(true);
    const res: any = await getCategory();
    setListExpense(res.categories.filter((item: any) => item.count < 900));
    setListIncome(res.categories.filter((item: any) => item.count >= 900));
    setDefault(res.categories.find((item: any) => item.name == "Income"));
    setIncome(res.categories.filter((item: any) => item.count >= 900)[0]);
    const list = res.categories;
    list.pop();
    setListAll(list);
    setLoadCate(false);
  };

  useEffect(() => {
    getCate();
  }, []);

  return (
    <Box>
      {openDetailModal ? (
        <DetailModal
          closeParent={props.setOpen}
          open={openDetailModal}
          setOpen={setOpenDetailModal}
        ></DetailModal>
      ) : (
        <></>
      )}
      {openCustom ? (
        <CustomizeModal
          closeParent={props.setOpen}
          open={openCustom}
          setOpen={setOpenCustom}
          listAll={listExpense}
          setListExpense={setListExpense}
        ></CustomizeModal>
      ) : (
        <></>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // open='open'
        onClose={() => {
          props.setOpen(false);
        }}
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              // border: '2px solid #000',
              boxShadow: 24,
              maxHeight: "800px",
              //   borderRadius: 2,
              maxWidth: "512px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  padding: {
                    xs: "1px",
                    md: "5px",
                  },
                }}
              >
                <IconButton onClick={() => props.setOpen(false)}>
                  <HighlightOff
                    sx={{
                      fontSize: {
                        xs: 25,
                        md: 30,
                      },
                    }}
                  ></HighlightOff>
                </IconButton>
              </Box>
              {loadCate ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "90%",
                    overflow: "scroll",
                    paddingBottom: "25px",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gridGap: "5px",
                      padding: "8px",
                    }}
                  >
                    {listExpense?.map((item: any, index) => {
                      if (index == exFocus) {
                        return (
                          <Button
                            onClick={() => {
                              setExFocus(-1);
                              setUp(false);
                              setCateSelect(null);
                            }}
                            sx={{
                              backgroundColor: "#9AC30C",
                              color: "black",
                              minHeight: {
                                xs: "80px",
                                md: "60px",
                              },
                              wordBreak: "break-word",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#9AC30C",
                              },
                            }}
                          >
                            {i18n.language == "en" ? item.name : item.nameJP}
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            onClick={() => {
                              setIsIncome(false);
                              setExFocus(index);
                              setUp(true);
                              setCateSelect(listExpense[index]);
                            }}
                            sx={{
                              backgroundColor: "#D7D6D6",
                              color: "black",
                              minHeight: {
                                xs: "80px",
                                md: "60px",
                              },
                              wordBreak: "break-word",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#9AC30C",
                              },
                            }}
                          >
                            {i18n.language == "en" ? item.name : item.nameJP}
                          </Button>
                        );
                      }
                    })}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      paddingTop: "10px",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {isIncome ? (
                      <Button
                        onClick={() => {
                          setCateSelect(null);
                          setIsIncome(false);
                        }}
                        sx={{
                          backgroundColor: "#9AC30C",
                          color: "black",
                          width: "70%",
                          "&:hover": {
                            backgroundColor: "#9AC30C",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Income
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setUp(true);
                          setExFocus(-1);
                          setIsIncome(true);
                          setCateSelect(income);
                        }}
                        sx={{
                          backgroundColor: "#D7D6D6",
                          color: "black",
                          width: "70%",
                          "&:hover": {
                            backgroundColor: "#9AC30C",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Income
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setOpenCustom(true);
                      }}
                      sx={{
                        backgroundColor: "#D7D6D6",
                        color: "black",
                        width: "70%",
                        marginTop: "10px",
                        "&:hover": {
                          backgroundColor: "#9AC30C",
                        },
                        fontWeight: "bold",
                      }}
                    >
                      Customize
                    </Button>
                  </Box>
                </Box>
              )}

              {up ? (
                <Box
                  className="keyboard"
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: {
                      xs: "75%",
                      sm: '"70%"',
                    },
                    backgroundColor: "#ecebeb",
                  }}
                >
                  <Box
                    sx={{
                      height: "5%",
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "white",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      onClick={handleDown}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        height: "130%",
                        backgroundColor: "white",
                        transform: "translate(-50%, 0)",
                        width: "30%",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ArrowDropDown></ArrowDropDown>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "15%",
                      backgroundColor: "#c7c6c6",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "right",
                        paddingRight: "10px",
                        fontSize: 40,
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {money.split("")[money.length - 1] == "."
                        ? new Intl.NumberFormat("de-DE").format(Number(money)) +
                          ","
                        : new Intl.NumberFormat("de-DE").format(Number(money))}
                      <Button
                        sx={{
                          color: "black",
                          height: "100%",
                          padding: 0,
                          margin: 0,
                        }}
                        onClick={() => {
                          setMoney("0");
                        }}
                      >
                        <HighlightOff sx={{ fontSize: "35px" }}></HighlightOff>
                      </Button>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",
                      border: "1px solid black",
                      display: "grid",
                    }}
                  >
                    <Box
                      className="grid-item"
                      sx={{ gridRow: "1", gridColumn: "4" }}
                    >
                      <Button
                        onClick={() => {
                          setOpenDetailModal(true);
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <NoteAdd sx={{ fontSize: "40px" }} />
                      </Button>
                    </Box>
                    {listNumber.map((item, index) => {
                      return (
                        <Box className="grid-item">
                          <Button
                            onClick={() => {
                              if (money.length < 8) {
                                if (Number(money) == 0) {
                                  setMoney(`${item}`);
                                } else {
                                  setMoney(money + `${item}`);
                                }
                              }
                            }}
                            sx={{
                              fontSize: "40px",
                              width: "100%",
                              height: "100%",
                              fontWeight: "bold",
                            }}
                          >
                            {item}
                          </Button>
                        </Box>
                      );
                    })}
                    <Box className="grid-item">
                      <Button
                        onClick={() => {
                          if (money.length < 8 && Number(money) != 0) {
                            if (money.length == 7) {
                              setMoney(money + "0");
                            } else {
                              setMoney(money + "00");
                            }
                          }
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        00
                      </Button>
                    </Box>
                    <Box className="grid-item">
                      <Button
                        onClick={() => {
                          if (money.length < 8 && Number(money) != 0) {
                            setMoney(money + "0");
                          }
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        0
                      </Button>
                    </Box>
                    <Box className="grid-item">
                      <Button
                        onClick={() => {
                          if (!money.includes(".") && money.length != 7) {
                            setMoney(money + ".");
                          }
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        .
                      </Button>
                    </Box>
                    <Box
                      className="grid-item-input"
                      sx={{
                        gridRow: "2 / span 3",
                        gridColumn: "4",
                        backgroundColor: "red",
                        position: "relative",
                      }}
                    >
                      {loading ? (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress sx={{ color: "white" }} />
                        </Box>
                      ) : (
                        <Button
                          onClick={handleQuickCreate}
                          sx={{
                            fontSize: "20px",
                            width: "100%",
                            height: "100%",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          input
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  className="keyboard"
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ddd",
                  }}
                >
                  <Box
                    sx={{
                      height: "30%",
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "white",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      onClick={handleUp}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        height: "130%",
                        backgroundColor: "white",
                        transform: "translate(-50%, 0)",
                        width: "30%",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ArrowDropUp></ArrowDropUp>
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
