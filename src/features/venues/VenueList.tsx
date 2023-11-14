import { Link } from "react-router-dom";

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

function Venue({
  id,
  name,
  media,
  price,
  created,
  rating,
  location,
  maxGuests,
}: VenueProps) {
  return (
    <div> 
      <h1>{name}</h1>
    </div>
  );
}

function VenuesList({ venues }: { venues: VenueProps[] }) {
  return (
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
  );
}

export default VenuesList;
