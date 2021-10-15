import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getSummary } from "api/summary";
import jaLocale from "date-fns/locale/ja";
import { Formik } from "formik";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import DateSelectContext from "utils/context";
import * as Yup from "yup";

export default function DateHomeModal({ open, onClose }: any) {
  const { dateFrom, dateTo, monthYear, openModal } =
    useContext(DateSelectContext);

  const { t, i18n } = useTranslation();

  // const handleOk = async () => {
  //   dateTo[1](moment(valueTo).format('YYYY-MM-DD'));
  //   dateFrom[1](moment(valueFrom).format('YYYY-MM-DD'));
  // };
  return (
    <Box>
      <Formik
        initialValues={{
          valueFrom: dateFrom[0] || moment().format("YYYY-MM-DD"),
          valueTo: dateTo[0] || moment().format("YYYY-MM-DD"),
        }}
        validationSchema={Yup.object().shape({
          valueTo: Yup.date().when(
            "valueFrom",
            (valueFrom, yup) => valueFrom && yup.min(valueFrom, "error time")
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dateTo[1](values.valueTo);
            dateFrom[1](values.valueFrom);
            openModal[1](true);
          } catch (e: any) {
            console.log(e.message);

            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Dialog fullWidth={true} open={open} onClose={onClose}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  position: "relative",
                }}
              >
                <Button
                  onClick={onClose}
                  sx={{
                    background: "#D6D9E0",
                    color: "black",
                    "&:hover": {
                      background: "#ebebeb",
                    },
                    position: {
                      xs: "static",
                      md: "absolute",
                    },
                    top: 10,
                    left: 10,
                  }}
                >
                  {t("date_home_modal.cancel")}
                </Button>
                <Typography
                  sx={{
                    paddingLeft: {
                      xs: 2,
                      md: 0,
                    },
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {t("date_home_modal.title")}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ pb: 2 }}>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {t("date_home_modal.from") === "from" ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="From"
                        value={values.valueFrom}
                        onChange={(value) => {
                          setFieldValue(
                            "valueFrom",
                            moment(value).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={Boolean(errors.valueFrom)}
                            // onBlur={handleBlur}
                            helperText={errors.valueFrom}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <LocalizationProvider
                      locale={jaLocale}
                      dateAdapter={AdapterDateFns}
                    >
                      <MobileDatePicker
                        label="開始日"
                        cancelText="キャンセル"
                        value={values.valueFrom}
                        onChange={(value) => {
                          setFieldValue(
                            "valueFrom",
                            moment(value).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={Boolean(errors.valueFrom)}
                            // onBlur={handleBlur}
                            helperText={errors.valueFrom}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Box>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {t("date_home_modal.to") === "to" ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="To"
                        value={values.valueTo}
                        onChange={(value) => {
                          console.log({
                            value: moment(value).format("YYYY-MM-DD"),
                          });
                          setFieldValue(
                            "valueTo",
                            moment(value).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(errors.valueTo)}
                            // onBlur={handleBlur}
                            helperText={errors.valueTo}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <LocalizationProvider
                      locale={jaLocale}
                      dateAdapter={AdapterDateFns}
                    >
                      <MobileDatePicker
                        label="終了日"
                        cancelText="キャンセル"
                        value={values.valueTo}
                        onChange={(value) => {
                          setFieldValue(
                            "valueTo",
                            moment(value).format("YYYY-MM-DD")
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(errors.valueTo)}
                            // onBlur={handleBlur}
                            helperText={errors.valueTo}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 1,
                }}
              >
                <Button
                  onClick={() => {
                    console.log("abc", values.valueFrom);
                    handleSubmit();
                    onClose();
                  }}
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Ok
                </Button>
              </Box>
            </Dialog>
          </form>
        )}
      </Formik>
    </Box>
  );
}
