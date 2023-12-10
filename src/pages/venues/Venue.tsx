import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../../services/venuesApi.tsx";

import styled from "styled-components";
import image from "../../assets/venue-placeholder.svg";

import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import BookingForm from "../../features/booking/VenueBookingForm.tsx";
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

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface CustomDateRange extends DateRangeProps {}

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
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeProps[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const fetchData = async () => {
    const data = await getVenue(id);
    setIsLoading(false);
    setVenue(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateRangeChange = (newDateRange: CustomDateRange) => {
    setSelectedDateRange([newDateRange]);
    console.log("Selected Date Range:", newDateRange);
  };

  if (loading || !venue) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        Loading...
      </Box>
    );
  }

  return (
    <>
      {" "}
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
        flexDirection={"column"}
        position={"relative"}
        sx={{
          maxWidth: { xs: 650, md: 500 },
        }}
      >
        {venue && (
          <Grid
            container
            display={"flex"}
            alignContent={"space-between"}
            flexDirection={"column"}
            position={"relative"}
            sx={{
              maxWidth: { xs: 650, md: 500 },
            }}
          >
            <h1>{venue.name}</h1>

            <Typography component="h1" variant="h5" margin={1}>
              Rating: {venue.rating}
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              Superhost: {venue.owner.name}, {venue.location.city},{" "}
              {venue.location.country.toUpperCase()}
            </Typography>
            <StyledGallery>
              <Box
                component="img"
                src={venue.media[0] ? venue.media[0] : image}
                alt={venue.name}
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />

              <Box
                component="img"
                src={venue.media[1] ? venue.media[1] : image}
                alt={venue.name}
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
              <Box
                component="img"
                src={venue.media[2] ? venue.media[2] : image}
                alt={venue.name}
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
              <Box
                component="img"
                src={venue.media[3] ? venue.media[3] : image}
                alt={venue.name}
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
              <Box
                component="img"
                src={venue.media[4] ? venue.media[4] : image}
                alt={venue.name}
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
            </StyledGallery>
            <hr />
            <Typography component="h1" variant="h5" margin={1}>
              {venue.description}
            </Typography>
            <Typography component="h1" variant="h5" margin={1}>
              Number of guests accepted: {venue.maxGuests}
            </Typography>
            <Typography component="h1" variant="h5" margin={1}>
              Accommodations
            </Typography>

            <WifiIcon color="primary"></WifiIcon>
            {venue.meta.wifi ? "WIFI" : "No WIFI"}

            <DirectionsCarIcon color="primary"></DirectionsCarIcon>
            {venue.meta.parking ? "Parking" : "No parking"}
            <FreeBreakfastIcon color="primary"></FreeBreakfastIcon>
            {venue.meta.breakfast ? "Breakfast" : "No breakfast"}
            <PetsIcon color="primary"></PetsIcon>
            {venue.meta.pets ? "Pets allowed" : "No pets"}
            <Typography component="h1" variant="h5" margin={1}>
              Location:
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              Address: {venue.location.address}
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              City: {venue.location.city}
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              Country: {venue.location.country}
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              Host: {venue.owner.name}
            </Typography>
            <Typography variant="body1" gutterBottom width={600}>
              Email: {venue.owner.email}
            </Typography>
            <BookingForm
              venue={venue}
              selectedDateRange={selectedDateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Venue;
