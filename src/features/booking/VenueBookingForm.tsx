import styled from "styled-components";

import { Button } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import { format, differenceInDays } from "date-fns";

interface VenueProps {
  key: string;
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
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

interface VenueProp {
  venue: VenueProps;
  selectedDateRange: DateRangeProps[];
}

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

function VenueBookingForm({ venue, selectedDateRange }: VenueProp) {
  return (
    <div>
      <h2>{venue.price} NOK pr night</h2>
      <label htmlFor="checkin">Check in</label>
      <input
        type="text"
        placeholder={`${format(
          new Date(selectedDateRange[0].startDate),
          "dd.mm.yyyy"
        )}`}
        disabled
      />

      <label>Check out</label>
      <input
        type="text"
        placeholder={`${format(
          new Date(selectedDateRange[0].endDate),
          "dd.mm.yyyy"
        )}`}
        disabled
      />

      <label>Number of guests:</label>
      <input type="number" max={venue.maxGuests} min="1" placeholder="1" />

      <Button>Book venue</Button>

      <h3>
        Total{" "}
        {formatCurrency(
          differenceInDays(
            selectedDateRange[0].endDate,
            selectedDateRange[0].startDate
          ) * venue.price
        )}{" "}
        pr night
      </h3>
    </div>
  );
}

export default VenueBookingForm;
