import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { getBookings } from "../../services/profileApi";
import BookingItem from "../../features/booking/BookingItem";
import { NavLink } from "react-router-dom";

import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";

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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !bookings) {
    return (
      <Box
        display={"flex"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"150px"}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        fontWeight={800}
        display={"flex"}
        alignContent={"flex-start"}
        alignItems={"center"}
        marginTop={"50px"}
        px={5}
      >
        Bookings
      </Typography>
      {bookings?.length > 0 ? (
        bookings.map((booking) => (
          <Grid display={"flex"} flexDirection={"column"}>
            <BookingItem key={booking.id} booking={booking} />
          </Grid>
        ))
      ) : (
        <Grid
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={3}
        >
          <Typography component="h1" variant="h6">
            You don't have any bookings.
          </Typography>
          <NavLink to={`/profiles/${userName}`}>
            <Button variant="contained" size="large">
              Go back to profile
            </Button>
          </NavLink>
        </Grid>
      )}
    </>
  );
}

export default ProfileBookings;
