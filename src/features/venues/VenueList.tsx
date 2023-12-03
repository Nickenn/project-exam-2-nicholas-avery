import { Link } from "react-router-dom";
import image from "../../assets/venue-placeholder.svg";
import styled from "styled-components";

import { Box, Button, Grid, Typography } from "@mui/material";

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

const VenueImage = styled.img`
  width: 28rem;
  height: 20rem;
  object-fit: cover;
  border-radius: 4px;
`;

function Venue({
  id,
  name,
  description,
  media,
  price,
  rating,
  location,
  maxGuests,
}: VenueProps) {
  return (
    <>
      <Box
        bgcolor={"#a1ccd1"}
        sx={{
          marginTop: 8,
          padding: 5,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to={`/venues/${id}`}>
          <Grid item xs={12}>
            <VenueImage
              src={media[0] ? media[0] : image}
              alt={name}
              loading="lazy"
            />
            <Typography component="h1" variant="h4">
              {name}
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom width={600}>
              Rating: {rating}
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom width={600}>
              Maximum number of guests: {maxGuests}
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom width={600}>
              {description}
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom width={600}>
              Location: {location.city}, {location.country}{" "}
            </Typography>
            <Typography component="h1" variant="h5" gutterBottom width={600}>
              {price},- NOK per night
            </Typography>
            <Button variant="contained">Venue details</Button>
          </Grid>
        </Link>
      </Box>
    </>
  );
}

function VenuesList({ venues }: { venues: VenueProps[] }) {
  return (
    <Grid container justifyContent="center" gap={12} spacing={{ xs: 2, md: 3 }}>
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          name={venue.name}
          created={venue.created}
          media={venue.media}
          price={venue.price}
          id={venue.id}
          rating={venue.rating}
          description={venue.description}
          location={venue.location}
          meta={venue.meta}
          owner={venue.owner}
          bookings={venue.bookings}
          maxGuests={venue.maxGuests}
        />
      ))}
    </Grid>
  );
}

export default VenuesList;
