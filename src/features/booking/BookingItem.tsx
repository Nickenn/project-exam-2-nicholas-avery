import { Grid, Typography, Box, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

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

interface BookingItemProps {
  booking: BookingProps;
}

function BookingItem({ booking }: BookingItemProps) {
  const { location, media, id } = booking.venue;

  return (
    <>
      <Grid
        key={booking.id}
        container
        justifyContent="center"
        display={"flex"}
        flexDirection={"row"}
        gap={5}
        alignContent={"center"}
        alignItems={"center"}
        sx={{
          marginTop: 8,
          display: "flex",
          height: 1050,
          alignItems: "center",
        }}
      >
        <NavLink to={`/venues/${id}`}>
          <Box
            component="img"
            src={media[0]}
            alt="Venue image"
            borderRadius={1}
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
          ></Box>
          <Typography variant="body1" gutterBottom width={600}>
            {location.country != "Unknown"
              ? location.country
              : booking.venue.name}
          </Typography>
          <Typography variant="body1" gutterBottom width={600}>
            {location.address}
          </Typography>
          <Typography variant="body1" gutterBottom width={600}>
            From <b>{formatDate(booking.dateFrom)}</b>
          </Typography>
          <Typography variant="body1" gutterBottom width={600}>
            To <b>{formatDate(booking.dateTo)}</b>
          </Typography>
        </NavLink>
      </Grid>
    </>
  );
}

export default BookingItem;
