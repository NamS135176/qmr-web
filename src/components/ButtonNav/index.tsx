import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ButtonNav(props) {
  const { t, i18n } = useTranslation();
  let history = useHistory();
  return (
    <Button
      sx={{
        height: "100%",
        "&:hover": {
          backgroundColor: "#00B050",
        },
        backgroundColor: props.bgColor,
        borderRadius: 0,
      }}
      onClick={() => {
        history.push(props.link);
      }}
      className="btnNav"
      variant="text"
    >
      {t(props.toPage)}
    </Button>
  );
}
