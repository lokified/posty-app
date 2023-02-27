import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { EyeOffOutline, EyeOutline } from "mdi-material-ui";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { clearState, signupUser, userSelector } from "./store/store";

const Register = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
      dispatch(clearState());
    }

    if (isError) {
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ zIndex: 1, width: "500px" }}>
        <CardContent sx={{ padding: "1rem" }}>
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              posty
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to posty! 👋🏻
            </Typography>
            <Typography variant="body2">Register</Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              fullWidth
              id="name"
              placeholder="Name"
              onChange={handleChange("name")}
              sx={{ marginBottom: 4 }}
              {...register("name", {
                required: true,
              })}
              error={errors?.name?.type === "required"}
              helperText={
                errors?.name?.type === "required"
                  ? "This field is required"
                  : ""
              }
            />

            <TextField
              autoFocus
              fullWidth
              id="email"
              placeholder="Email"
              onChange={handleChange("email")}
              sx={{ marginBottom: 4 }}
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
              })}
              error={
                errors?.email?.type === "required" ||
                errors?.email?.type === "pattern"
              }
              helperText={
                errors?.email?.type === "required"
                  ? "This field is required"
                  : errors?.email?.type === "pattern"
                  ? "Enter valid email"
                  : ""
              }
            />
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                sx={{ marginBottom: 4 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ marginBottom: 7, background: "#EE9910E3" }}
            >
              Register
            </Button>

            <Divider sx={{ my: 5 }}>or</Divider>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant="body2">
                <Link to="/">LOGIN</Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
