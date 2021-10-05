import React, { useState } from 'react';
import {
  Box,
  useMediaQuery,
  CardMedia,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Fade,
  Drawer,
  MenuItem,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import logo from '../../../assets/images/logo_en.png';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TranactionModal from '../../../components/Modal/TranactionModal';
import { useHistory } from 'react-router-dom';
import MenuNav from '../../../components/MenuNav/Menu';
const useStyles = makeStyles((theme: any) => ({
  root: {
    background: '#78CD51',
    // border: 0,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    // height: 48,
    // padding: '0 30px',
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      padding: 0,
      height: 65,
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      height: 10,
      justifyContent: 'space-between',
      padding: 0,
      minHeight: 50,
    },
  },
  btnNav: {
    padding: theme.spacing(2),
    color: 'white',
    margin: theme.spacing(1),
  },
  boxNavPc: {
    [theme.breakpoints.up('md')]: {
      display: 'block',
      flexGrow: 1,
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  boxNavMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      display: 'block',
      padding: 5,
    },
  },
  menuButton: {
    color: 'white',
    margin: theme.spacing(2),
    // background: 'orange',
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  let history = useHistory();
  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };
  const handleOpen = () => {
    console.log('open');
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
      <Box sx={{ width: '300px', background: 'red' }}>
        <Drawer anchor="right" onClose={onCloseDrawer} open={checked}>
          <AppBar title="Menu" />
          <MenuItem
            sx={{ backgroundColor: '#78CD51', px: 5 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Typography sx={{ color: 'white' }}>Summary</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: '#78CD51', px: 5 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Typography sx={{ color: 'white' }}>List</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: '#78CD51', px: 5 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Typography sx={{ color: 'white' }}>Graph</Typography>
          </MenuItem>
          <MenuItem
            sx={{ backgroundColor: '#78CD51', px: 5 }}
            onClick={() => {
              toggleDrawer();
              window.open(`http://smart-idea-apps.com/qmr/pc_support`);
            }}
          >
            <Typography sx={{ color: 'white' }}>Support/Blog</Typography>
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: '#78CD51',
              px: 5,
              // backgroundColor: 'red',
              width: '100%',
            }}
            onClick={() => {
              toggleDrawer();
              handleOpen();
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  fontSize: 35,
                  color: 'white',
                }}
              />
            </Box>
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: '#78CD51',
              px: 5,
            }}
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <Box sx={{ width: '100%' }}>
              <MenuNav openMenu={openMenu} onClose={onCloseMenu} />
            </Box>
          </MenuItem>
        </Drawer>
      </Box>
    );
  };

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <img src={logo} height="100%" />
            <Box className={classes.boxNavPc}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Button
                    onClick={() => {
                      history.push('/home');
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    Summary
                  </Button>
                  <Button
                    onClick={() => {
                      history.push('/list');
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    List
                  </Button>
                  <Button
                    onClick={() => {
                      history.push('/graph');
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    Graph
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(`http://smart-idea-apps.com/qmr/pc_support`);
                    }}
                    className={classes.btnNav}
                    variant="text"
                  >
                    Support/Blog
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    marginRight: '2rem',
                    alignItems: 'center',
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
    </BrowserRouter>
  );
}