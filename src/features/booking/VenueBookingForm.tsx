import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/bookingApi";
import { format, differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/formatCurrency";

import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

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

function BookingForm({
  venue,
  selectedDateRange,
  onDateRangeChange,
}: VenueProp) {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const form = useForm({
    defaultValues: {
      dateFrom: selectedDateRange[0].startDate,
      dateTo: selectedDateRange[0].endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const bookedDateRanges = venue.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: booking.id,
  }));

  const disabledDates = (date: Date) => {
    return bookedDateRanges.some(
      (bookedDateRange) =>
        (date >= bookedDateRange.startDate &&
          date <= bookedDateRange.endDate) ||
        date === bookedDateRange.startDate ||
        date === bookedDateRange.endDate
    );
  };

  const handleRangeChange = (range: any) => {
    const selectedDateRange = range.selection;
    onDateRangeChange(selectedDateRange);

    setValue("dateFrom", selectedDateRange.startDate);
    setValue("dateTo", selectedDateRange.endDate);
  };

  async function onSubmit(formData: any) {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await createBooking(formData, authToken);

        console.log(data);
      } else {
        navigate(`/auth/login`);
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
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Typography component="h1" variant="h2">
            {serverErrors}
          </Typography>
          <Typography component="h1" variant="h3">
            Venue Booking
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Typography component="h1" variant="h5">
                Ckeck-in
              </Typography>
              <Typography component="h1" variant="h3">
                {format(selectedDateRange[0].startDate, "dd. MM. yyyy")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                Ckeck-out
              </Typography>
              <Typography component="h1" variant="h3">
                {format(selectedDateRange[0].endDate, "dd. MM. yyyy")}
              </Typography>
            </Grid>
          </Grid>

          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={handleRangeChange}
            disabledDay={disabledDates}
            ranges={selectedDateRange}
            preventSnapRefocus={false}
            calendarFocus="backwards"
          />

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
                required
                fullWidth
                id="guests"
                label="Number of guests"
                autoComplete="email"
                {...register("guests")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#e9b384" }}
          >
            Book venue
          </Button>

          <Grid container spacing={2}>
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
          <Grid container spacing={2}>
            <Typography component="h1" variant="h3">
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
      </Box>
    </>
  );
}

export default BookingForm;
