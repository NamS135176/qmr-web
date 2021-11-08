import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuNav from "components/MenuNav/Menu";
import CurrencyModal from "components/Modal/CurrencyModal";
import InputModal from "components/Modal/InputModal";
// import TranactionModal from "components/Modal/TranactionModal";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import "./style.scss";

export default function Nav(props) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [openCurrency, setOpenCurrency] = useState(false);
  const [changeRoute, setChangeRoute] = useState("/");
  let history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };
  const handleOpenCurrency = () => {
    setOpenCurrency(true);
  };
  const onCloseCurrency = () => {
    setOpenCurrency(false);
  };
  const toggleDrawer = () => {
    setChecked(!checked);
  };
  const onCloseDrawer = () => {
    setChecked(false);
  };

  const onCloseMenu = () => {
    setChecked(false);
  };

  useEffect(() => {}, [changeRoute]);
  const MyDrawer = () => {
    return (
      <Box sx={{ width: "300px", background: "red" }}>
        <Drawer anchor="right" onClose={onCloseDrawer} open={checked}>
          <AppBar title="Menu" />
          <ListItem
            key="1"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              toggleDrawer();
              history.push("/");
              setChangeRoute("/");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.summary")}</Typography>
          </ListItem>
          <ListItem
            key="2"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              toggleDrawer();
              history.push("/transactions");

              setChangeRoute("/transactions");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.list")}</Typography>
          </ListItem>
          <ListItem
            key="3"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              toggleDrawer();
              history.push("/graph");
              setChangeRoute("/graph");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.graph")}</Typography>
          </ListItem>
          <ListItem
            key="4"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              toggleDrawer();
              window.open(`http://smart-idea-apps.com/qmr/pc_support`);
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.support")}</Typography>
          </ListItem>
          <ListItem
            key="5"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              // backgroundColor: 'red',
              width: "100%",
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              toggleDrawer();
              handleOpen();
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  fontSize: 35,
                  color: "white",
                }}
              />
            </Box>
          </ListItem>
          <ListItem
            key="6"
            button
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              ":hover": {
                backgroundColor: "#00B050",
              },
            }}
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <Box sx={{ width: "100%" }}>
              <MenuNav
                handleOpenCurrency={handleOpenCurrency}
                openMenu={openMenu}
                onClose={onCloseMenu}
              />
            </Box>
          </ListItem>
        </Drawer>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{ background: "#78CD51", color: "white" }}
          position="static"
        >
          <Toolbar className="toolbar">
            {t("logo") === "jp" ? (
              <img
                className="image"
                src={"/assets/images/logo_jp.png"}
                height="100%"
                alt="logo"
              />
            ) : (
              <img
                className="image"
                src={"/assets/images/logo_en.png"}
                height="100%"
                alt="logo"
              />
            )}
            <Box sx={{ height: "100%" }} className="boxNavPc">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box sx={{ height: "100%" }}>
                  <Box sx={{ display: "inline-block" }}>
                    <NavLink
                      activeStyle={{
                        background: "#398439",
                      }}
                      className="btn"
                      to="/"
                      exact
                    >
                      {t("nav.summary")}
                    </NavLink>
                  </Box>
                  <Box sx={{ display: "inline-block" }}>
                    <NavLink
                      activeStyle={{
                        background: "#398439",
                      }}
                      className="btn"
                      to="/transactions"
                      exact
                    >
                      {t("nav.list")}
                    </NavLink>
                  </Box>
                  <Box sx={{ display: "inline-block" }}>
                    <NavLink
                      activeStyle={{
                        background: "#398439",
                      }}
                      className="btn"
                      to="/graph"
                      exact
                    >
                      {t("nav.graph")}
                    </NavLink>
                  </Box>

                  <Button
                    sx={{
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#00B050",
                      },
                      borderRadius: 0,
                    }}
                    onClick={() => {
                      window.open(`http://smart-idea.jp/qmr/pc_support`);
                    }}
                    className="btnNav"
                    variant="text"
                  >
                    {t("nav.support")}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginRight: "2rem",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "cemter",
                    }}
                  >
                    <IconButton
                      sx={{
                        width: 41,
                        height: 41,
                      }}
                      onClick={handleOpen}
                    >
                      <AddCircleOutlineIcon
                        className="menuButton"
                        sx={{ fontSize: 25 }}
                      />
                    </IconButton>
                  </Box>
                  <Box>
                    <MenuNav handleOpenCurrency={handleOpenCurrency} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="boxNavMobile">
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={() => {
                  setChecked(true);
                }}
              >
                <MenuIcon className="menuButton" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <MyDrawer />
      </Box>
      {open ? <InputModal open={open} setOpen={setOpen}></InputModal> : <></>}
      <CurrencyModal open={openCurrency} onClose={onCloseCurrency} />
    </Box>
  );
}
