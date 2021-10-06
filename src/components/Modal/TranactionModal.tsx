import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dropzone from 'react-dropzone';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  dropzone: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'dashed',
    background: '#d6d6d6',
    color: '#bdbdbd',
    marginBottom: 5,
  },
}));
export default function TranactionModal({ open, onClose }: any) {
  const [value, setValue] = useState<Date | null>(new Date());
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [memo, setMemo] = useState('');
  const [fileNames, setFileNames] = useState('');
  const classes = useStyles();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleChangePrice = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };
  const handleChangeMemo = (e: any) => {
    console.log(e.target.value);
    setMemo(e.target.value);
  };

  const handleChangeImage = (e: any) => {
    console.log(e.target.file);
  };

  const handleDrop = (acceptedFiles: any) => {
    console.log({ acceptedFiles });
    setFileNames(acceptedFiles[0].name);
  };

  return (
    <Box>
      <Dialog fullWidth={true} open={open} onClose={onClose}>
        <Box sx={{}}>
          <DialogTitle sx={{ background: '#78CD51', color: 'white' }}>
            Quick Input Panel
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Date</DialogContentText> */}
            <Box sx={{ marginTop: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="categoryId"
                  value={category}
                  label="category"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <TextField
                label="Price"
                id="price"
                type="number"
                sx={{ width: '100%' }}
                onChange={handleChangePrice}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">đ</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <TextField
                error={memo.length >= 2000}
                sx={{ width: '100%' }}
                label="Memo"
                onChange={handleChangeMemo}
                multiline
                id="memo"
                variant="outlined"
                rows={2}
                helperText="(Only limit 2000 characters)"
              />
            </Box>
            <Box>
              <Dropzone onDrop={handleDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({
                      className: classes.dropzone,
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>Drag'n'drop files, or click to select files</p>
                  </div>
                )}
              </Dropzone>
              <Box>
                <strong>Files: &nbsp;</strong>
                <span>{fileNames}</span>
                <Typography>(Image size must 2mb or below)</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                sx={{ background: '#78CD51', color: 'white' }}
                onClick={onClose}
              >
                Save
              </Button>
              <Button
                sx={{
                  background: '#D6D9E0',
                  color: 'black',
                  marginLeft: 2,
                }}
                onClick={onClose}
              >
                Reset
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
}
