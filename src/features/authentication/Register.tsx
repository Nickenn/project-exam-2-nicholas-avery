import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/aoiAuth";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import Login from "../../pages/auth/Login";

interface FormDataProps {
  name: string;
  email: string | number;
  password: string;
  avatar: string;
  manager: boolean;
}

function RegistrationForm() {
  const navigate = useNavigate();

  const form = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      manager: false,
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    const data = await registerUser(formData);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      setTimeout(() => {
        navigate("/auth/login");
      }, 500);
    }
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/auth/login" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default RegistrationForm;
