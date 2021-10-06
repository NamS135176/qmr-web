import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
const useStyles = makeStyles((theme: any) => ({
  topDialog: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
  },
}));
export default function DateHomeModal({ open, onClose }: any) {
  const classes = useStyles();
  const [valueFrom, setValueFrom] = useState<Date | null>(new Date());
  const [valueTo, setValueTo] = useState<Date | null>(new Date());
  const handleChangeFrom = (newValue: Date | null) => {
    setValueFrom(newValue);
  };
  const handleChangeTo = (newValue: Date | null) => {
    setValueTo(newValue);
  };
  return (
    <Box>
      <Dialog fullWidth={true} open={open} onClose={onClose}>
        <Box className={classes.topDialog}>
          <Button>Cancel</Button>
          <Typography>Set Custom Period</Typography>
        </Box>
        <Divider />
        <Box sx={{ marginTop: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="From"
              value={valueFrom}
              onChange={handleChangeFrom}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="From"
              value={valueTo}
              onChange={handleChangeTo}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Dialog>
    </Box>
  );
}
