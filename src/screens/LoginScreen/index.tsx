import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  TextField,
  InputBase,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../../assets/images/logo_en.png';
const useStyle = makeStyles((theme: any) => ({
  container: {
    backgroundColor: '#383e4b',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  loginModal: {
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      width: '80%',
      marginTop: 30,
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
    },
    borderRadius: 5,
    marginTop: 100,
    padding: 20,
    minWidth: 250,
    height:520,
   
  },
  text: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    lineHeightStep: 1,
    lineHeight: '1.1',
  },
  textError: {
    fontSize: 13,
    margin: 0,
    padding: 0,
    lineHeightStep: 1,
    lineHeight: '1.1',
    color: 'red',
  },
  inputBase: {
    marginTop: 10,
    background: '#e4e6eb',
    width: '100%',
    padding: theme.spacing(1, 1, 1, 2),
  },
  btn: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  link: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    lineHeightStep: 1,
    lineHeight: '1.1',
    color: 'black',
    '&:hover': {
      color: '#428bca',
    },
  },
}));

export default function LoginScreen() {
  const classes = useStyle();
  const [showError, setShowError] = useState<boolean>(false);
  return (
    <Box className={classes.container}>
      <Box className={classes.loginModal}>
        {showError ? (
          <p className={classes.textError}>
            Email or password is invalid. Please try again.
          </p>
        ) : (
          <p className={classes.textError}></p>
        )}
        <img
          src={logo}
          width="100%"
        />
        <p className={classes.text}>Log in to Quick Money Recorder PC</p>
        <p className={classes.text}>
          (Please input email address and password which has been registered to
          QMR Subscription)
        </p>
        <InputBase
          type="email"
          placeholder="type email"
          className={classes.inputBase}
        ></InputBase>
        <InputBase
          type="password"
          placeholder="password"
          className={classes.inputBase}
        ></InputBase>
        <Box
          sx={{
            borderBottom: 1,
            marginTop: 2,
            paddingBottom: 3,
            borderColor: '#eee',
          }}
        >
          <Button
            onClick={() => {
              setShowError(!showError);
            }}
            variant="contained"
            color="neutral"
            fullWidth
          >
            Login
          </Button>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <p className={classes.text}>
            Quick Money Recorder PC is Beta version. Some function may not work.
          </p>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          <a className={classes.link} href="/forgot_password">
            *If you forgot your password, re-issue new password here
          </a>
        </Box>
      </Box>
    </Box>
  );
}
