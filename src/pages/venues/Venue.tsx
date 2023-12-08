import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../../services/venuesApi.tsx";

import styled from "styled-components";
import image from "../../assets/venue-placeholder.svg";

import BookingForm from "../../features/booking/VenueBookingForm.tsx";
import DateRangeComp from "../../ui/Calendar/DateRangeComp.tsx";
import PetsIcon from "@mui/icons-material/Pets";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { Box, Grid, Typography } from "@mui/material";

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

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
  }

  img:first-child {
    grid-column: 1/3;
    grid-row: 1/3;
    height: 20rem;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function Venue() {
  const [venue, setVenue] = useState<VenueProps>();
  const [loading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const data = await getVenue(id);
    setIsLoading(false);
    setVenue(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !venue) {
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
          height: 2050,
          alignItems: "center",
        }}
      >
        {venue && (
          <Grid>
            <h1>{venue.name}</h1>
            <Grid container>
              <Grid item>
                <Typography component="h1" variant="h5" margin={1}>
                  Rating: {venue.rating}
                </Typography>
                <Typography variant="body1" gutterBottom width={600}>
                  Superhost: {venue.owner.name}, {venue.location.city},{" "}
                  {venue.location.country.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Box>
              <Grid container spacing={2}>
                <StyledGallery>
                  <Grid item xs={12}>
                    <img
                      src={venue.media[0] ? venue.media[0] : image}
                      alt={venue.name}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={venue.media[1] ? venue.media[1] : image}
                      alt={venue.name}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={venue.media[2] ? venue.media[2] : image}
                      alt={venue.name}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={venue.media[3] ? venue.media[3] : image}
                      alt={venue.name}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={venue.media[4] ? venue.media[4] : image}
                      alt={venue.name}
                    />
                  </Grid>
                </StyledGallery>
              </Grid>
            </Box>
            <hr />
            <Grid container> </Grid>
            <Grid container direction={"column"}>
              <p>{venue.description}</p>
              <p>Number of guests accepted: {venue.maxGuests}</p>
            </Grid>
            <Grid container>
              <Typography component="h1" variant="h5" margin={1}>
                Accommodations
              </Typography>
              <Grid container direction={"row"} spacing={7}>
                <Grid item>
                  <WifiIcon color="primary"></WifiIcon>
                  {venue.meta.wifi ? "WIFI" : "No WIFI"}
                </Grid>
                <Grid item>
                  <DirectionsCarIcon color="primary"></DirectionsCarIcon>
                  {venue.meta.parking ? "Parking" : "No parking"}
                </Grid>
                <Grid item>
                  <FreeBreakfastIcon color="primary"></FreeBreakfastIcon>
                  {venue.meta.breakfast ? "Breakfast" : "No breakfast"}
                </Grid>
                <Grid item>
                  <PetsIcon color="primary"></PetsIcon>
                  {venue.meta.pets ? "Pets allowed" : "No pets"}
                </Grid>
              </Grid>
              <Grid container direction={"column"}>
                <Typography component="h1" variant="h5" margin={1}>
                  Location:
                </Typography>
                <p>Address: {venue.location.address}</p>
                <p>City: {venue.location.city}</p>
                <p>Country: {venue.location.country}</p>
              </Grid>
              <Grid container direction={"column"}>
                <Typography component="h1" variant="h5" margin={1}>
                  Host: {venue.owner.name}
                </Typography>
                <p>Email: {venue.owner.email}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="h1" variant="h5" margin={1}>
                  Available dates
                </Typography>
                <DateRangeComp />
              </Grid>
            </Grid>
            <BookingForm
              venue={venue}
              selectedDateRange={selectedDateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Venue;
