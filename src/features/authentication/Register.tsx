import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Checkbox } from "@mui/material";

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
    avatar: yup.string().required("Avatar url is required."),
    manager: yup.boolean().required("Manager is required."),
  })
  .required();

interface FormDataProps {
  name: string;
  email: string;
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
          Sign up
        </Typography>

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.name?.message}
        </Typography>
        <TextField
          autoComplete="given-name"
          required
          id="name"
          label="Username"
          autoFocus
          {...register("name")}
        />

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.email?.message}
        </Typography>
        <TextField
          required
          placeholder="your-email@stud.noroff.no"
          id="email"
          label="Email"
          autoComplete="email"
          {...register("email")}
        />

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.password?.message}
        </Typography>
        <TextField
          required
          label="Password"
          placeholder="**********"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password")}
        />

        <Typography variant="button" display="block" gutterBottom>
          Venue manager
          <Checkbox id="manager" {...register("manager")} />
        </Typography>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Button href="/auth/login">Already have an account? Login here</Button>
      </Box>
    </>
  );
}

export default RegisterForm;
