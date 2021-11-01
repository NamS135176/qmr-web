import { useState, useMemo, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { getCurrentMember, login, updateCurrentMember } from "api/member";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import jwt_decode from "jwt-decode";
import { apiQMRWeb, setAuthorize } from "api";
import { useTranslation } from "react-i18next";
import { getCurrencies } from "api/curency";
import DateSelectContext from "utils/context";
import { isNil } from "ramda";
function Page() {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email(t("login.typemail"))
          .required(t("login.requiremail")),
        password: yup
          .string()
          .min(8, t("login.typepass"))
          .required(t("login.requirepass")),
      }),
    []
  );
  const getMember = async () => {
    const member = await getCurrentMember();
    console.log("🚀 ~ file: index.tsx ~ line 46 ~ getMember ~ member", member);
    apiQMRWeb.setHeader("Accept-Language", member.language);
    const currencies = await getCurrencies();
    const currency = currencies.find((item) => item.id === member?.currency_id);
    const currencyDollar = currencies.find((item) => item.id === "1");
    if (!currency) {
      await updateCurrentMember("en", currencyDollar?.id);
    }
    localStorage.setItem("currencies", JSON.stringify(currencies));
    localStorage.setItem(
      "currency",
      JSON.stringify(currency ? currency : currencyDollar)
    );

    if (member.language === "en") {
      i18n.changeLanguage("en");
      apiQMRWeb.setHeader("Accept-Language", "en");
    } else {
      i18n.changeLanguage("ja");
      apiQMRWeb.setHeader("Accept-Language", "jp");
    }
  };

  const onSubmit = async ({ email, password }) => {
    setShowError(false);
    setLoading(true);
    try {
      const res: any = await login(email, password);
      if (res) {
        setAuthorize(res.access_token);
        await getMember();
      }
      window.localStorage.setItem("access_token", res.access_token);
      var decoded = jwt_decode(res.access_token);

      history.push("/");
      setLoading(false);
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
    handleBlur,
    isValid,
    values,
    errors,
    touched,
    dirty,
  } = formik;

  const handleLogin = (e: any) => {
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
          paddingBottom: 5,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            // marginTop: 100,
            padding: 3,
            minWidth: {
              xs: 270,
              md: 350,
            },
            marginLeft: `auto`,
            marginRight: `auto`,
            width: {
              xs: "90%",
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
              {t("login.error")}
            </p>
          ) : (
            <p></p>
          )}
          <Box sx={{ textAlign: "center" }}>
            <img src={"assets/images/logo.png"} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {t("logo") === "jp" ? (
              <img
                className="image"
                src={"assets/images/new_logo_jp.png"}
                width="100%"
              />
            ) : (
              <img
                className="image"
                src={"assets/images/logo_en.png"}
                width="100%"
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "space-between",
                md: '"space-around"',
              },
              marginTop: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                margin: 0,
                paddingRight: {
                  xs: 2,
                  md: 0,
                },
                lineHeightStep: 1,
                lineHeight: "1.1",
              }}
            >
              {t("login.title1")}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                margin: 0,
                paddingLeft: {
                  xs: 2,
                  md: 0,
                },
                lineHeightStep: 1,
                lineHeight: "1.1",
              }}
            >
              {t("login.title2")}
            </Typography>
          </Box>

          <TextField
            fullWidth
            id="email"
            name="email"
            placeholder={t("login.holder_email")}
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
            defaultValue={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Typography sx={{ py: "5px", fontSize: "14px", color: "red" }}>
            {errors.email}
          </Typography>
          <TextField
            fullWidth
            id="password"
            name="password"
            placeholder={t("login.holder_password")}
            type="password"
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
            defaultValue={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Typography sx={{ py: "5px", fontSize: "14px", color: "red" }}>
            {errors.password}
          </Typography>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                disabled={!dirty && isValid}
              >
                {t("login.btn_text")}
              </Button>
            )}
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                paddingRight: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "#333333",
              }}
            >
              {t("login.suggest1")}
            </p>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                paddingRight: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "#333333",
              }}
            >
              {t("login.suggest2")}
            </p>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              paddingTop: 2,
              paddingBottom: 1,
            }}
          >
            <Link
              href="/forgot-password"
              sx={{
                fontSize: 16,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "#47C53E",
                textDecoration: "none",

                // "&:hover": {
                //   color: "#428bca",
                // },
              }}
            >
              {t("login.forgot_pass")}
            </Link>
          </Box>
          <Box>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                paddingTop: 20,

                color: "#999",
              }}
            >
              {t("login.warning1")}
            </p>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",

                paddingBottom: 20,
                color: "#999",
              }}
            >
              {t("login.warning2")}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
