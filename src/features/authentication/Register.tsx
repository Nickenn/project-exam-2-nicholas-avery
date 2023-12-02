import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name."),
    email: yup
      .string()
      .email("Email must be a valid email.")
      .required("Please enter your email."),
    password: yup
      .string()
      .min(6, "Your password must be more than 6 characters.")
      .required("Password is required."),
  })
  .required();

interface FormDataProps {
  name: string;
  email: string | number;
  password: string;
  avatar: string;
  manager: boolean;
}

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      manager: false,
    },
  });

  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    try {
      setServerErrors("");
      //send data to API
      const data = await registerUser(formData);

      navigate(`/profiles/${data.name}`);
    } catch (error) {
      let errorMessage = "User registration failed.";

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
              <Typography
                variant="body2"
                gutterBottom
                width={600}
                color={"#d32f2f"}
              >
                {errors.name?.message}
              </Typography>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                gutterBottom
                width={600}
                color={"#d32f2f"}
              >
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
              <Typography
                variant="body2"
                gutterBottom
                width={600}
                color={"#d32f2f"}
              >
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
            <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                Venue manager
                <Checkbox {...register("manager")} />
              </Typography>
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
