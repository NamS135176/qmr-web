import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useTranslation } from "react-i18next";

export default function DateHomeModal({ open, onClose }: any) {
  const [valueFrom, setValueFrom] = useState<Date | null>(new Date());
  const [valueTo, setValueTo] = useState<Date | null>(new Date());
  const { t, i18n } = useTranslation();

  const handleChangeFrom = (newValue: Date | null) => {
    setValueFrom(newValue);
  };
  const handleChangeTo = (newValue: Date | null) => {
    setValueTo(newValue);
  };
  return (
    <Box>
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
            sx={{
              background: "#D6D9E0",
              color: "black",
              "&:hover": {
                background: "#ebebeb",
              },
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            {t("date_home_modal.cancel")}
          </Button>
          <Typography> {t("date_home_modal.title")}</Typography>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {t("date_home_modal.from") === "from" ? (
                <MobileDatePicker
                  label="From"
                  value={valueFrom}
                  onChange={handleChangeFrom}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                <MobileDatePicker
                  label="開始日"
                  value={valueFrom}
                  onChange={handleChangeFrom}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {t("date_home_modal.to") === "to" ? (
                <MobileDatePicker
                  label="To"
                  value={valueTo}
                  onChange={handleChangeTo}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                <MobileDatePicker
                  label="終了日"
                  value={valueTo}
                  onChange={handleChangeTo}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </LocalizationProvider>
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
          <Button variant="contained">Ok</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
