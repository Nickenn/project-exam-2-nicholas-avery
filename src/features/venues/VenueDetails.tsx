import styled from "styled-components";
import { GridColsTwo } from "../../ui/Grid";
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Typography } from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FlightIcon from "@mui/icons-material/Flight";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

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

interface VenueProp {
  venue: VenueProps;
}

const StyledOffersContainer = styled.div`
  margin: 3rem 0;
`;

const StyledOffers = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 2rem;
  & svg {
    color: var(--color-brand-50);
    font-size: 2rem;
  }
`;
const StyledDetails = styled.div`
  margin: 0 0 3rem 0;
`;

const StyledHostInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 3rem 0;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 100%;
  }
`;
const StyledService = styled.div`
  margin: 3rem 0;

  & button {
    margin-top: 2rem;
  }
`;

const StyledDescription = styled.div`
  margin: 3rem 0;
`;

function Details({ venue }: VenueProp) {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <StyledDetails>
        <p>
          <PersonIcon />
          {venue.maxGuests} guests
        </p>
        <div>
          <StarIcon />
          {venue.rating} reviews
        </div>
      </StyledDetails>
      <hr />
      <StyledHostInfo>
        <img
          src={
            venue.owner.avatar
              ? venue.owner.avatar
              : "/src/assets/placeholder.jpg"
          }
          alt="Profile avatar"
        />
        {isAuthenticated ? (
          <NavLink to={`/profiles/${venue.owner.name}`}>
            <Typography component="h1" variant="h4">
              Hosted By {venue.owner.name}
            </Typography>
            <p>Email: {venue.owner.email}</p>
          </NavLink>
        ) : (
          <div>
            <Typography component="h1" variant="h4">
              Hosted By {venue.owner.name}
            </Typography>
            <p>Email: {venue.owner.email}</p>
          </div>
        )}
      </StyledHostInfo>
      <hr />
      <StyledOffersContainer>
        <Typography component="h1" variant="h5">
          Venue offerings:
        </Typography>
        <GridColsTwo>
          <StyledOffers>
            <WifiIcon />
            {venue.meta.wifi === true ? "WiFi" : "No WiFi"}
          </StyledOffers>
          <StyledOffers>
            <DirectionsCarIcon />
            {venue.meta.parking === true ? "Parking" : "No Parking"}
          </StyledOffers>
          <StyledOffers>
            <FreeBreakfastIcon />
            {venue.meta.breakfast === true ? "Breakfast" : "No breakfast"}
          </StyledOffers>
          <StyledOffers>
            <PetsIcon />
            {venue.meta.pets === true ? "Pets" : "No pets"}
          </StyledOffers>
        </GridColsTwo>
      </StyledOffersContainer>
      <hr />
      <StyledDescription>
        <Typography component="h1" variant="h6">
          About this venue:
        </Typography>
        <p>{venue.description}</p>
      </StyledDescription>
      <StyledService>
        <Typography component="h1" variant="h6">
          Service add-ons:
        </Typography>
        <p>Please contact support to arrange for any service add-ons.</p>
        <GridColsTwo>
          <StyledOffers>
            <FlightIcon />
            Airport transport
          </StyledOffers>
          <StyledOffers>
            <ShoppingBasketIcon />
            Grocery service
          </StyledOffers>
        </GridColsTwo>
        <p>
          For any other services please contact support and we will do our best
          to accommodate to your needs.
        </p>
        <Button variation="outline">Contact venue support</Button>
      </StyledService>
    </div>
  );
}

export default Details;
