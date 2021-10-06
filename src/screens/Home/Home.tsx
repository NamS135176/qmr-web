import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import Nav from './Nav/Nav';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { makeStyles, useTheme } from '@mui/styles';
const useStyles = makeStyles((theme: any) => ({
  buttonDate: {
    background: 'white',
    color: 'black',
    '&:hover': {
      background: 'white',
      color: 'black',
    },
  },
  textDate: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
}));
export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Box>
          <Button className={classes.buttonDate} variant="contained">
            <KeyboardArrowLeftIcon />
          </Button>
        </Box>
        <Box className={classes.textDate}>
          <Typography>2021-10-05 ~ 2021-10-06</Typography>
          <IconButton
          // className={classes.menuButton}
          // edge="start"
          // aria-label="menu"
          // onClick={handleOpen}
          >
            <DateRangeIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <Box>
          <Button className={classes.buttonDate} variant="contained">
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
