import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";

import { updateVenue } from "../../services/venuesApi";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

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
  const { userName } = useAuth();
  const { state: venue } = useLocation();
  const { authToken } = useAuth();
  const form = useForm<FormDataProps>({
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
  console.log("Venue", venue);
  console.log("Form", form);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    const data = await updateVenue(formData, venue.id, authToken);
    //handling server errors
    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      setServerErrors("");
      navigate(`/profiles/${userName}/venues`);
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
