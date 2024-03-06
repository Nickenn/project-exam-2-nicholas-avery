import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/bookingApi";
import { format, differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/formatCurrency";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Button from "../../ui/Button";
import { StyledErrorMessage } from "../authentication/Register";
import { Typography } from "@mui/material";
import Input, { StyledDateInput } from "../../ui/Input";
import FlexContainer from "../../ui/FlexContainer";
import { GridColsTwo } from "../../ui/Grid";
import { DateRange } from "react-date-range";

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

interface VenueProp {
  venue: VenueProps;
  selectedDateRange: DateRangeProps[];
  onDateRangeChange: (newDateRange: DateRangeProps) => void;
}

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  padding: 4rem;
  margin: 3rem 0 3rem auto;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 20rem;

  p {
    text-align: center;
  }

  & FlexContainer {
    justify-content: space-between;
  }

  @media only screen and (max-width: 1100px) {
    width: 100%;
    margin: 3rem auto;
  }
`;

function BookingForm({ venue, selectedDateRange }: VenueProp) {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const form = useForm({
    defaultValues: {
      dateFrom: selectedDateRange[0].startDate,
      dateTo: selectedDateRange[0].endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const bookedDateRanges = venue.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: booking.id,
  }));

  const disabledDates = (date: Date) => {
    return bookedDateRanges.some(
      (bookedDateRange) =>
        (date >= bookedDateRange.startDate &&
          date <= bookedDateRange.endDate) ||
        date === bookedDateRange.startDate ||
        date === bookedDateRange.endDate
    );
  };

  const handleRangeChange = (range: any) => {
    const selectedDateRange = range.selection;
    handleRangeChange(selectedDateRange);

    setValue("dateFrom", selectedDateRange.startDate);
    setValue("dateTo", selectedDateRange.endDate);
  };

  const onSubmit = async (formData: any) => {
    try {
      if (authToken) {
        setServerErrors("");
        //send data to API
        const data = await createBooking(formData, authToken);
        console.log(data);
      } else {
        navigate(`/profiles/${userName}/bookings`);
      }
    } catch (error) {
      let errorMessage = "Please log in to book a venue.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerErrors(errorMessage);
    }
  };

  return (
    <StyledBookingForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography component="h1" variant="h4">
        {formatCurrency(venue.price)} / night
      </Typography>

      <GridColsTwo>
        <StyledDateInput onClick={() => setIsOpen(!isOpen)}>
          <label>Check-in</label>
          <p>{format(selectedDateRange[0].startDate, "dd. MM. yyyy")} </p>
        </StyledDateInput>
        <StyledDateInput>
          <label>Check-out</label>
          <p>{format(selectedDateRange[0].endDate, "dd. MM. yyyy")}</p>
        </StyledDateInput>
      </GridColsTwo>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={handleRangeChange}
          disabledDay={disabledDates}
          ranges={selectedDateRange}
          preventSnapRefocus={false}
          calendarFocus="backwards"
        />
      )}

      <Input
        label="Number of guests"
        id="guests"
        type="number"
        register={register}
        error={errors.guests?.message}
        required={{ value: true, message: "Number of guests is required" }}
      />
      {serverErrors && <StyledErrorMessage>{serverErrors}</StyledErrorMessage>}
      <Button variation="secondary" type="submit">
        Reserve
      </Button>

      <p>You won't be charged yet</p>

      <hr />
      <FlexContainer>
        <p>
          {
            +differenceInDays(
              selectedDateRange[0].endDate,
              selectedDateRange[0].startDate
            )
          }{" "}
          night X {formatCurrency(venue.price)}{" "}
        </p>
        <p>
          {formatCurrency(
            +differenceInDays(
              selectedDateRange[0].endDate,
              selectedDateRange[0].startDate
            ) * venue.price
          )}
        </p>
      </FlexContainer>
      <FlexContainer>
        <p>Cleaning fee</p>
        <p>NOK 250.00</p>
      </FlexContainer>
      <FlexContainer>
        <p>Rental fee</p>
        <p>NOK 150.00 </p>
      </FlexContainer>
      <FlexContainer>
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
          Your total:
        </Typography>
        <p>
          <b>
            {" "}
            {formatCurrency(
              +differenceInDays(
                selectedDateRange[0].endDate,
                selectedDateRange[0].startDate
              ) *
                venue.price +
                100 +
                50
            )}
          </b>
        </p>
      </FlexContainer>
    </StyledBookingForm>
  );
}

export default BookingForm;
