import BuildIcon from '@mui/icons-material/Build';
import { Menu, Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

export default function MenuNav({ openMenu, onClose }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BuildIcon sx={{ color: 'white', fontSize: 25 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open || openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {}}>
          <SettingsIcon />
          <Typography> &nbsp;Language Setting</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            i18n.changeLanguage('jp');
          }}
        >
          <Box sx={{ width: '1em', height: '1em', fontSize: '1.5rem' }}></Box>
          <Typography> &nbsp;Japanese</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            i18n.changeLanguage('en');
          }}
        >
          <Box sx={{ width: '1em', height: '1em', fontSize: '1.5rem' }}></Box>
          <Typography> &nbsp;English</Typography>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <AttachMoneyIcon />
          <Typography> &nbsp;Curency Setting</Typography>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <LogoutIcon />
          <Typography> &nbsp;Log out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
