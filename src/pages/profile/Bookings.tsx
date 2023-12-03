import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getBookings } from "../../services/profileApi";
import BookingItem from "../../features/booking/BookingItem";

import { Box, Button, Grid, Typography, red } from "@mui/material";

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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item>
            <Typography component="h1" variant="h4">
              My bookings
            </Typography>
          </Grid>
        </Grid>
        {bookings && (
          <Grid container>
            <Grid item>
              {bookings?.length > 0 ? (
                bookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))
              ) : (
                <p>You don't have any bookings.</p>
              )}
            </Grid>
            <Grid container>
              <Grid item>
                <Typography variant="body2" gutterBottom width={600}>
                  Click{" "}
                  <NavLink to="/">
                    <Button variant="contained">here</Button>
                  </NavLink>{" "}
                  for help
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ProfileBookings;
