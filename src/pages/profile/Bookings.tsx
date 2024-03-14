import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { getBookings } from "../../services/profileApi";
import BookingItem from "../../features/booking/BookingItem";

import { Box, Button, Grid, Typography, Link } from "@mui/material";

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box margin={"auto"}>
        <Typography component="h1" variant="h3" fontWeight={800}>
          Bookings
        </Typography>
      </Box>
      <Box
        gap={1}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
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
            <Link href={`/profiles/${userName}`}>
              <Button variant="contained" size="large">
                Go back to profile
              </Button>
            </Link>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ProfileBookings;
