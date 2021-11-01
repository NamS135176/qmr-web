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
import { getCurrentMember, updateCurrentMember } from "api/member";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import NativeSelect from "@mui/material/NativeSelect";
import DateSelectContext from "utils/context";

export default function CurrencyModal({ open, onClose }: any) {
  const { t, i18n } = useTranslation();
  const [currencies, setCurrencies] = useState<any>([]);
  const nameCurrency: any = localStorage.getItem("currency");
  const listCurrency: any = localStorage.getItem("currencies");
  const [currency, setCurrency] = useState<any>(JSON.parse(nameCurrency)?.id);
  const getCurrenciesData = async () => {
    if (!JSON.parse(listCurrency)) {
      const response = await getCurrencies();
      setCurrencies(response);
    } else {
      setCurrencies(JSON.parse(listCurrency));
    }

    setCurrency(JSON.parse(nameCurrency)?.id);
  };
  const handleChangeCurrency = (event: any) => {
    console.log(event.target.value);
    setCurrency(event.target.value);
  };
  const submitChangeCurrency = async () => {
    const idCurrency = currency ? currency : JSON.parse(nameCurrency)?.id;

    const language = i18n.language === "en" ? "en" : "jp";
    const response = await updateCurrentMember(language, idCurrency);
    if (currency) {
      const item = currencies.find((i) => i.id === currency);
      localStorage.setItem("currency", JSON.stringify(item));
    }
    window.location.reload();
  };
  const handleCloseModal = () => {
    setCurrency(JSON.parse(nameCurrency)?.id);
    onClose();
  };

  useEffect(() => {
    getCurrenciesData();
  }, []);
  return (
    <Dialog fullWidth={true} open={open} onClose={handleCloseModal}>
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
            defaultValue={currency}
            labelId="currencies"
            id="currencies"
            value={currency}
            label="currencies"
            onChange={handleChangeCurrency}
          >
            {currencies.map((item: any) => {
              return (
                <MenuItem key={item.id} value={item.id}>
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
