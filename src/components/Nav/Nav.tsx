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
import { makeStyles, useTheme } from "@mui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import MenuNav from "components/MenuNav/Menu";
import TranactionModal from "components/Modal/TranactionModal";

const useStyles = makeStyles((theme: any) => ({
  root: {
    background: "#78CD51",
    // border: 0,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: "white",
    // height: 48,
    // padding: '0 30px',
  },
  toolbar: {
    [theme.breakpoints.up("md")]: {
      padding: 0,
      height: 65,
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      height: 10,
      justifyContent: "space-between",
      padding: 0,
      minHeight: 50,
    },
  },
  btnNav: {
    padding: theme.spacing(2),
    color: "white",
    margin: theme.spacing(1),
  },
  boxNavPc: {
    [theme.breakpoints.up("md")]: {
      display: "block",
      flexGrow: 1,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  boxNavMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
      padding: 5,
    },
  },
  menuButton: {
    color: "white",
    margin: theme.spacing(2),
    // background: 'orange',
  },
  img: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
      width: "300px",
    },
    [theme.breakpoints.down("md")]: {
      width: "220px",
    },
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
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
        <AppBar position="static" className={classes.root}>
          <Toolbar className={classes.toolbar}>
            {t("logo") === "jp" ? (
              <img
                src={"assets/images/logo_jp.png"}
                height="100%"
                className={classes.img}
              />
            ) : (
              <img
                src={"assets/images/logo_en.png"}
                height="100%"
                className={classes.img}
              />
            )}
            <Box className={classes.boxNavPc}>
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
                      history.push("/home");
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    {t("nav.summary")}
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/list");
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    {t("nav.list")}
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/graph");
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    {t("nav.graph")}
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(`http://smart-idea-apps.com/qmr/pc_support`);
                    }}
                    className={classes.btnNav}
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
                    <IconButton
                      className={classes.menuButton}
                      // edge="start"
                      // aria-label="menu"
                      onClick={handleOpen}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                  </Box>
                  <Box>
                    <MenuNav />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.boxNavMobile}>
              <IconButton
                className={classes.menuButton}
                edge="start"
                aria-label="menu"
                onClick={() => {
                  setChecked(true);
                }}
              >
                <MenuIcon />
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
