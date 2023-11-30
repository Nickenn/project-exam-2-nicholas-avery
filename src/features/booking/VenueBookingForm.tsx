import styled from "styled-components";

import { Button } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import { format, differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DateRange } from "react-date-range";
import { useState } from "react";

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
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const [dateRange, setDateRange] = useState({
    startDate: selectedDateRange[0].startDate,
    endDate: selectedDateRange[0].endDate,
    key: "selection",
  });
  const form = useForm({
    defaultValues: {
      dateFrom: dateRange.startDate,
      dateTo: dateRange.endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const { register, setValue, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (formData: any) => {
    console.log(formData);

    if (authToken) {
      const data = await createBooking(formData, authToken);

      if (data.errors) {
        setServerErrors(data.errors[0].message);
        toast.error(serverErrors);
        console.log(data.errors[0].message);
      } else {
        toast.success("Your booking has been verified.");
        navigate(`/profiles/${userName}/bookings`);
      }
    } else {
      toast.error("Please log in to book a venue.");
    }
  };

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

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
    setValue("dateFrom", ranges.selection.startDate);
    setValue("dateTo", ranges.selection.endDate);
  };

  return <form></form>;
}

export default VenueBookingForm;
