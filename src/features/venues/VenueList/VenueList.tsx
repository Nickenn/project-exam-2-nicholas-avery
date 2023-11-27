import { Link } from "react-router-dom";
import image from "../../../assets/venue-placeholder.svg";
import styles from "./style.module.css";
import styled from "styled-components";

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

const VenuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2fr 4fr));
  gap: 10rem;
  row-gap: 1rem;
  padding: 2rem;
  margin: 10rem;
  margin-top: 100px;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-radius: 4px;
`;

const StyledVenue = styled.div`
  background-color: rgba(127, 255, 212, 0.281);
  padding: 40px;
  &:hover {
    background-color: rgba(127, 255, 212, 0.555);
  }
`;

function Venue({
  id,
  name,
  description,
  media,
  price,
  created,
  rating,
  location,
  maxGuests,
}: VenueProps) {
  return (
    <Link to={`/venues/${id}`}>
      <VenuesContainer>
        <StyledVenue>
          <VenueImage
            src={media[0] ? media[0] : image}
            alt={name}
            loading="lazy"
          />
          <h2 className={styles.venueTitle}>{name}</h2>
          <p>{description}</p>
          <span>Maximum number of guests: {maxGuests}</span>
          <h4>{price},- NOK per night</h4>
          <p>Rating: {rating}</p>
          <h4>
            Location: {location.city}, {location.country}{" "}
          </h4>
        </StyledVenue>
      </VenuesContainer>
    </Link>
  );
}

function VenuesList({ venues }: { venues: VenueProps[] }) {
  return (
    <div>
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          name={venue.name}
          created={venue.created}
          media={venue.media}
          price={venue.price}
          id={venue.id}
          rating={venue.rating}
          description={venue.description}
          location={venue.location}
          meta={venue.meta}
          owner={venue.owner}
          bookings={venue.bookings}
          maxGuests={venue.maxGuests}
        />
      ))}
    </div>
  );
}

export default VenuesList;
