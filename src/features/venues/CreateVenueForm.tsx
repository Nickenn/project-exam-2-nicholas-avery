import { useState } from "react";
import { useForm } from "react-hook-form";
import { createVenue } from "../../services/venuesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Button, Checkbox, Box, TextField, Typography } from "@mui/material";

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
  const { authToken, userName } = useAuth();
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
        console.log(data);

        navigate(`/profiles/${userName}/venues`);
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
          height: 1000,
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
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
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
        </Box>
        <Typography component="h1" variant="h6">
          Services:
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          alignContent={"center"}
          maxWidth={"90%"}
        >
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
          >
            {errors.wifi?.message}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            WiFi
            <Checkbox id="wifi" {...register("wifi")} />
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
          >
            {errors.parking?.message}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            Parking
            <Checkbox id="parking" {...register("parking")} />
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
          >
            {errors.breakfast?.message}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            Breakfast
            <Checkbox id="breakfast" {...register("breakfast")} />
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
          >
            {errors.pets?.message}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            Pets
            <Checkbox id="pets" {...register("pets")} />
          </Typography>
        </Box>
        <Typography component="h1" variant="h6">
          Location:
        </Typography>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>

        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Box maxWidth={"90%"}>
          <Typography
            variant="body2"
            gutterBottom
            width={600}
            color={"#d32f2f"}
            fontSize={14}
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
        </Box>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          List venue
        </Button>
      </Box>
    </>
  );
}

export default CreateVenueForm;
