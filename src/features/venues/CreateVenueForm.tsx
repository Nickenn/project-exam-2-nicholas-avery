import { useState } from "react";
import { useForm } from "react-hook-form";
import { createVenue } from "../../services/venuesApi";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/authContext";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const schema = yup
  .object({
    name: yup.string().required("Please enter Venue name"),
    description: yup
      .string()
      .min(6, "Your password must be more than 6 characters.")
      .required("Please enter a description"),
    price: yup.string().min(100).required("Please enter price"),
    maxGuests: yup
      .string()
      .min(1)
      .required("Please enter maximum number of guests"),
    rating: yup.string().min(1),
    country: yup
      .string()
      .min(6, "Your password must be more than 6 characters.")
      .required("country is required."),
    continent: yup
      .string()
      .min(6, "Your password must be more than 6 characters.")
      .required("continent is required."),
  })
  .required();

interface FormDataProps {
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export function CreateVenueForm() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: undefined,
      maxGuests: undefined,
      rating: 0,
      wifi: true,
      parking: true,
      breakfast: true,
      pets: true,
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit() {
    try {
      setServerErrors("");
      //send data to API
      const data = await createVenue(formData);

      navigate(`/profiles/${data.name}`);
    } catch (error) {
      console.log(error);

      let errorMessage = "Listing failed.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  }

  return (
    <>
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
          Create new venue
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
                type="text"
                required
                fullWidth
                id="name"
                label="Title"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                fullWidth
                id="description"
                label="Description"
                {...register("description")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                fullWidth
                id="media"
                label="Image(url)"
                {...register("media")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                fullWidth
                id="price"
                label="Price"
                {...register("price")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                fullWidth
                min={1}
                id="maxGuests"
                label="Maximum guests*"
                {...register("price")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                id="rating"
                label="Rating"
                {...register("rating")}
              />
            </Grid>
          </Grid>
          <Typography component="h1" variant="h2">
            Services:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                WiFi
                <Checkbox required id="wifi" {...register("wifi")} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                Parking
                <Checkbox required id="parking" {...register("parking")} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                Breakfast
                <Checkbox required id="breakfast" {...register("breakfast")} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                Pets
                <Checkbox required id="pets" {...register("pets")} />
              </Typography>
            </Grid>
          </Grid>
          <Typography component="h1" variant="h2">
            Location:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                id="address"
                label="Address"
                {...register("address")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                id="city"
                label="City"
                {...register("city")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                id="zip"
                label="Zip code"
                {...register("zip")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                required
                id="country"
                label="Country"
                {...register("country")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                id="continent"
                label="Continent"
                {...register("continent")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                id="lat"
                label="Lat"
                {...register("lat")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                id="lat"
                label="Lng"
                {...register("lng")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            List venue
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CreateVenueForm;
