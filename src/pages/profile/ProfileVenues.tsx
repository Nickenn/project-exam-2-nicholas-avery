import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { getVenues } from "../../services/profileApi";
import VenueItem from "../../features/venues/VenueItem";
import { deleteVenue } from "../../services/venuesApi";

import { Box, Typography, Grid, Button, Link } from "@mui/material";

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
  const [serverErrors, setServerErrors] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const data = await getVenues(userName, authToken);

      setVenues(data);
      setLoading(false);
      console.log(venues);
      console.log(data);
    } catch (error) {
      let errorMessage = "Failed at getting venues.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteVenue = (venueId: string) => {
    deleteVenue(venueId, authToken);
    fetchData();
  };

  const handleUpdatedVenue = (venue: VenueItemProp) => {
    navigate(`/venues/update`, { state: venue });
  };

  if (loading || !venues) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <Box
        sx={{
          marginTop: 30,
          height: 1050,
        }}
      >
        <Typography component="h1" variant="h3">
          {serverErrors}
        </Typography>
        <Grid
          container
          gap={5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography component="h1" variant="h4">
            Listed venues
          </Typography>
          {venues?.length > 0 ? (
            venues.map((venue) => (
              <VenueItem
                key={venue.id}
                venue={venue}
                onDelete={() => handleDeleteVenue(venue.id)}
                onUpdate={() => handleUpdatedVenue(venue)}
              />
            ))
          ) : (
            <Grid
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
            >
              <Typography component="h1" variant="h6">
                You don't have any venues listed.
              </Typography>
              <Link href={`/profiles/${userName}`}>
                <Button variant="contained" size="large">
                  Go back to profile
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default ProfileVenues;
