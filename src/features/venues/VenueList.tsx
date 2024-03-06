import { Link } from "react-router-dom";
import image from "../../assets/venue-placeholder.svg";
import styled from "styled-components";

import { Grid, Typography } from "@mui/material";
import Button from "../../ui/Button.tsx";

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
  width: 20rem;
  height: 16rem;
  object-fit: cover;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

function Venue({ id, name, media, price, rating, maxGuests }: VenueProps) {
  return (
    <Grid item padding={1}>
      <Link to={`/venues/${id}`}>
        <VenueImage src={media[0] ? media[0] : image} alt={name} />
        <Typography component="h1" variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom width={600}>
          Rating: {rating}
        </Typography>
        <Typography variant="body2" gutterBottom width={600}>
          Guest limit: {maxGuests}
        </Typography>
        <Typography variant="body2" gutterBottom width={600}>
          {price},- NOK per night
        </Typography>
        <Button variation="primary">Venue details</Button>
      </Link>
    </Grid>
  );
}

function VenuesList({ venues }: { venues: VenueProps[] }) {
  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(26rem, 1fr))"
      margin={20}
    >
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
