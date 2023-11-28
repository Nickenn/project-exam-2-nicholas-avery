import styled from "styled-components";

import { Button } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import { format, differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
    const form = useForm({
      defaultValues: {
        dateFrom: format(selectedDateRange[0].startDate, "MM/dd/yyyy"),
        dateTo: format(selectedDateRange[0].endDate, "MM/dd/yyyy"),
        guests: 1,
        venueId: venue.id,
      },
    }),

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [serverErrors, setServerErrors] = useState("");

    const onSubmit = async (formData: FormDataProps) => {
      if (authToken) {
        const data = await bookVenue(formData, authToken);

        if (data.errors) {
          setServerErrors(data.errors[0].message);
          toast.error(serverErrors);
          console.log(data.errors[0].message);
        } else {
          toast.success("Thank you. Your booking has been verified.");
          navigate(`/profiles/${userName}`);
        }
      } else {
        toast.error("You must be logged in to book a venue.")
      }
    };

    return (
      
    )


  }

export default VenueBookingForm;
