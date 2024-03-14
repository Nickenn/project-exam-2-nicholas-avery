import { useState } from "react";
import { useForm } from "react-hook-form";
import { createVenue } from "../../services/venuesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  Button,
  Checkbox,
  Box,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Please enter the venue title."),
    description: yup.string().required("Please enter a description."),
    media: yup.string(),
    price: yup.number().required("Please enter a valid price."),
    maxGuests: yup.number().required("Please enter a valid number."),
    rating: yup.number().required("Please enter a valid number."),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    address: yup.string().required("Please enter a valid address."),
    city: yup.string().required("Please enter a valid city."),
    zip: yup.string().required("Please enter a valid zip code."),
    country: yup.string().required("Please enter a valid country."),
    continent: yup.string().required("Please enter a valid continent."),
    lat: yup.number(),
    lng: yup.number(),
  })
  .required();

interface FormDataProps {
  name: string;
  description: string;
  media?: string;
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
  lat?: number;
  lng?: number;
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
      media: "",
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

  async function onSubmit(formData: FormDataProps) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await createVenue(formData, authToken);

        navigate(`/venues/${data.id}`);
      }
    } catch (error) {
      let errorMessage = "Listing failed.";

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
          height: 1300,
          maxWidth: "30%",
          alignItems: "center",
          marginBottom: "200px",
        }}
      >
        <Typography component="h1" variant="h3">
          {serverErrors}
        </Typography>
        <Typography component="h1" variant="h5">
          Create new venue
        </Typography>

        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.name?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="name"
          label="Venue title"
          {...register("name")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.description?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="description"
          label="Description"
          {...register("description")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.media?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="media"
          label="Image(url)"
          {...register("media")}
        />

        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.price?.message}
        </Typography>
        <TextField
          type="number"
          required
          fullWidth
          size="small"
          id="price"
          label="Price"
          {...register("price")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.maxGuests?.message}
        </Typography>
        <TextField
          type="number"
          required
          fullWidth
          size="small"
          min={1}
          id="maxGuests"
          label="Maximum guests*"
          {...register("maxGuests")}
        />

        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.rating?.message}
        </Typography>
        <TextField
          type="number"
          required
          fullWidth
          size="small"
          id="rating"
          label="Rating"
          {...register("rating")}
        />
        <Typography component="h1" variant="h6">
          Services:
        </Typography>
        <Grid container display={"flex"} flexDirection={"row"}>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              width={600}
              color={"#d32f2f"}
              fontSize={18}
            >
              {errors.wifi?.message}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              WiFi
              <Checkbox id="wifi" {...register("wifi")} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              width={600}
              color={"#d32f2f"}
              fontSize={18}
            >
              {errors.parking?.message}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Parking
              <Checkbox id="parking" {...register("parking")} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              width={600}
              color={"#d32f2f"}
              fontSize={18}
            >
              {errors.breakfast?.message}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Breakfast
              <Checkbox id="breakfast" {...register("breakfast")} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              width={600}
              color={"#d32f2f"}
              fontSize={18}
            >
              {errors.pets?.message}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Pets
              <Checkbox id="pets" {...register("pets")} />
            </Typography>
          </Grid>
        </Grid>
        <Typography component="h1" variant="h6">
          Location:
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.address?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="address"
          label="Address"
          {...register("address")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.city?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="city"
          label="City"
          {...register("city")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.zip?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="zip"
          label="Zip code"
          {...register("zip")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.country?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="country"
          label="Country"
          {...register("country")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.continent?.message}
        </Typography>
        <TextField
          type="text"
          required
          fullWidth
          size="small"
          id="continent"
          label="Continent"
          {...register("continent")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.lat?.message}
        </Typography>
        <TextField
          type="number"
          required
          fullWidth
          size="small"
          id="lat"
          label="Lat"
          {...register("lat")}
        />
        <Typography
          variant="body2"
          gutterBottom
          width={600}
          color={"#d32f2f"}
          fontSize={18}
        >
          {errors.lng?.message}
        </Typography>
        <TextField
          type="number"
          required
          fullWidth
          size="small"
          id="lng"
          label="Lng"
          {...register("lng")}
        />
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          List venue
        </Button>
      </Box>
    </>
  );
}

export default CreateVenueForm;
