import { Grid, Typography, Box } from "@mui/material";
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
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        alignContent={"flex-start"}
        alignItems={"center"}
        px={5}
        sx={{
          marginTop: 5,
        }}
      >
        <NavLink to={`/venues/${id}`}>
          <Box
            component="img"
            src={media[0]}
            alt="Venue image"
            borderRadius={2}
            sx={{
              height: 133,
              width: 133,
              maxHeight: { xs: 167, md: 233 },
              maxWidth: { xs: 250, md: 350 },
            }}
          ></Box>
          <Typography variant="body1" gutterBottom width={600} fontSize={18}>
            {location.country != "Unknown"
              ? location.country
              : booking.venue.name}
          </Typography>
          <Typography variant="body1" gutterBottom width={600} fontSize={18}>
            {location.address}
          </Typography>
          <Typography variant="body1" gutterBottom width={600} fontSize={15}>
            From <b>{formatDate(booking.dateFrom)}</b>
          </Typography>
          <Typography variant="body1" gutterBottom width={600} fontSize={15}>
            To <b>{formatDate(booking.dateTo)}</b>
          </Typography>
        </NavLink>
      </Grid>
    </>
  );
}

export default BookingItem;
