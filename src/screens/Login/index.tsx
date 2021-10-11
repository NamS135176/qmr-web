import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { login } from "api/member";
import CircularProgress from "@mui/material/CircularProgress";
import { setAuthorize } from "api";

function Page() {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async ({ email, password }) => {
    setShowError(false);
    setLoading(true);
    try {
      const res: any = await login(email, password);
      setAuthorize(res.access_token);
      window.localStorage.setItem("access_token", res.access_token);
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
              Email or password is invalid. Please try again.
            </p>
          ) : (
            <p></p>
          )}
          <img src={"assets/images/logo_en.png"} width="100%" />
          <p
            style={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
            }}
          >
            Log in to Quick Money Recorder PC
          </p>
          <p
            style={{
              fontSize: 15,
              margin: 0,
              padding: 0,
              lineHeightStep: 1,
              lineHeight: "1.1",
            }}
          >
            (Please input email address and password which has been registered
            to QMR Subscription)
          </p>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            sx={{ marginTop: 3 }}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            sx={{ marginTop: 3 }}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Box
            sx={{
              borderBottom: 1,
              marginTop: 2,
              paddingBottom: 3,
              borderColor: "#eee",
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
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <p
              style={{
                fontSize: 15,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
              }}
            >
              Quick Money Recorder PC is Beta version. Some function may not
              work.
            </p>
          </Box>
          <Box sx={{ paddingTop: 1 }}>
            <Link
              href="/forgot-password"
              sx={{
                fontSize: 15,
                margin: 0,
                padding: 0,
                lineHeightStep: 1,
                lineHeight: "1.1",
                color: "black",
                "&:hover": {
                  color: "#428bca",
                },
              }}
            >
              *If you forgot your password, re-issue new password here
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
