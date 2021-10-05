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
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import logo from '../../../assets/images/logo_en.png';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TranactionModal from '../Modal/TranactionModal';
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
    padding: theme.spacing(2),
    // background: 'red',
  },
}));
export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };
  const handleOpen = () => {
    console.log('open');
    setOpen(true);
  };
  console.log({ theme });
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
                  <Button className={classes.btnNav} variant="text">
                    Summary
                  </Button>
                  <Button className={classes.btnNav} variant="text">
                    List
                  </Button>
                  <Button className={classes.btnNav} variant="text">
                    Graph
                  </Button>
                  <Button className={classes.btnNav} variant="text">
                    Support/Blog
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    marginRight: '2rem',
                  }}
                >
                  <Box>
                    <IconButton
                      className={classes.menuButton}
                      edge="start"
                      aria-label="menu"
                      onClick={() => {}}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      className={classes.menuButton}
                      edge="start"
                      aria-label="menu"
                      onClick={handleOpen}
                    >
                      <BuildIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.boxNavMobile}>
              <IconButton
                className={classes.menuButton}
                edge="start"
                aria-label="menu"
                onClick={() => {}}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <TranactionModal open={open} onClose={handleClose} />
    </BrowserRouter>
  );
}
