import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect, useContext } from "react";
import { getCurrencies } from "api/curency";
import InputLabel from "@mui/material/InputLabel";
import { useTranslation } from "react-i18next";

export default function CurrencyModal({ open, onClose }: any) {
  const { t, i18n } = useTranslation();

  const [currencies, setCurrencies] = useState<any>([]);

  const nameCurrency: any = localStorage.getItem("currency");
  // console.log(
  //   "🚀 ~ file: CurrencyModal.tsx ~ line 20 ~ CurrencyModal ~ nameCurrency",
  //   nameCurrency
  // );
  const [currency, setCurrency] = useState(
    i18n.language === "en"
      ? JSON.parse(nameCurrency)?.name
      : JSON.parse(nameCurrency)?.nameJP
  );
  console.log({ currency });
  const getCurrenciesData = async () => {
    const response = await getCurrencies();
    // console.log(
    //   "🚀 ~ file: CurrencyModal.tsx ~ line 22 ~ getCurrenciesData ~ response",
    //   response
    // );

    setCurrencies(response);
  };
  const handleChangeCurrency = (event: SelectChangeEvent) => {
    console.log("change");
    setCurrency(event.target.value);
  };
  useEffect(() => {
    getCurrenciesData();
  }, [i18n.language]);
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
                <MenuItem
                  key={item.id}
                  value={i18n.language === "en" ? item.name : item.nameJP}
                >
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
