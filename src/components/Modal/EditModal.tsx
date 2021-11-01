import React, { useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Dropzone from "react-dropzone";
import moment from "moment";
import { updateTransaction, uploadImage } from "api/transaction";
import { useHistory } from "react-router-dom";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import Checkbox from "@mui/material/Checkbox";
import el from "date-fns/esm/locale/el/index.js";
import Resizer from "react-image-file-resizer";
import { checkSize, resizeFile } from "utils/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import NumberFormat from "react-number-format";
import "./style.scss";
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      // isNumericString
    />
  );
}

export default function EditModal(props: any) {
  const history = useHistory();
  const [checked, setChecked] = React.useState(false);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const currency: any = localStorage.getItem("currency");
  const toDateWithOutTimeZone = (date) => {
    let tempTime = date.split(":");
    let dt = new Date();
    dt.setHours(tempTime[0]);
    dt.setMinutes(tempTime[1]);
    dt.setSeconds(tempTime[2]);
    return dt;
  };

  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [fileNames, setFileNames] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueDate, setValueDate] = useState<Date | null>(
    new Date(props.data.time.split(" ")[0])
  );
  const [valueTime, setValueTime] = React.useState<Date | null>(
    toDateWithOutTimeZone(props.data.time.split(" ")[1])
  );
  const [price, setPrice] = useState<Number>(props.data.price);
  const [memo, setMemo] = useState(props.data.memo);

  const handleChangeDate = (newValue: Date | null) => {
    setValueDate(newValue);
  };
  const [category, setCategory] = useState<any>({
    id: props.data.category_id,
    name: props.data.cate,
  });

  const handleChangeCategory = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleDrop = async (acceptedFiles: any) => {
    const newImg: any = await resizeFile(acceptedFiles[0]);
    console.log(newImg);

    if (checkSize(newImg)) {
      setFile(newImg);
      setFileNames(acceptedFiles[0].name);
    } else {
      window.alert("File size over 2MB");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const oldItem = props.data;
    if (checked) {
      const res = await updateTransaction(
        oldItem.id,
        category.id,
        "106806",
        `${moment(valueDate).format("YYYY-MM-DD")} ${moment(valueTime).format(
          "HH:mm:ss"
        )}`,
        Number(price),
        memo,
        oldItem.photo,
        Number(oldItem.count),
        oldItem.client_id,
        oldItem.device_id,
        true
      );
    } else {
      if (file) {
        console.log("upload file");

        const resImg = await uploadImage(file);

        const res = await updateTransaction(
          oldItem.id,
          category.id,
          oldItem.payment_method_id,
          `${moment(valueDate).format("YYYY-MM-DD")} ${moment(valueTime).format(
            "HH:mm:ss"
          )}`,
          Number(price),
          memo,
          resImg.photo_url,
          Number(oldItem.count),
          oldItem.client_id,
          oldItem.device_id,
          false
        );
      } else {
        const res = await updateTransaction(
          oldItem.id,
          category.id,
          oldItem.payment_method_id,
          `${moment(valueDate).format("YYYY-MM-DD")} ${moment(valueTime).format(
            "HH:mm:ss"
          )}`,
          Number(price),
          memo,
          oldItem.photo,
          Number(oldItem.count),
          oldItem.client_id,
          oldItem.device_id,
          false
        );
      }
    }
    setLoading(false);
    props.getList((props.page - 1) * 20, props.order, props.sort);
    props.setOpen(false);
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // open='open'
        onClose={() => {
          props.setOpen(false);
          setEditMode(false);
          setFileNames("");
          setCategory("");
        }}
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box
            className="scrollbar"
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "90%",
                md: 600,
              },
              bgcolor: "background.paper",
              // border: '2px solid #000',
              boxShadow: 24,
              maxHeight: "80%",
              borderRadius: 2,
              overflow: "scroll",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                borderBottom: "1px solid #ddd",
              }}
            >
              <Button
                onClick={() => {
                  props.setOpen(false);
                  setEditMode(false);
                  setFileNames("");
                  setCategory("");
                }}
                sx={{
                  backgroundColor: "#d6d9e0",
                  color: "black",
                  ":hover": {
                    backgroundColor: "#d6d9e0",
                  },
                }}
              >
                {t("editmodal.back")}
              </Button>
              <Typography>{t("editmodal.title")}</Typography>
              {editMode ? (
                <Box>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={handleUpdate}
                      sx={{
                        backgroundColor: "#36a9e1",
                        color: "white",
                        ":hover": {
                          backgroundColor: "#36a9e1",
                        },
                      }}
                    >
                      {t("editmodal.done")}
                    </Button>
                  )}
                </Box>
              ) : (
                <Box>
                  <Button
                    onClick={() => {
                      setEditMode(true);
                    }}
                    sx={{
                      backgroundColor: "#36a9e1",
                      color: "white",
                      ":hover": {
                        backgroundColor: "#36a9e1",
                      },
                    }}
                  >
                    {t("editmodal.edit")}
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              <Box
                sx={{
                  width: {
                    sx: "100%",
                    md: "65%",
                  },

                  backgroundColor: "#f9f9f9",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #ddd",
                  }}
                >
                  <Box sx={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                    <Box
                      sx={{
                        borderRight: "1px solid #ddd",
                        width: {
                          sx: "30%",
                          md: 130,
                        },
                        padding: {
                          xs: 1,
                          md: 2,
                        },
                        minWidth: 80,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: {
                            sx: "center",
                            md: "right",
                          },
                        }}
                      >
                        {t("editmodal.date")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: "100%",
                        p: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >
                      {editMode ? (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            label={t("editmodal.date")}
                            value={valueDate}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.time.split(" ")[0]}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #ddd",
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      sx={{
                        borderRight: "1px solid #ddd",
                        width: {
                          sx: "30%",
                          md: 130,
                        },
                        padding: {
                          xs: 1,
                          md: 2,
                        },
                        minWidth: 80,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: {
                            sx: "center",
                            md: "right",
                          },
                        }}
                      >
                        {t("editmodal.time")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: "100%",
                        p: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >
                      {editMode ? (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopTimePicker
                            label={t("editmodal.time")}
                            value={valueTime}
                            onChange={(newValue: any) => {
                              if (newValue != "Invalid Date") {
                                setValueTime(newValue);
                              }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.time.split(" ")[1]}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                    <Box
                      sx={{
                        borderRight: "1px solid #ddd",
                        width: {
                          sx: "30%",
                          md: 130,
                        },
                        padding: {
                          xs: 1,
                          md: 2,
                        },
                        minWidth: 80,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: {
                            sx: "center",
                            md: "right",
                          },
                        }}
                      >
                        {t("editmodal.category")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: "100%",
                        p: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >
                      {editMode ? (
                        <FormControl
                          sx={{
                            width: {
                              xs: "100%",
                              md: 224,
                            },
                            maxWidth: {
                              xs: 145,
                              md: 224,
                            },
                          }}
                        >
                          <Select
                            value={category}
                            onChange={handleChangeCategory}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={category}>
                              {i18n.language == "en"
                                ? props.data.cate
                                : props.data.nameJP}
                            </MenuItem>
                            {props.listCategories.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item}>
                                  {i18n.language == "en"
                                    ? item.name
                                    : item.nameJP}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography
                          sx={{ textAlign: "left", wordBreak: "break-word" }}
                        >
                          {i18n.language == "en"
                            ? props.data.cate
                            : props.data.nameJP}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #ddd",
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      sx={{
                        borderRight: "1px solid #ddd",
                        width: {
                          sx: "30%",
                          md: 130,
                        },
                        padding: {
                          xs: 1,
                          md: 2,
                        },
                        minWidth: 80,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: {
                            sx: "center",
                            md: "right",
                          },
                        }}
                      >
                        {t("editmodal.price")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: "100%",
                        p: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >
                      {editMode ? (
                        <TextField
                          label={t("editmodal.price")}
                          id="price"
                          // value={price?.toFixed(2)}
                          // inputProps={{ maxLength: 8 }}
                          sx={{ width: "100%" }}
                          onChange={(e) => {
                            setPrice(parseInt(e.target.value));
                          }}
                          defaultValue={props.data.price}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {JSON.parse(currency)?.symbol}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {JSON.parse(currency)?.symbol}
                          {new Intl.NumberFormat("jp-JA", {
                            style: "currency",
                            currency: "JPY",
                            currencyDisplay: "code",
                          })
                            .format(Number(props.data.price))
                            .replace("JPY", "")
                            .trim()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                    <Box
                      sx={{
                        borderRight: "1px solid #ddd",
                        width: {
                          sx: "30%",
                          md: 130,
                        },
                        padding: {
                          xs: 1,
                          md: 2,
                        },
                        minWidth: 80,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: {
                            sx: "center",
                            md: "right",
                          },
                        }}
                      >
                        {t("editmodal.memo")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexBasis: "100%",
                        p: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >
                      {editMode ? (
                        <Box>
                          {/* <TextareaAutosize
                            maxRows={4}
                            minRows={2}
                            aria-label="maximum height"
                            placeholder=""
                            defaultValue={props.data.memo}
                            style={{ width: "100%", fontSize: 15 }}
                            onChange={(e) => {
                              if (e.target.value.length <= 2000) {
                                setMemo(e.target.value);
                              }
                            }}
                          /> */}
                          <TextField
                            error={memo.length >= 2000}
                            sx={{ width: "100%" }}
                            onChange={(e) => {
                              if (e.target.value.length <= 2000) {
                                setMemo(e.target.value);
                              }
                            }}
                            defaultValue={props.data.memo}
                            multiline
                            id="memo"
                            variant="outlined"
                            rows={2}
                          />
                          <Typography sx={{ fontSize: 14 }}>
                            {t("editmodal.warning")}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography
                          sx={{ textAlign: "left", wordBreak: "break-word" }}
                        >
                          {props.data.memo}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: {
                    sx: "100%",
                    md: "35%",
                  },
                  backgroundColor: "#f9f9f9",
                  padding: 2,
                }}
              >
                {editMode ? (
                  <Typography sx={{ paddingBottom: 2 }}>
                    {t("editmodal.imgtitle")}
                  </Typography>
                ) : (
                  <Typography></Typography>
                )}
                {props.data.photo == "" ? (
                  <Typography>{t("editmodal.noimg")}</Typography>
                ) : (
                  <img
                    width="100%"
                    src={
                      "https://s3-ap-northeast-1.amazonaws.com/qmr-cloud-s3-dev/" +
                      props.data.photo
                    }
                    alt="note_img"
                  ></img>
                )}
                {editMode ? (
                  <Box>
                    <Dropzone
                      accept="image/*"
                      onDrop={handleDrop}
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag'n'drop files, or click to select files</p>
                        </div>
                      )}
                    </Dropzone>
                    <Box>
                      {props.data.photo != "" ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            sx={{ paddingLeft: 0 }}
                            checked={checked}
                            onChange={handleCheck}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <Typography>{t("editmodal.delete")}</Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                      <strong>Files: &nbsp;</strong>
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {fileNames}
                      </Typography>
                      <Typography> {t("editmodal.size")}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
