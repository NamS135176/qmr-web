import React, { useState, useEffect, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";
import NumberFormatCustom from "components/NumberInputCustom";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getCategory } from "api/category";
import IconButton from "@mui/material/IconButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Button from "@mui/material/Button";
import DateSelectContext from "utils/context";
// import Dropzone from "react-dropzone";
import { checkSize, resizeFile } from "utils/UploadFile";
import { uploadImage, createTransaction } from "api/transaction";
import { useDropzone } from "react-dropzone";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryContext from "utils/CategoryContext";
const baseStyle = {};

export default function DetailModal(props) {
  const style: any = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  );
  const [loading, setLoading] = useState(false);
  const { dateFrom, dateTo, reloadPage } = useContext(DateSelectContext);
  const [file, setFile] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");
  const { listCategories } = useContext(CategoryContext);
  const [value, setValue] = useState<any>(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
  const [price, setPrice] = useState<Number>();
  const { t, i18n } = useTranslation();
  const currency: any = localStorage.getItem("currency");
  const [memo, setMemo] = useState("");
  const [fileNames, setFileNames] = useState("");
  const [df, setDefault] = useState<any>(false);
  console.log(
    "item ?",
    listCategories[0].find((item) => item.name === "?")
  );
  const handleDrop = async (acceptedFiles: any) => {
    const newImg: any = await resizeFile(acceptedFiles[0]);

    if (checkSize(newImg)) {
      var reader: any = new FileReader();
      var url = reader.readAsDataURL(newImg);

      reader.onloadend = function (e) {
        setFileNames(reader.result);
      };
      setFile(newImg);
    } else {
      window.alert("File size over 2MB");
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop: handleDrop });

  const handleChangeMemo = (e: any) => {
    console.log(e.target.value);
    setMemo(e.target.value);
  };

  const handleChangePrice = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(parseInt(e.target.value));
    }
  };

  const handleChange = (newValue: Date | null) => {
    const date = moment(newValue).format("YYYY-MM-DD HH:mm:ss");
    console.log(date);

    setValue(date);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    console.log("change");
    setCategory(event.target.value as string);
  };

  const getCategoryData = async () => {
    const response = await getCategory();
    console.log({ response });
    setListCategory(response.categories);
  };

  const handleCreateTransaction = async () => {
    setLoading(true);
    console.log({ file });
    if (value) {
      console.log("handle create", listCategories[0]);
      const itemDefault: any = listCategories[0].find(
        (item: any) => item.count === "1000"
      );
      console.log("id", itemDefault.id);
      if (!file) {
        console.log("not image");
        const res = await createTransaction(
          category ? category : itemDefault?.id,
          value,
          price ? price : 0,
          memo,
          window.navigator.userAgent
        );
        setPrice(0);
        setMemo("");
        setCategory("");
        reloadPage[1](!reloadPage[0]);
        console.log({ reloadPage });

        console.log({ res });
        setLoading(false);
        props.setOpen(false);
        props.closeParent(false);
      } else {
        console.log(" image");

        const resImg = await uploadImage(file);
        console.log(
          "🚀 ~ file: DetailModal.tsx ~ line 130 ~ handleCreateTransaction ~ resImg",
          resImg
        );
        const res = await createTransaction(
          category ? category : itemDefault?.id,
          value,
          price ? price : 0,
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
        setLoading(false);
        props.setOpen(false);
        props.closeParent(false);
      }
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // open='open'
        onClose={() => {
          props.setOpen(false);
        }}
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box
            className="scrollbar"
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              bgcolor: "#f0f0f0",
              // border: '2px solid #000',
              boxShadow: 0,
              maxHeight: "800px",
              //   borderRadius: 2,
              maxWidth: "512px",
              overflow: "scroll",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "flex-end",
              px: "16px",
              pb: "16px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // height: "60%",
                // minHeight: "530px",
                backgroundColor: "#f5f5f5",
                paddingBottom: "30px",
              }}
            >
              <Typography sx={{ textAlign: "center", fontSize: 13, py: "5px" }}>
                {t("detailModal.des")}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 16,
                  py: "5px",
                  backgroundColor: "#565351",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {t("detailModal.title")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "10px",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "30%", pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "right",
                      width: "100%",
                      wordBreak: "break-word",
                    }}
                  >
                    {t("detailModal.amount")}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%", px: "10px" }}>
                  <TextField
                    id="price"
                    value={price}
                    inputProps={{ maxLength: 10 }}
                    sx={{ width: "100%", backgroundColor: "white" }}
                    onChange={handleChangePrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {JSON.parse(currency)?.symbol}
                        </InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "10px",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "30%", pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "right",
                      width: "100%",
                      wordBreak: "break-word",
                    }}
                  >
                    {t("detailModal.date")}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%", px: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: "100%", backgroundColor: "white" }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "10px",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "30%", pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "right",
                      width: "100%",
                      wordBreak: "break-word",
                    }}
                  >
                    {t("detailModal.category")}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%", px: "10px" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="category"
                      id="categoryId"
                      value={category}
                      onChange={handleChangeCategory}
                      sx={{ backgroundColor: "white" }}
                    >
                      {listCategory.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {i18n.language === "en" ? item.name : item.nameJP}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "30%", pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "right",
                      width: "100%",
                      wordBreak: "break-word",
                    }}
                  >
                    {t("detailModal.note")}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%", px: "10px" }}>
                  <Box sx={{ marginTop: 2 }}>
                    <TextField
                      error={memo.length >= 2000}
                      sx={{ width: "100%", backgroundColor: "white" }}
                      onChange={handleChangeMemo}
                      multiline
                      id="memo"
                      variant="outlined"
                      rows={2}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "10px",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "30%", pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "right",
                      width: "100%",
                      wordBreak: "break-word",
                    }}
                  >
                    {t("detailModal.picture")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "70%",
                    px: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <div className="container">
                      <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <IconButton>
                          <AddBoxOutlinedIcon></AddBoxOutlinedIcon>
                        </IconButton>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    {fileNames == "" ? (
                      <></>
                    ) : (
                      <Box sx={{ border: "1px black solid", lineHeight: 0 }}>
                        <img
                          width="50px"
                          height="50px"
                          style={{ objectFit: "cover" }}
                          src={fileNames}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 3,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  <Box sx={{ width: "100%", px: "10px", py: "10px" }}>
                    <Button
                      onClick={handleCreateTransaction}
                      sx={{
                        backgroundColor: "#92bc39",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      {t("detailModal.enter")}
                    </Button>
                  </Box>
                  <Box sx={{ width: "100%", px: "10px" }}>
                    <Button
                      onClick={() => props.setOpen(false)}
                      sx={{
                        backgroundColor: "#787877",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      {t("detailModal.cancel")}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
