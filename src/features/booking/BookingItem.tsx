import { NavLink } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";

import { Box, Button, Grid, Link, Typography } from "@mui/material";

interface BookingProps {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    description: string;
    media: [string];
    price: number;
    maxGuests: number;
    created: string;
    updated: string;
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
      continent: string;
      lat: number;
      lng: number;
    };
  };
}

interface BookingItemProps {
  booking: BookingProps;
}

function BookingItem({ booking }: BookingItemProps) {
  const { media, location, id } = booking.venue;

  return (
    <>
      <Box
        key={booking.id}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
          margin: 20,
        }}
      >
        <Grid container justifyContent="center">
          <Typography component="h1" variant="h2">
            {location.country != "Unknown"
              ? location.country
              : booking.venue.name}
          </Typography>
          <Grid item></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BookingItem;