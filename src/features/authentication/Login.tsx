import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email.")
      .required("Please enter your email."),
    password: yup
      .string()
      .min(6, "Your password must be more than 6 characters.")
      .required(),
  })
  .required();

interface FormLoginProps {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormLoginProps) {
    //send Login data to API

    try {
      setServerErrors("");
      const data = await loginUser(formData);
      login(data);
      navigate(`/profiles/${data.name}`);
    } catch (error) {
      let errorMessage = "Login failed. Please try again";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  }

  return (
    <>
      {" "}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                {errors.email?.message}
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                {errors.password?.message}
              </Typography>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link underline="none" href="/auth/register.tsx" variant="body1">
                <NavLink to="/auth/register.tsx">
                  Don't have an account? Create one here
                </NavLink>{" "}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
