import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { updateAvatar } from "../../services/profileApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { red } from "@mui/material/colors";

const schema = yup
  .object({
    avatar: yup.string().required("Please enter image url"),
  })
  .required();

interface FormDataProps {
  avatar: string;
}

function UpdateProfileForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { authToken, userName } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: "",
    },
  });

  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    try {
      setServerErrors("");
      const data = await updateAvatar(authToken, userName, formData);
      login(data);
    } catch (error) {
      let errorMessage = "Avatar update failed.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        setServerErrors(errorMessage);
        localStorage.setItem("userAvatar", formData.avatar);
        navigate(`/profiles/${userName}`);
      }
    }
  };

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
        <Typography component="h1" variant="h4">
          Update your avatar
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
                width={400}
                color={"#d32f2f"}
              >
                {errors.avatar?.message}
              </Typography>
              <TextField
                type="text"
                fullWidth
                id="avatar"
                label="Image url"
                required
                {...register("avatar")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            update avatar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UpdateProfileForm;
