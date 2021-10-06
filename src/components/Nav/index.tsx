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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./style.scss";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { t, i18n } = useTranslation();
  let history = useHistory();
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
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

  const MyDrawer = () => {
    return (
      <Box sx={{ width: "300px", background: "red" }}>
        <Drawer anchor="right" onClose={onCloseDrawer} open={checked}>
          <AppBar title="Menu" />
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.summary")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Typography sx={{ color: "white" }}> {t("nav.list")}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: "#78CD51", px: 5 }}
            onClick={() => {
              toggleDrawer();
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
              <MenuNav openMenu={openMenu} onClose={onCloseMenu} />
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
            <Box className="boxNavPc">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Button
                    onClick={() => {
                      history.push("/");
                    }}
                    className="btnNav"
                    variant="text"
                  >
                    {t("nav.summary")}
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/transactions");
                    }}
                    className="btnNav"
                    variant="text"
                  >
                    {t("nav.list")}
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/graph");
                    }}
                    className="btnNav"
                    variant="text"
                  >
                    {t("nav.graph")}
                  </Button>
                  <Button
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
                  <Box>
                    <IconButton onClick={handleOpen}>
                      <AddCircleOutlineIcon
                        className="menuButton"
                        sx={{ fontSize: 25 }}
                      />
                    </IconButton>
                  </Box>
                  <Box>
                    <MenuNav />
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
      <TranactionModal open={open} onClose={handleClose} />
    </Box>
  );
}
