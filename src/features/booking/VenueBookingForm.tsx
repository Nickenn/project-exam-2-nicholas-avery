import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/bookingApi";
import { format, differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

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
}

function VenueBookingForm({ venue, selectedDateRange }: VenueProp) {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const [dateRange, setDateRange] = useState({
    startDate: selectedDateRange[0].startDate,
    endDate: selectedDateRange[0].endDate,
    key: "selection",
  });
  const form = useForm({
    defaultValues: {
      dateFrom: dateRange.startDate,
      dateTo: dateRange.endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: any) => {
    console.log(formData);
    if (authToken) {
      //send data to API
      const data = await createBooking(formData, authToken);

      //handling setver errors
      if (data.errors) {
        setServerErrors(data.errors[0].message);
        toast.error(serverErrors);
        console.log(data.errors[0].message);
      } else {
        toast.success("Your booking was successfull.");
        navigate(`/profiles/${userName}/bookings`);
      }
    } else {
      toast.error("You must be logged in to book a venue.");
    }
  };
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
  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
    setValue("dateFrom", ranges.selection.startDate);
    setValue("dateTo", ranges.selection.endDate);
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
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Typography component="h1" variant="h3">
            Venue Booking
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Typography component="h1" variant="h5">
                Ckeck-in
              </Typography>
              <Typography component="h1" variant="h3">
                {format(dateRange.startDate, "dd. MM. yyyy")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                Ckeck-out
              </Typography>
              <Typography component="h1" variant="h3">
                {format(dateRange.endDate, "dd. MM. yyyy")}
              </Typography>
            </Grid>
          </Grid>
          {isOpen && (
            <DateRange
              disabledDay={disabledDates}
              editableDateInputs={true}
              onChange={handleSelect}
              ranges={[dateRange]}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
            />
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Book venue
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default VenueBookingForm;
