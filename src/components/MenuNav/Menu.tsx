import BuildIcon from "@mui/icons-material/Build";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Check from "@mui/icons-material/Check";
import CurrencyModal from "components/Modal/CurrencyModal";
import React, { useState } from "react";
import { updateCurrentMember } from "api/member";
import { apiQMRWeb } from "api";

export default function MenuNav({
  handleOpenCurrency,
  openMenu,
  onClose,
  inputModal,
}: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const currency: any = localStorage.getItem("currency");

  const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    // window.localStorage.removeItem('access_token');
    // window.localStorage.removeItem('currency');
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Box sx={{}}>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={inputModal ? { padding: 2, margin: 0, height: 63, width: 66 } : {}}
      >
        {inputModal ? (
          <Box sx={{}}>
            <SettingsIcon
              sx={{ color: "white", fontSize: 30, margin: 0 }}
            ></SettingsIcon>
            <Typography
              sx={{
                fontSize: 10,
                color: "white",
                lineHeight: "normal",
                margin: 0,
              }}
            >
              {t("nav.setting")}
            </Typography>
          </Box>
        ) : (
          <BuildIcon sx={{ color: "white", fontSize: 25 }} />
        )}
      </IconButton>
      <Menu
        // sx={{
        //   background: 'red',
        // }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open || openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem sx={{ minWidth: 250 }} onClick={() => {}}>
          <SettingsIcon />
          <Typography> &nbsp;{t("menunav.setting")}</Typography>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            apiQMRWeb.setHeader("Accept-Language", "jp");
            await updateCurrentMember("jp", JSON.parse(currency)?.id);
            handleClose();
            i18n.changeLanguage("ja");
          }}
        >
          <Box sx={{ width: "1em", height: "1em", fontSize: "1.5rem" }}>
            {i18n.language == "ja" ? <Check /> : <></>}
          </Box>
          <Typography> &nbsp;{t("menunav.jap")}</Typography>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            apiQMRWeb.setHeader("Accept-Language", "en");
            await updateCurrentMember("en", JSON.parse(currency)?.id);
            handleClose();
            i18n.changeLanguage("en");
          }}
        >
          <Box sx={{ width: "1em", height: "1em", fontSize: "1.5rem" }}>
            {i18n.language == "en" ? <Check /> : <></>}
          </Box>
          <Typography> &nbsp;English</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenCurrency();
          }}
        >
          <AttachMoneyIcon />
          <Typography> &nbsp;{t("menunav.currency")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          <Typography> &nbsp;{t("menunav.logout")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
