import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getBookings } from "../../services/profileApi";
import BookingItem from "../../features/booking/BookingItem";

import { Box, Button, Grid, Typography } from "@mui/material";

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

function ProfileBookings() {
  const [bookings, setBookings] = useState<BookingProps[]>();
  const [loading, setLoading] = useState(true);
  const { userName, authToken } = useAuth();

  const fetchData = async () => {
    const data = await getBookings(userName, authToken);
    setBookings(data);
    setLoading(false);
  };

  fetchData();

  if (loading || !bookings) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1100,
          alignItems: "center",
        }}
      >
        <Grid
          container
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Typography component="h1" variant="h5">
            My bookings
          </Typography>
          {bookings?.length > 0 ? (
            bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))
          ) : (
            <Typography variant="body2" gutterBottom width={600}>
              You don't have any bookings.
            </Typography>
          )}

          <Typography variant="body2" gutterBottom width={600}>
            Click{" "}
            <NavLink to="/">
              <Button variant="contained">here</Button>
            </NavLink>{" "}
            for help
          </Typography>
        </Grid>
      </Box>
    </>
  );
}

export default ProfileBookings;
