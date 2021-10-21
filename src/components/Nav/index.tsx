import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuNav from "components/MenuNav/Menu";
import TranactionModal from "components/Modal/TranactionModal";
import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ButtonNav from "components/ButtonNav";
import "./style.scss";
import CurrencyModal from "components/Modal/CurrencyModal";
import InputModal from "components/Modal/InputModal";
export default function Nav(props) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [openCurrency, setOpenCurrency] = useState(false);
  const [changeRoute, setChangeRoute] = useState("/");
  let history = useHistory();
  console.log("🚀 ~ file: index.tsx ~    line 27 ~ Nav ~ history", history);
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  const handleOpenCurrency = () => {
    console.log("open currencyt", openCurrency);
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
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
              history.push("/");
              setChangeRoute("/");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.summary")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
              history.push("/transactions");

              setChangeRoute("/transactions");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.list")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
              history.push("/graph");
              setChangeRoute("/graph");
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.graph")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
              window.open(`http://smart-idea-apps.com/qmr/pc_support`);
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.support")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
              // backgroundColor: 'red',
              width: "100%",
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
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#78CD51",
              px: 5,
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
          </MenuItem>
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
                src={"assets/images/logo_jp.png"}
                height="100%"
              />
            ) : (
              <img
                className="image"
                src={"assets/images/logo_en.png"}
                height="100%"
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
                  {history.location.pathname === "/" ? (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.summary"
                      link="/"
                      bgColor="#398439"
                    ></ButtonNav>
                  ) : (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.summary"
                      link="/"
                      bgColor="transparent"
                    ></ButtonNav>
                  )}
                  {history.location.pathname === "/transactions" ? (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.list"
                      link="/transactions"
                      bgColor="#398439"
                    ></ButtonNav>
                  ) : (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.list"
                      link="/transactions"
                      bgColor="transparent"
                    ></ButtonNav>
                  )}
                  {history.location.pathname === "/graph" ? (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.graph"
                      link="/graph"
                      bgColor="#398439"
                    ></ButtonNav>
                  ) : (
                    <ButtonNav
                      logger={setChangeRoute}
                      toPage="nav.graph"
                      link="/graph"
                      bgColor="transparent"
                    ></ButtonNav>
                  )}

                  <Button
                    sx={{
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#00B050",
                      },
                      borderRadius: 0,
                    }}
                    onClick={() => {
                      window.open(`http://smart-idea-apps.com/qmr/pc_support`);
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
    </Box>
  );
}
