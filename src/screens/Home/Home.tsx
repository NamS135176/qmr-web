import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import Nav from './Nav/Nav';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DateHomeModal from '../../components/Modal/DateHomeModal';

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };
  const handleOpen = () => {
    console.log('open');
    setOpen(true);
  };
  return (
    <Box>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Box>
          <Button
            sx={{
              background: 'white',
              color: 'black',
              '&:hover': {
                background: 'white',
                color: 'black',
              },
            }}
            variant="contained"
          >
            <KeyboardArrowLeftIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography>2021-10-05 ~ 2021-10-06</Typography>
          <IconButton
            // className={classes.menuButton}
            // edge="start"
            // aria-label="menu"
            onClick={handleOpen}
          >
            <DateRangeIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <Box>
          <Button
            sx={{
              background: 'white',
              color: 'black',
              '&:hover': {
                background: 'white',
                color: 'black',
              },
            }}
            variant="contained"
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
      <DateHomeModal open={open} onClose={handleClose} />
    </Box>
  );
}
