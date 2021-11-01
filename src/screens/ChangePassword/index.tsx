import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { changePassword } from "api/member";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
export default function ChangePassword() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const { t, i18n } = useTranslation();
  //   const [oldPass, setOldpass] = useState(queryParams.get("password"));
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = useMemo(() => {
    return {
      password: "",
      cfPassword: "",
    };
  }, []);
  const validationSchema = useMemo(
    () =>
      yup.object({
        password: yup
          .string()
          .email(t("login.typepass"))
          .required(t("login.requirepass")),
        cfPassword: yup
          .string()
          .email(t("login.typepass"))
          .required(t("login.requirepass")),
      }),
    []
  );

  const onSubmit = async ({ password, cfPassword }) => {
    setShowError(false);
    if (password != cfPassword) {
      setShowError(true);
      setErrorMessage("Password and confirm password doesn't match");
    } else {
      setLoading(true);
      try {
        const email: any = queryParams.get("email");
        const oldPass: any = queryParams.get("password");
        const res: any = await changePassword(email, password, oldPass);
        setLoading(false);
        history.push("/login");
      } catch (error) {
        setLoading(false);
        const e: any = error;
        setErrorMessage(e.message);
        setShowError(true);
      }
    }
  };

  const handleChangePass = (e: any) => {
    e.preventDefault();
    validateForm();
    if (!isValid) {
      return;
    }
    handleSubmit();
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
    handleBlur,
    isValid,
    values,
    errors,
    touched,
  } = formik;

  useEffect(() => {
    console.log(queryParams.get("email"));
    if (!queryParams.get("email") || !queryParams.get("password")) {
      history.push("/forgot-password");
    }
  });
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
              {errorMessage}
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

          {/* <p
              style={{
                fontSize: 15,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                wordBreak: `break-word`,
              }}
            >
              Enter your email address to reset your password. You may need to
              check your spam folder or unblock okanereco_support_d@docomo.ne.jp
            </p> */}
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            placeholder={t("changePass.newpass")}
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
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            // helperText={touched.password && errors.password}
          />
          <Typography sx={{ py: "5px", fontSize: "14px", color: "red" }}>
            {errors.password}
          </Typography>
          <TextField
            fullWidth
            id="cfPassword"
            name="cfPassword"
            type="password"
            placeholder={t("changePass.cfnew")}
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
            value={values.cfPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            // helperText={touched.cfPassword && errors.cfPassword}
          />
          <Typography sx={{ py: "5px", fontSize: "14px", color: "red" }}>
            {errors.cfPassword}
          </Typography>
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
                  onClick={handleChangePass}
                  variant="contained"
                  fullWidth
                >
                  OK
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
