import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";

import { updateVenue } from "../../services/venuesApi";
import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";

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

  const { register, handleSubmit } = form;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await updateVenue(formData, venue.id, authToken);
        if (data.errors) {
          setServerErrors(`${data.errors[0].message} (${data.errors[0].path})`);
        } else {
          navigate(`/profiles/${userName}/venues`);
        }
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

  return (
    <>
      {" "}
      <Grid
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        container
        gap={4}
        marginBottom={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Update venue
        </Typography>
        <TextField
          type="text"
          required
          id="name"
          label="Title"
          {...register("name")}
        />
        <TextField
          type="text"
          required
          id="description"
          label="Description"
          {...register("description")}
        />
        <TextField
          type="text"
          required
          id="media"
          label="Image(url)"
          {...register("media")}
        />
        <TextField
          type="number"
          required
          id="price"
          label="Price"
          {...register("price")}
        />
        <TextField
          type="number"
          required
          min={1}
          id="maxGuests"
          label="Maximum guests*"
          {...register("price")}
        />
        <TextField
          type="number"
          required
          id="rating"
          label="Rating"
          {...register("rating")}
        />
        <Typography component="h1" variant="h5">
          Services:
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          WiFi
          <Checkbox required id="wifi" {...register("wifi")} />
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          Parking
          <Checkbox required id="parking" {...register("parking")} />
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          Breakfast
          <Checkbox required id="breakfast" {...register("breakfast")} />
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          Pets
          <Checkbox required id="pets" {...register("pets")} />
        </Typography>
        <Typography component="h1" variant="h5">
          Location:
        </Typography>
        <TextField
          type="text"
          required
          id="address"
          label="Address"
          {...register("address")}
        />
        <TextField
          type="text"
          required
          id="city"
          label="City"
          {...register("city")}
        />
        <TextField
          type="text"
          required
          id="zip"
          label="Zip code"
          {...register("zip")}
        />
        <TextField
          type="text"
          required
          id="country"
          label="Country"
          {...register("country")}
        />
        <TextField
          type="number"
          required
          id="continent"
          label="Continent"
          {...register("continent")}
        />
        <TextField
          type="number"
          required
          id="lat"
          label="Lat"
          {...register("lat")}
        />
        <TextField
          type="number"
          required
          id="lat"
          label="Lng"
          {...register("lng")}
        />
        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {serverErrors}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#e9b384" }}
        >
          Update venue
        </Button>
      </Grid>
    </>
  );
}

export default UpdateVenueForm;
