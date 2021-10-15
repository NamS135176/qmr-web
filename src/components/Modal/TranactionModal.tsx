import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import jaLocale from "date-fns/locale/ja";
import moment from "moment";
import "./style.scss";
import { getCategory } from "api/category";
import { createTransaction, uploadImage } from "api/transaction";
import DateSelectContext from "utils/context";
import { checkSize, resizeFile } from "utils/UploadFile";

export default function TranactionModal({ open, onClose }: any) {
  const [value, setValue] = useState<any>(new Date());
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [price, setPrice] = useState<Number>();
  const [memo, setMemo] = useState("");
  const [fileNames, setFileNames] = useState("");
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);

  const { dateFrom, dateTo, reloadPage } = useContext(DateSelectContext);

  const handleChange = (newValue: Date | null) => {
    console.log({ newValue });
    const date = moment(newValue).format("YYYY-MM-DD HH:mm:ss");

    setValue(newValue);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    console.log("change");
    setCategory(event.target.value as string);
  };

  const handleChangePrice = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(parseInt(e.target.value));
    }
  };
  const handleChangeMemo = (e: any) => {
    console.log(e.target.value);
    setMemo(e.target.value);
  };

  const handleChangeImage = (e: any) => {
    console.log(e.target.file);
  };

  const handleDrop = async (acceptedFiles: any) => {
    const newImg: any = await resizeFile(acceptedFiles[0]);
    if (checkSize(newImg)) {
      setFile(newImg);
      setFileNames(acceptedFiles[0].name);
    } else {
      window.alert("File size over 2MB");
    }
  };
  const getCategoryData = async () => {
    const response = await getCategory();
    console.log({ response });
    setListCategory(response.categories);
  };

  const handleCreateTransaction = async () => {
    if (category && value && price) {
      if (!file) {
        const res = await createTransaction(
          category,
          value,
          price,
          memo,
          window.navigator.userAgent
        );
        setPrice(0);
        setMemo("");
        setCategory("");
        // window.location.reload();
        reloadPage[1](!reloadPage[0]);
        console.log({ reloadPage });

        console.log({ res });
      } else {
        const resImg = await uploadImage(file);
        const res = await createTransaction(
          category,
          value,
          price,
          memo,
          window.navigator.userAgent,
          resImg.photo_url
        );
        setPrice(0);
        setMemo("");
        setCategory("");
        // window.location.reload();
        reloadPage[1](!reloadPage[0]);
        console.log({ reloadPage });

        console.log({ res });
      }
    }
    onClose();
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Box>
      <Dialog fullWidth={true} open={open} onClose={onClose}>
        <Box sx={{}}>
          <DialogTitle sx={{ background: "#78CD51", color: "white" }}>
            {t("transaction.title")}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ marginTop: 3 }}>
              {t("transaction.date") === "Date & Time" ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Date&Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              ) : (
                <LocalizationProvider
                  locale={jaLocale}
                  dateAdapter={AdapterDateFns}
                >
                  <DateTimePicker
                    label="日にち & 時間"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="category">
                  {" "}
                  {t("transaction.category")}
                </InputLabel>
                <Select
                  labelId="category"
                  id="categoryId"
                  value={category}
                  label="category"
                  onChange={handleChangeCategory}
                >
                  {listCategory.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <TextField
                label={t("editmodal.price")}
                id="price"
                type="number"
                sx={{ width: "100%" }}
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
                sx={{ width: "100%" }}
                label={t("editmodal.memo")}
                onChange={handleChangeMemo}
                multiline
                id="memo"
                variant="outlined"
                rows={2}
                helperText={t("editmodal.warning")}
              />
            </Box>
            <Box>
              <Dropzone accept="image/*" onDrop={handleDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag'n'drop files, or click to select files</p>
                  </div>
                )}
              </Dropzone>
              <Box>
                <strong>Files: &nbsp;</strong>
                <span>{fileNames}</span>
                <Typography> {t("transaction.limit_size")}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  background: "#78CD51",
                  color: "white",
                  "&:hover": {
                    background: "#78CD51",
                    color: "white",
                  },
                }}
                onClick={handleCreateTransaction}
              >
                {t("transaction.save")}
              </Button>
              <Button
                sx={{
                  background: "#D6D9E0",
                  color: "black",
                  marginLeft: 2,
                  "&:hover": {
                    background: "#D6D9E0",
                    color: "black",
                  },
                }}
                onClick={onClose}
              >
                {t("transaction.reset")}
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
}
