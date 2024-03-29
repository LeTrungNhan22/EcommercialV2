import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { unwrapResult } from "@reduxjs/toolkit";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../../assets/background/seller_image_background.png";
import AuthContext from "../../context/authContext";
import { loginCustomer, loginInfo } from "../../redux/auth/authSlice";



import { getError } from "../../utils/error";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  var base64 = require("base-64");
  const [loading, setLoading] = useState(true);
  const { logoutContext } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const location = useLocation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (location.pathname === '/login') {
      logoutContext();
      toast.success("Đăng xuất thành công");
    }
  }, []);

  const submitHandler = async ({ email, password }, e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const params = {
        email: email,
        password: base64.encode(password),
        "full-name": "null",
        image: "null",
        "service-type": "NORMALLY",
      };
      const response = await dispatch(loginCustomer(params));
      console.log(response);
      const data = unwrapResult(response);
      if (data.status === 1) {
        setLoading(true);
        const token = data.data;
        // console.log(token);
        const loginData = {
          "code-token": token,
          "service-type": "NORMALLY",
        };
        const res = await dispatch(loginInfo(loginData));
        const unwrapRes = unwrapResult(res);
        if (unwrapRes.shop === null) {
          toast.error(`Bạn đăng ký shop vui lòng đến trang đăng ký shop`);
        } else {
          setLoading(true);
          localStorage.setItem("accessToken", token);
          toast.success("Login successfully");
          window.location.href = "/seller/dashboard-seller";
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      getError(error) && setLoading(true);
      console.log(error);
      console.log(getError(error));
      toast.error(getError(error) === "Bad credentials" ? "Bad credentials(Sai thông tin mật khẩu)" : getError(error));
    }
  };




  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Kênh bán hàng
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                helperText={
                  (errors.email?.type === "required" &&
                    "Vui lòng nhập email") ||
                  (errors.email?.type === "pattern" && "Email không hợp lệ")
                }
                error={Boolean(errors.email)}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
              />
              <TextField
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu ",
                  minLength: {
                    value: 6,
                  },
                })}
                helperText={
                  (errors.password?.type === "minLength" &&
                    "Mật khẩu phải có ít nhất 6 ký tự") ||
                  (errors.password?.type === "required" &&
                    "Vui lòng nhập mật khẩu")
                }
                error={Boolean(errors.password)}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng nhập vào kênh người bán
                </Button>
              ) : (
                <LoadingButton
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                  loading
                  loadingIndicator="Đang xử lý..."
                >
                  Đang xử lý...
                </LoadingButton>
              )}

              <Grid container
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Grid item

                >
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>

                </Grid>
                <Grid item >
                  <Link
                    target="_blank"
                    href="http://localhost:3000/shop/create" variant="body2">
                    Đăng ký shop
                  </Link>
                </Grid>

              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
