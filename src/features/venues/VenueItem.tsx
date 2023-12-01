import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import { Box, Button, Grid, Typography, Img } from "@mui/material";

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

interface VenueItemProps {
  venue: VenueItemProp;
  onDelete: () => void;
  onUpdate: () => void;
}

function VenueItem({ venue, onDelete, onUpdate }: VenueItemProps) {
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
        <Img src={venue.media[0]} alt="Venue Image" />
        <NavLink to={`/venues/${venue.id}`}>
          <Typography component="h1" variant="h2">
            {venue.name}
          </Typography>
          <p>Price: {formatCurrency(venue.price)}</p>
        </NavLink>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              Bookings
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {venue.bookings.length > 0
              ? venue.bookings.map((booking) => (
                  <p key={booking.id}>
                    Booked: {formatDate(booking.dateFrom)} -{" "}
                    {formatDate(booking.dateTo)}
                  </p>
                ))
              : "Available. "}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={() => onUpdate()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit venue
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => onDelete()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete venue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default VenueItem;
