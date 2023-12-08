import { useState } from "react";
import { useForm } from "react-hook-form";
import { createVenue } from "../../services/venuesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
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
}

export function CreateVenueForm() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const form = useForm<FormDataProps>({
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
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await createVenue(formData, authToken);

        navigate(`/venues/${data.id}`);
        console.log(data);
      }
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
      <Grid
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        container
        gap={2}
        marginBottom={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          {serverErrors}
        </Typography>
        <Typography component="h1" variant="h5">
          Create new venue
        </Typography>

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.name?.message}
        </Typography>
        <TextField
          type="text"
          required
          id="name"
          label="Venue title"
          {...register("name")}
        />
        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.description?.message}
        </Typography>
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

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.price?.message}
        </Typography>
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
          {...register("maxGuests")}
        />

        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.rating?.message}
        </Typography>
        <TextField
          type="number"
          required
          id="rating"
          label="Rating"
          {...register("rating")}
        />
        <Typography component="h1" variant="h6">
          Services:
        </Typography>

        <Typography variant="button" display="block" gutterBottom>
          WiFi
          <Checkbox id="wifi" {...register("wifi")} />
        </Typography>

        <Typography variant="button" display="block" gutterBottom>
          Parking
          <Checkbox id="parking" {...register("parking")} />
        </Typography>

        <Typography variant="button" display="block" gutterBottom>
          Breakfast
          <Checkbox id="breakfast" {...register("breakfast")} />
        </Typography>

        <Typography variant="button" display="block" gutterBottom>
          Pets
          <Checkbox id="pets" {...register("pets")} />
        </Typography>

        <Typography component="h1" variant="h6">
          Location:
        </Typography>
        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.address?.message}
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
        <Typography variant="body2" gutterBottom width={600} color={"#d32f2f"}>
          {errors.country?.message}
        </Typography>
        <TextField
          type="text"
          required
          id="country"
          label="Country"
          {...register("country")}
        />
        <TextField
          type="text"
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
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          List venue
        </Button>
      </Grid>
    </>
  );
}

export default CreateVenueForm;
