import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { updateAvatar } from "../../services/profileApi";

import { Typography, Box, Grid, TextField, Button } from "@mui/material";

interface FormDataProps {
  avatar: string;
}

function UpdateProfileForm() {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const form = useForm({
    defaultValues: {
      avatar: "",
    },
  });

  const { handleSubmit, formState, register } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    const data = await updateAvatar(authToken, userName, formData);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      navigate(`/profiles/${userName}`);
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
