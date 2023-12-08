import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

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
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        gap={1}
        sx={{
          mt: 3,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          {serverErrors}
        </Typography>
        <Typography component="h1" variant="h4" padding={5}>
          Login
        </Typography>

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.email?.message}
        </Typography>
        <TextField
          required
          id="email"
          label="Email"
          autoComplete="email"
          {...register("email")}
        />

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.password?.message}
        </Typography>
        <TextField
          sx={{}}
          required
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password")}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>

        <Button href="/auth/register">
          Don't have an account? Create one here
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;
