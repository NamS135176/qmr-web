import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { getCurrentMember, login } from "api/member";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import jwt_decode from "jwt-decode";
import { setAuthorize } from "api";
import { useTranslation } from "react-i18next";
import { getCurrencies } from "api/curency";
function Page() {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const initialValues = useMemo(() => {
    return {
      email: "tih920@smart-idea.jp",
      password: "Smart2012",
    };
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
        password: yup
          .string()
          .min(8, "Password should be of minimum 8 characters length")
          .required("Password is required"),
      }),
    []
  );
  const getMember = async () => {
    const member = await getCurrentMember();
    console.log(
      "🚀 ~ file: index.tsx ~ line 52 ~ getCurrenciesData ~ currencies",
      member.language
    );
    const currencies = await getCurrencies();

    const currency = currencies.find((item) => item.id === member.currency_id);
    console.log(
      "🚀 ~ file: index.tsx ~ line 54 ~ getMember ~ currency",
      currency
    );
    localStorage.setItem("currency", JSON.stringify(currency));
    member.language === "en"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("ja");
  };

  const onSubmit = async ({ email, password }) => {
    setShowError(false);
    setLoading(true);
    try {
      const res: any = await login(email, password);
      if (res) {
        setAuthorize(res.access_token);
        getMember();
      }
      window.localStorage.setItem("access_token", res.access_token);
      var decoded = jwt_decode(res.access_token);

      setLoading(false);
      history.push("/");
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
              Email or password is invalid. Please try again.
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
                src={"assets/images/logo_jp.png"}
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
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
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
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
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
              <Button variant="contained" fullWidth onClick={handleLogin}>
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
              }}
            >
              {t("login.suggest")}
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
                paddingBottom: 20,
              }}
            >
              {t("login.warning")}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
