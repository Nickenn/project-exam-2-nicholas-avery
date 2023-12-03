import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { updateVenue } from "../../services/venuesApi";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const schema = yup.object({}).required();

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
  id: string;
}

function UpdateVenueForm() {
  const navigate = useNavigate();
  const { state: venue } = useLocation();
  const { authToken, userName } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: venue.name ?? "",
      description: venue.description ?? "",
      media: venue.media ?? [],
      price: venue.price ?? 0,
      maxGuests: venue.maxGuests ?? 1,
      rating: venue.rating ?? 0,
      wifi: venue.meta.wifi ?? false,
      parking: venue.meta.parking ?? false,
      breakfast: venue.meta.breakfast ?? false,
      pets: venue.meta.pets ?? false,
      address: venue.location.address ?? "",
      city: venue.location.city ?? "",
      zip: venue.location.zip ?? "",
      country: venue.location.country ?? "",
      continent: venue.location.continent ?? "",
      lat: venue.location.lat ?? 0,
      lng: venue.location.lng ?? 0,
      id: venue.id,
    },
  });

  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await updateVenue(formData, venue.id, authToken);

        navigate(`/profiles/${data.name}`);
      }
    } catch (error) {
      console.log(error);

      let errorMessage = "Venue update failed.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  }

  if (loading || !profile) {
    return <div>Loading...</div>;
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
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
          >
            {serverErrors}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update venue
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UpdateVenueForm;
