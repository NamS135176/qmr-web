import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function RequestDone() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  return (
    <Box
      sx={{
        width: `100%`,
        height: `100vh`,
        backgroundColor: "#383e4b",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#383e4b",
          boxSizing: "border-box",
          paddingTop: {
            xs: 5,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            // marginTop: 100,
            padding: 3,
            minWidth: 250,
            marginLeft: `auto`,
            marginRight: `auto`,
            width: {
              xs: "80%",
              md: "30%",
              lg: "20%",
            },
          }}
        >
          <Box sx={{ textAlign: "center", paddingBottom: "30px" }}>
            {t("logo") === "jp" ? (
              <img
                className="image"
                src={"/assets/images/new_logo_jp.png"}
                width="100%"
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <img
                className="image"
                src={"/assets/images/logo_en.png"}
                style={{ maxWidth: "200px" }}
                width="100%"
              />
            )}
          </Box>

          <p
            style={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
              wordBreak: `break-word`,
            }}
          >
            {t("done.des")}
          </p>

          <Box sx={{ marginTop: 2 }}>
            <Button
              onClick={() => {
                history.push("/login");
              }}
              variant="contained"
              fullWidth
            >
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
