import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../../services/venuesApi.tsx";

import styled from "styled-components";
import Details from "../../features/venues/VenueDetails.tsx";

import { addDays } from "date-fns";
import { AiOutlineHeart } from "react-icons/ai";
import { LuShare } from "react-icons/lu";
import BookingForm from "../../features/booking/VenueBookingForm.tsx";
import BookingDateRangePicker from "../../ui/Calendar/DateRangePicker.tsx";
import Container from "../../ui/Container.tsx";
import { Box, Typography } from "@mui/material";
import Button from "../../ui/Button.tsx";
import Gallery from "../../ui/Gallery.tsx";
import { GridColsTwo } from "../../ui/Grid.tsx";
import Page from "../../ui/Page.tsx";

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

const StyledVenuePage = styled(Page)`
& .align-left {
  justify-content: end;

  @media only screen and (max-width: 900px) {
    text-align: end;
  }`;

const GridItem = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const StyledGridColsTwo = styled(GridColsTwo)`
  align-items: start;
  gap: 3rem;

  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const StyledDates = styled.div`
  margin: 3rem 0;
  & h3 {
    margin-bottom: 2rem;
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
    <StyledVenuePage>
      <Container>
        {loading}
        {venue && (
          <div>
            <Typography component="h1" variant="h3">
              {venue.name}
            </Typography>
            <GridColsTwo>
              <GridItem>
                <div>
                  Superhost: {venue.owner.name}, {venue.location.city},
                  {venue.location.country.toUpperCase()}
                </div>
              </GridItem>
              <GridItem className="align-left">
                <div>
                  <LuShare />
                  <Button variation="default">Share</Button>
                </div>
                <div>
                  <AiOutlineHeart />
                  <Button variation="default">Save</Button>
                </div>
              </GridItem>
            </GridColsTwo>
            <Gallery venue={venue} />
            <StyledGridColsTwo>
              <div>
                <Details venue={venue} />
                <StyledDates>
                  <Typography component="h1" variant="h3">
                    Available dates
                  </Typography>
                  <BookingDateRangePicker
                    bookings={venue.bookings}
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={handleDateRangeChange}
                  />
                </StyledDates>
              </div>
              <BookingForm
                venue={venue}
                selectedDateRange={selectedDateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </StyledGridColsTwo>
            <hr />
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}

export default Venue;
