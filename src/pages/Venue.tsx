import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleVenue } from "../services/venuesApi.tsx";
import image from "../assets/venue-placeholder.svg";
import styled from "styled-components";
import Container from "../ui/Container.tsx";
import Button from "../ui/Button.tsx";
import { GridColsTwo } from "../ui/Grid.tsx";

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

const StyledVenueDetails = styled.div``;

const StyledVenuePage = styled.main`
padding: 12rem 0;

h1 {
  text-align: start;
}

img {
  width: 60%;
  height: 30rem;
  object-fit: cover;
}
& .align-left {
  justify-content: end;

  @media only screen and (max-width: 900px) {
    text-align: end;
  }
`;

const GridItem = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const StyledGridColsTwo = styled(GridColsTwo)`
  align-items: start;
  gap: 2rem;
`;

const StyledHost = styled.div``;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
  }

  img:first-child {
    grid-column: 1/3;
    grid-row: 1/3;
    height: 31rem;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledMetaDetails = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  & svg {
    font-size: 2rem;
  }
`;

const StyledMetaDetailsContainer = styled.div`
  margin: 3rem 0;
`;

function Venue() {
  const [venue, setVenue] = useState<VenueProps>();
  const [loading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const data = await getSingleVenue(id);
    setIsLoading(false);
    setVenue(data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <StyledVenuePage>
      <Container>
        {venue && (
          <div>
            <h1>{venue.name}</h1>
            <GridColsTwo>
              <GridItem>
                <div>Reviews:{venue.rating}</div>
                <div>
                  Superhost: {venue.owner.name}, {venue.location.city},{" "}
                  {venue.location.country.toUpperCase()}
                </div>
              </GridItem>
            </GridColsTwo>
            <ImageGallery>
              <img src={venue.media[0]} alt={venue.name} />
              <img
                src={venue.media[1] ? venue.media[1] : image}
                alt={venue.name}
              />
              <img
                src={venue.media[2] ? venue.media[2] : image}
                alt={venue.name}
              />
              <img
                src={venue.media[3] ? venue.media[3] : image}
                alt={venue.name}
              />
              <img
                src={venue.media[4] ? venue.media[4] : image}
                alt={venue.name}
              />
            </ImageGallery>
            <StyledGridColsTwo>
              <div>
                <p>{venue.description}</p>
                <p>Max number of guests: {venue.maxGuests}</p>
              </div>
              <StyledMetaDetailsContainer>
                <h3>Accommodations</h3>
                <GridColsTwo>
                  <StyledMetaDetails>
                    {venue.meta.wifi ? "WIFI" : "No WIFI"}
                  </StyledMetaDetails>
                  <StyledMetaDetails>
                    {venue.meta.parking ? "Parking" : "No parking"}
                  </StyledMetaDetails>
                  <StyledMetaDetails>
                    {venue.meta.breakfast ? "Breakfast" : "No breakfast"}
                  </StyledMetaDetails>
                  <StyledMetaDetails>
                    {venue.meta.pets ? "Pets allowed" : "No pets allowed"}
                  </StyledMetaDetails>
                </GridColsTwo>
              </StyledMetaDetailsContainer>
              <div>
                <h3>Location:</h3>
                <p>Adress: {venue.location.address}</p>
                <p>City: {venue.location.city}</p>
                <p>Country: {venue.location.country}</p>
              </div>
            </StyledGridColsTwo>
            <div>
              <img src={venue.owner.avatar} alt="avatar" />
              <div>
                <h3>Hosted By {venue.owner.name}</h3>
                <p>Email: {venue.owner.email}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}

export default Venue;
