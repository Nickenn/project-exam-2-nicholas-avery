import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { getVenues } from "../../services/venuesApi";
import VenueItem from "../../features/venues/VenueItem";
import { deleteVenue } from "../../services/venuesApi";

import { Box, Grid, Typography } from "@mui/material";

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

  const [serverErrors, setServerErrors] = useState("");

  async function fetchData() {
    try {
      const data = await getVenues(userName, authToken);
      setVenues(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      let errorMessage = "Failed at getting venues.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  }

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
        {loading && <SkeletonVenuesPage />}
        {venues && (
          <Box>
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
              <Typography component="h1" variant="h4">
                You don't have any venues listed.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default ProfileVenues;
