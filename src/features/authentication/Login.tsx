import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { loginUser } from "../../services/aoiAuth";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

interface FormLoginProps {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState, reset } = useForm<FormLoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors, isSubmitSuccessful } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function onSubmit(formData: FormLoginProps) {
    //send login data to API
    const data = await loginUser(formData);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("name", data.name);
    console.log(localStorage);

    let validationIssue = false;

    if (!formData.email || !formData.email) {
      setEmailError("Pleae enter a valid email address");
      validationIssue = true;
    } else {
      setEmailError("");
    }
    if (!formData.password || !formData.password.length) {
      setPasswordError("Pleae enter a valid password");
      validationIssue = true;
    } else {
      setPasswordError("");
    }
    if (!validationIssue) {
      alert("Login successful");
      return true;
    } else {
      alert("Please fill in required fields");
    }

    if (data.errors) {
      setServerErrors(data.errors[0].message);
      useEffect(() => {
        reset();
      }, [isSubmitSuccessful, reset]);
    } else {
      //save user
      login(data);

      // navigate to profile page
      setTimeout(() => {
        navigate(`/profiles/${data.name}`);
      }, 1000);
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
              <TextField
                error={emailError && emailError.length ? true : false}
                required
                fullWidth
                id="email"
                label="Email"
                helperText={emailError}
                autoComplete="email"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError && passwordError.length ? true : false}
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                helperText={passwordError}
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
