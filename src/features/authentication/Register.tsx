import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/aoiAuth";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

interface FormDataProps {
  name: string;
  email: string | number;
  password: string;
  avatar: string;
  manager: boolean;
}

function RegisterForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      manager: false,
    },
  });

  const { errors, isSubmitSuccessful } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function onSubmit(formData: FormDataProps) {
    const data = await registerUser(formData);

    let validationIssue = false;

    if (!formData.name || !formData.name.length) {
      setNameError("Pleae enter a valid username");
      validationIssue = true;
    } else {
      setNameError("");
    }
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
      alert("Account successfully created.");
      return true;
    } else {
      alert("Please fill in required fields");
    }
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

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
          Sign up
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
                error={nameError && nameError.length ? true : false}
                autoComplete="given-name"
                required
                fullWidth
                id="username"
                label="Username"
                helperText={nameError}
                autoFocus
                {...register("name")}
              />
            </Grid>
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
            <Grid item xs={12}>
              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Venue manager"
                labelPlacement="start"
                {...register("manager")}
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
              <Link underline="none" href="/auth/login.tsx" variant="body1">
                <NavLink to="/auth/login.tsx">
                  Already have an account? Login here
                </NavLink>{" "}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default RegisterForm;
