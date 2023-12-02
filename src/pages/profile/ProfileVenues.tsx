import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

interface VenueItemProp {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: true;
    parking: true;
    breakfast: true;
    pets: true;
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

function ProfileVenues() {
  const [venues, setVenues] = useState<VenueItemProp[]>();
  const [loading, setLoading] = useState(true);
  const { userName, authToken } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getVenues(userName, authToken);
    setVenues(data);
    setLoading(false);
  };

  const handleDeleteVenue = async (venueId: string) => {
    await deleteVenue(venueId, authToken);
    alert("Venue successfully deleted.");
  };

  const handleUpdatedVenue = (venue: VenueItemProp) => {
    navigate(`/venues/update`, { state: venue });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [venues]);

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
        <Typography component="h1" variant="h2">
          Listed venues
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {venues?.length > 0 ? (
              venues?.map((venue) => {

              })

            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
