import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { getCurrencies } from "api/curency";
import { updateCurrentMember } from "api/member";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CurrencyModal({ open, onClose }: any) {
  const { t, i18n } = useTranslation();

  const [currencies, setCurrencies] = useState<any>([]);
  const nameCurrency: any = localStorage.getItem("currency");
  console.log("currency", JSON.parse(nameCurrency));

  const [currency, setCurrency] = useState(JSON.parse(nameCurrency));
  const getCurrenciesData = async () => {
    const response = await getCurrencies();
    console.log("getcurrency");
    setCurrencies(response);
  };
  const handleChangeCurrency = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCurrency(event.target.value);
  };
  const submitChangeCurrency = async () => {
    const idCurrency = currency ? currency?.id : JSON.parse(nameCurrency)?.id;
    console.log("ahihi", idCurrency);
    const language = i18n.language === "en" ? "en" : "jp";
    const response = await updateCurrentMember(language, idCurrency);
    if (currency) {
      localStorage.setItem("currency", JSON.stringify(currency));
    }
    // onClose();
    window.location.reload();
  };

  useEffect(() => {
    getCurrenciesData();
  }, []);
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          paddingLeft: {
            md: 5,
          },
          paddingRight: {
            md: 5,
          },
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
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
          {t("currency.back")}
        </Button>
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          {t("currency.setting")}
        </Typography>
        <Button
          sx={{
            background: "#36a9e1",
            color: "black",
            marginRight: 2,
            "&:hover": {
              background: "#1e8fc6",
              color: "black",
            },
          }}
          onClick={submitChangeCurrency}
        >
          Ok
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{ paddingLeft: 4, paddingRight: 4, marginTop: 2, marginBottom: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="currencies"> {t("currency.label")}</InputLabel>
          <Select
            labelId="currencies"
            id="currencies"
            value={currency}
            label="currencies"
            onChange={handleChangeCurrency}
          >
            {currencies.map((item: any) => {
              return (
                <MenuItem key={item.id} value={item}>
                  {i18n.language === "en" ? item.name : item.nameJP}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  );
}
