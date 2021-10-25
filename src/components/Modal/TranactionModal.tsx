import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getCategory } from "api/category";
import { createTransaction, uploadImage } from "api/transaction";
import NumberFormatCustom from "components/NumberInputCustom";
import jaLocale from "date-fns/locale/ja";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import DateSelectContext from "utils/context";
import { checkSize, resizeFile } from "utils/UploadFile";
import "./style.scss";

export default function TranactionModal() {
  return <Box sx={{ zIndex: 1000 }}></Box>;
}
