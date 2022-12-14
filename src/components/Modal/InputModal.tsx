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
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import PieChartIcon from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useHistory } from "react-router";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuNav from "components/MenuNav/Menu";
import NumberFormatCustom from "components/NumberInputCustom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CategoryContext from "utils/CategoryContext";
import ClearIcon from "@mui/icons-material/Clear";
export default function InputModal(props) {
  const [price, setPrice] = useState<Number>();
  const history = useHistory();
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const listNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [up, setUp] = useState(true);
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
  const { listCategories, paymentMethodDefault, shopNameDefault } =
    useContext(CategoryContext);
  const [listAll, setListAll] = useState<any>([]);
  const [st, setSt] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  // const [h, setH] = useState(0);
  // const [h1, setH1] = useState(0);
  console.log(shopNameDefault[0]);
  // const h =  ((((window.innerHeight/10)*9-40-16)/10)*4.4 -8)/4
  // const h1 =  ((800-40-16)*4/10 -8 - 10)/5
  // console.log(h);
  // console.log(window.innerHeight);
  function getWindowDimensions() {
    if ((window.innerHeight * 9) / 10 > 800) {
      const h = (((800 - 40 - 16) * 4) / 10 - 8 - 10) / 5;
      let h1;
      if (window.innerHeight <= 800) {
        h1 = (((window.innerHeight - 40 - 16) * 4) / 10 - 8 - 10) / 5;
      } else {
        h1 = (((800 - 40 - 16) * 4) / 10 - 8 - 10) / 5;
      }
      return {
        h,
        h1,
      };
    } else {
      const h =
        ((((window.innerHeight / 10) * 9 - 40 - 16) / 10) * 4.4 - 8) / 4;
      let h1;
      if (window.innerHeight <= 800) {
        h1 = (((window.innerHeight - 40 - 16) * 4) / 10 - 8 - 10) / 5;
      } else {
        h1 = (((800 - 40 - 16) * 4) / 10 - 8 - 10) / 5;
      }
      return {
        h,
        h1,
      };
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect(() => {
  //   if(window.innerHeight*9/10>800){
  //     setH(((800-40-16)*4/10 -8 - 10)/5)
  //     setH1(((800-40-16)*4/10 -8 - 10)/5)
  //   }
  //   else{
  //     setH(((((window.innerHeight/10)*9-40-16)/10)*4.4 -8)/4)
  //     setH1(((800-40-16)*4/10 -8 - 10)/5)
  //   }
  // },[])

  const handleChangePrice = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMoney(parseInt(e.target.value).toString());
    }
  };

  const handleUp = () => {
    setUp(true);
  };
  const handleDown = () => {
    setUp(false);
  };

  const handleQuickCreate = async () => {
    setLoading(true);

    try {
      if (cateSelect) {
        console.log(cateSelect.id);
        const res: any = await createTransaction(
          cateSelect.id,
          moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          Number(money),
          "",
          window.navigator.userAgent,
          "",
          1,
          "0",
          paymentMethodDefault[0]?.id,
          shopNameDefault[0]?.id
        );
        setLoading(false);
        props.setOpen(false);
        reloadPage[1](!reloadPage[0]);
      } else {
        const res: any = await createTransaction(
          df.id,
          moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          Number(money),
          "",
          window.navigator.userAgent,
          "",
          1,
          "0",
          paymentMethodDefault[0]?.id,
          shopNameDefault[0]?.id
        );
        setLoading(false);
        props.setOpen(false);
        reloadPage[1](!reloadPage[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getCate = async () => {
    setLoadCate(true);
    // const res: any = await getCategory();
    console.log(listCategories[0]);

    const listEx = listCategories[0].filter(
      (item: any) => item.income_flag == "0" && item.count != "1000"
    );
    setListExpense(listEx);
    setListIncome(
      listCategories[0].filter((item: any) => item.income_flag != "0")
    );
    setDefault(listCategories[0].find((item: any) => item.count == "1000"));

    setIncome(listCategories[0].find((item: any) => item.name == "Income"));
    const list = [...listCategories[0]];
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
          sx: {
            boxShadow: "none",
          },
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
              bgcolor: "#f0f0f0",
              // border: '2px solid #000',
              boxShadow: 0,
              maxHeight: "800px",
              //   borderRadius: 2,
              maxWidth: "512px",
              overflow: "hidden",
              px: "16px",
              pt: "40px",
              pb: "16px",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                paddingRight: "8px",
                position: "absolute",
                top: -5,
                right: 0,
              }}
            >
              <IconButton
                sx={{ paddingRight: 0 }}
                onClick={() => props.setOpen(false)}
              >
                <ClearIcon
                  sx={{
                    fontSize: {
                      xs: 30,
                      md: 30,
                    },
                    color: "white",
                    zIndex: "100006",
                  }}
                ></ClearIcon>
              </IconButton>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                backgroundColor: "#f0f0f0",
              }}
            >
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
                  className="scrollbar"
                  sx={{
                    height: "90%",
                    overflow: "scroll",
                    paddingBottom: "30px",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gridGap: "2px",
                      padding: "8px",
                    }}
                  >
                    {listExpense?.map((item: any, index) => {
                      if (index == exFocus) {
                        return (
                          <Button
                            className="btn"
                            onClick={() => {
                              setExFocus(-1);
                              setUp(false);
                              setCateSelect(null);
                            }}
                            sx={{
                              backgroundColor: "#9AC30C",
                              color: "black",
                              height: {
                                xs: windowDimensions.h + "px",
                                md: windowDimensions.h1 + "px",
                              },
                              wordBreak: "break-word",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#9AC30C",
                              },
                              borderRadius: "3px",
                              width: "100%",
                            }}
                          >
                            {i18n.language == "en"
                              ? item.name.length > 10
                                ? `${item.name.slice(0, 10)}...`
                                : item.name
                              : item.nameJP.length > 10
                              ? `${item.nameJP.slice(0, 10)}...`
                              : item.nameJP}
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            className="btn"
                            onClick={() => {
                              setIsIncome(false);
                              setExFocus(index);
                              setUp(true);
                              setCateSelect(listExpense[index]);
                            }}
                            sx={{
                              backgroundColor: "#D7D6D6",
                              color: "black",
                              height: {
                                xs: windowDimensions.h + "px",
                                md: windowDimensions.h1 + "px",
                              },
                              wordBreak: "break-word",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#D7D6D6",
                              },
                              borderRadius: "2px",
                              width: "100%",
                            }}
                          >
                            {i18n.language == "en"
                              ? item.name.length > 10
                                ? `${item.name.slice(0, 10)}...`
                                : item.name
                              : item.nameJP.length > 10
                              ? `${item.nameJP.slice(0, 10)}...`
                              : item.nameJP}
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
                        {t("quickInput.income")}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          console.log(income);

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
                            backgroundColor: "#D7D6D6",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        {t("quickInput.income")}
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
                      {t("quickInput.customize")}
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
                      xs: "60%",
                      sm: "60%",
                    },
                    backgroundColor: "#ecebeb",
                  }}
                >
                  <Box
                    sx={{
                      height: "5%",
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
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
                        backgroundColor: "#f0f0f0",
                        transform: "translate(-50%, 0)",
                        width: "30%",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                        },
                        zIndex: 100005,
                      }}
                    >
                      <ArrowDropDown sx={{ fontSize: 35 }}></ArrowDropDown>
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
                      minHeight: "50px",
                    }}
                  >
                    <Box sx={{ width: "100%", px: "10px" }}>
                      <TextField
                        id="price"
                        value={Number(money)}
                        className="nop"
                        // inputProps={{ maxLength: 10 }}
                        sx={{
                          width: "100%",
                          backgroundColor: "transparent",
                          border: "0px solid black",
                          "& .MuiOutlinedInput-root": {
                            // - The Input-root, inside the TextField-root
                            "& fieldset": {
                              // - The <fieldset> inside the Input-root
                              border: "0 solid black", // - Set the Input border
                            },
                            "&:hover fieldset": {
                              border: "0 solid black", // / - Set the Input border when parent has :hover
                            },
                            "&.Mui-focused fieldset": {
                              // - Set the Input border when parent is focused
                              border: "0 solid black", //
                            },
                          },
                        }}
                        onChange={handleChangePrice}
                        inputProps={{
                          min: 0,
                          maxLength: 10,
                          style: {
                            textAlign: "right",
                            fontSize: 30,
                            fontWeight: "bold",
                            paddingRight: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => {
                                  setMoney("0");
                                }}
                              >
                                <CancelIcon
                                  sx={{ fontSize: "25px", color: "#787777" }}
                                ></CancelIcon>
                              </IconButton>
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",
                      borderTop: "1px solid #cbc9ca",
                      borderLeft: "1px solid #cbc9ca",
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
                          // width: "100%",
                          height: "100%",
                          maxWidth: "25%",
                        }}
                      >
                        <NoteAdd sx={{ fontSize: "40px", color: "#729f03" }} />
                      </Button>
                    </Box>
                    {listNumber.map((item, index) => {
                      return (
                        <Box className="grid-item">
                          <Button
                            onClick={() => {
                              console.log(money);

                              if (money.length < 8) {
                                if (money.includes(".")) {
                                  console.log("asdasdsad");

                                  setMoney(money + `${item}`);
                                } else if (
                                  Number(money) == 0 ||
                                  isNaN(Number(money))
                                ) {
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
                              lineHeight: "normal",
                              color: "#729f03",
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
                          if (isNaN(Number(money))) {
                            setMoney("0");
                          } else if (money.length < 8 && Number(money) != 0) {
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
                          lineHeight: "normal",
                          color: "#729f03",
                        }}
                      >
                        00
                      </Button>
                    </Box>
                    <Box className="grid-item">
                      <Button
                        onClick={() => {
                          if (isNaN(Number(money))) {
                            setMoney("0");
                          } else if (money.length < 8 && Number(money) != 0) {
                            setMoney(money + "0");
                          }
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                          lineHeight: "normal",
                          color: "#729f03",
                        }}
                      >
                        0
                      </Button>
                    </Box>
                    <Box className="grid-item">
                      <Button
                        onClick={() => {
                          if (isNaN(Number(money))) {
                            setMoney("0.");
                          } else if (
                            !money.includes(".") &&
                            money.length != 7
                          ) {
                            setMoney(money + ".");
                          }
                        }}
                        sx={{
                          fontSize: "40px",
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                          lineHeight: "normal",
                          color: "#729f03",
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
                        backgroundColor: "#729f03",
                        position: "relative",
                        "&:hover": {
                          backgroundColor: "#9ac30c",
                        },
                      }}
                    >
                      {loading ? (
                        <Box
                          sx={{
                            display: "flex",
                            width: "55px",
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
                            width: "55px",
                            height: "100%",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "normal",
                          }}
                        >
                          {t("quickInput.input")}
                        </Button>
                      )}
                    </Box>
                  </Box>
                  {/* <Box
                    sx={{
                      height: "15%",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#a3a2a2",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        history.push("/transactions");
                        props.setOpen(false);
                      }}
                    >
                      <Box sx={{ textAlign: "center", px: "10px" }}>
                        <FormatListNumberedRtlIcon
                          sx={{ color: "white", fontSize: 30, margin: 0 }}
                        ></FormatListNumberedRtlIcon>

                        <Typography
                          sx={{
                            fontSize: 10,
                            color: "white",
                            lineHeight: "normal",
                            margin: 0,
                          }}
                        >
                          {t("nav.list")}
                        </Typography>
                      </Box>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        history.push("/graph");
                        props.setOpen(false);
                      }}
                    >
                      <Box sx={{ textAlign: "center", px: "10px" }}>
                        <PieChartIcon
                          sx={{ color: "white", fontSize: 30, margin: 0 }}
                        ></PieChartIcon>

                        <Typography
                          sx={{
                            fontSize: 10,
                            color: "white",
                            lineHeight: "normal",
                            margin: 0,
                          }}
                        >
                          {t("nav.graph")}
                        </Typography>
                      </Box>
                    </IconButton>

                    <Box sx={{ textAlign: "center", px: "10px" }}>
                      <MenuNav
                        inputModal={true}
                        handleOpenCurrency={handleOpenCurrency}
                      />
                    </Box>
                  </Box> */}
                </Box>
              ) : (
                <Box
                  className="keyboard"
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "10%",
                    backgroundColor: "#ddd",
                  }}
                >
                  <Box
                    sx={{
                      height: "20%",
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      onClick={handleUp}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        height: "150%",
                        backgroundColor: "#f0f0f0",
                        transform: "translate(-50%, 0)",
                        width: "30%",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                        },
                        zIndex: 10005,
                      }}
                    >
                      <ArrowDropUp sx={{ fontSize: 35 }}></ArrowDropUp>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "#c7c6c6",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "100%", px: "10px" }}>
                      <TextField
                        onClick={() => {
                          setUp(true);
                        }}
                        id="price"
                        value={Number(money)}
                        className="nop"
                        // inputProps={{ maxLength: 10 }}
                        sx={{
                          width: "100%",
                          backgroundColor: "transparent",
                          border: "0px solid black",
                          "& .MuiOutlinedInput-root": {
                            // - The Input-root, inside the TextField-root
                            "& fieldset": {
                              // - The <fieldset> inside the Input-root
                              border: "0 solid black", // - Set the Input border
                            },
                            "&:hover fieldset": {
                              border: "0 solid black", // / - Set the Input border when parent has :hover
                            },
                            "&.Mui-focused fieldset": {
                              // - Set the Input border when parent is focused
                              border: "0 solid black", //
                            },
                          },
                        }}
                        onChange={handleChangePrice}
                        inputProps={{
                          min: 0,
                          maxLength: 10,
                          style: {
                            textAlign: "right",
                            fontSize: 30,
                            fontWeight: "bold",
                            paddingRight: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => {
                                  setMoney("0");
                                }}
                              >
                                <CancelIcon
                                  sx={{ fontSize: "25px", color: "#787777" }}
                                ></CancelIcon>
                              </IconButton>
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Box>
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
