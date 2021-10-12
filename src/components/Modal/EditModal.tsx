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

export default function EditModal(props: any) {
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [fileNames, setFileNames] = useState("");
  const [valueDate, setValueDate] = useState<Date | null>(new Date());
  const [valueTime, setValueTime] = React.useState<Date | null>(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const handleChangeDate = (newValue: Date | null) => {
    setValueDate(newValue);
  };
  const [category, setCategory] = useState("");

  const handleChangeCategory = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleDrop = (acceptedFiles: any) => {
    console.log({ acceptedFiles });
    setFileNames(acceptedFiles[0].name);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

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
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: {
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
                sx={{ backgroundColor: "#d6d9e0", color: "black" }}
              >
                {t("editmodal.back")}
              </Button>
              <Typography>{t("editmodal.title")}</Typography>
              {editMode ? (
                <Button
                  onClick={() => {}}
                  sx={{ backgroundColor: "#36a9e1", color: "white" }}
                >
                  {t("editmodal.done")}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditMode(true);
                  }}
                  sx={{ backgroundColor: "#36a9e1", color: "white" }}
                >
                  {t("editmodal.edit")}
                </Button>
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
                          {props.data.name}
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
                          <MobileTimePicker
                            label={t("editmodal.time")}
                            value={valueTime}
                            onChange={(newValue) => {
                              setValueTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.calories}
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
                            minWidth: {
                              sx: "100%",
                              md: 220,
                            },
                          }}
                        >
                          <Select
                            value={category}
                            onChange={handleChangeCategory}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {props.listCategories.map((item) => {
                              return (
                                <MenuItem value={item}>{item.name}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.fat}
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                đ
                              </InputAdornment>
                            ),
                          }}
                          id="outlined-basic"
                          label={t("editmodal.price")}
                          variant="outlined"
                          type="number"
                          sx={{
                            maxWidth: 220,
                          }}
                        />
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.carbs}
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
                        <TextareaAutosize
                          maxRows={4}
                          minRows={2}
                          aria-label="maximum height"
                          placeholder="Maximum 4 rows"
                          defaultValue={props.data.name}
                          style={{ width: "100%", fontSize: 15 }}
                        />
                      ) : (
                        <Typography sx={{ textAlign: "left" }}>
                          {props.data.name}
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
                <img
                  width="100%"
                  src="https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg"
                  alt="note_img"
                ></img>

                {editMode ? (
                  <Box>
                    <Dropzone onDrop={handleDrop} multiple={false}>
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
