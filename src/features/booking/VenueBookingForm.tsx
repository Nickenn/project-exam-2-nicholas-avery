import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/bookingApi";
import { differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/formatCurrency";

import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import DateRangeComp from "../../ui/Calendar/DateRangeComp";

interface VenueProps {
  key: string;
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests?: number;
  rating: number;
  created: string;
  updated?: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    lat: number;
    lng: number;
  };
  owner: {
    name: string;
    email: string;
    avatar: string;
  };
  bookings: [
    {
      id: string;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
    }
  ];
}

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface VenueProp {
  venue: VenueProps;
  selectedDateRange: DateRangeProps[];
  onDateRangeChange: (newDateRange: DateRangeProps) => void;
}

function BookingForm({ venue, selectedDateRange }: VenueProp) {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const form = useForm({
    defaultValues: {
      dateFrom: selectedDateRange[0].startDate,
      dateTo: selectedDateRange[0].endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: any) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await createBooking(formData, authToken);
        console.log(data);
      } else {
        navigate(`/profiles/${userName}/bookings`);
      }
    } catch (error) {
      let errorMessage = "Please log in to book a venue.";

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
        alignContent={"center"}
        margin={3}
        sx={{
          mt: 3,
          height: 1650,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          {serverErrors}
        </Typography>
        <Typography component="h1" variant="h5">
          Booking
        </Typography>
        <Grid container spacing={2} marginLeft={4}>
          <Grid item>
            <Typography component="h1" variant="h6">
              Ckeck-in
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h6">
              Ckeck-out
            </Typography>
          </Grid>
        </Grid>

        <DateRangeComp />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              gutterBottom
              width={600}
              color={"#d32f2f"}
            >
              {errors.guests?.message}
            </Typography>
            <TextField
              size="small"
              required
              id="guests"
              label="Number of guests"
              {...register("guests")}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#e9b384" }}
        >
          Book venue
        </Button>

        <Grid container gap={2}>
          <Typography variant="body2" gutterBottom width={600}>
            {
              +differenceInDays(
                selectedDateRange[0].endDate,
                selectedDateRange[0].startDate
              )
            }{" "}
            pr night X {formatCurrency(venue.price)}{" "}
          </Typography>
          <Typography variant="body2" gutterBottom width={600}>
            {formatCurrency(
              +differenceInDays(
                selectedDateRange[0].endDate,
                selectedDateRange[0].startDate
              ) * venue.price
            )}
          </Typography>
        </Grid>
        <Grid container gap={3}>
          <Typography variant="h4" component={"h1"}>
            Your total:
          </Typography>
          <Typography variant="body2" gutterBottom width={600}>
            {" "}
            {formatCurrency(
              +differenceInDays(
                selectedDateRange[0].endDate,
                selectedDateRange[0].startDate
              ) *
                venue.price +
                100 +
                50
            )}
          </Typography>
        </Grid>
      </Box>
    </>
  );
}

export default BookingForm;
