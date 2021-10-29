import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { forgotPassword } from "api/member";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
export default function ForgotPassScreen() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = useMemo(() => {
    return {
      email: "tih920@smart-idea.jp",
    };
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
      }),
    []
  );

  const onSubmit = async ({ email }) => {
    setLoading(true);
    setShowError(false);
    try {
      console.log(email);

      const res: any = await forgotPassword(email);
      // window.localStorage.setItem("access_token", res.access_token);
      // var decoded = jwt_decode(res.access_token);
      console.log(res);

      setLoading(false);
      history.push("/send_mail_done");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowError(true);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    validateForm,
    isValid,
    values,
    errors,
    touched,
  } = formik;

  const handleForgotPass = (e: any) => {
    e.preventDefault();
    validateForm();
    if (!isValid) {
      return;
    }
    handleSubmit();
  };

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
          {showError ? (
            <p
              style={{
                fontSize: 13,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "red",
              }}
            >
              {t("forgotPass.error")}
            </p>
          ) : (
            <p></p>
          )}
          <Box sx={{ textAlign: "center", paddingBottom: "30px" }}>
            {t("logo") === "jp" ? (
              <img
                className="image"
                src={"assets/images/new_logo_jp.png"}
                width="100%"
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <img
                className="image"
                src={"assets/images/logo_en.png"}
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
            {t("forgotPass.des")}
          </p>
          <TextField
            fullWidth
            id="email"
            name="email"
            placeholder={t("forgotPass.placeholder")}
            sx={{
              marginTop: 3,
              borderRadius: 2,
              backgroundColor: "#ddd",
              "& .MuiOutlinedInput-root": {
                // - The Input-root, inside the TextField-root
                "& fieldset": {
                  // - The <fieldset> inside the Input-root
                  borderWidth: 0, // - Set the Input border
                },
                "&:hover fieldset": {
                  borderWidth: 0, // - Set the Input border when parent has :hover
                },
                "&.Mui-focused fieldset": {
                  // - Set the Input border when parent is focused
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "black",
                },
              },
            }}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            // helperText={touched.email && errors.email}
          />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Box sx={{ marginTop: 2 }}>
                <Button
                  onClick={handleForgotPass}
                  variant="contained"
                  fullWidth
                >
                  {t("forgotPass.submit")}
                </Button>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Link style={{ textDecoration: "none" }} to={`/`}>
                  <Button onClick={() => {}} variant="contained" fullWidth>
                    {t("forgotPass.back")}
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
