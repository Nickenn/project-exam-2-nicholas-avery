import { getAllVenues } from "../services/venuesApi";
import { useState, useEffect } from "react";
import Search from "../ui/Search";

import VenuesList from "../features/venues/VenueList";

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

function Home() {
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setIsloading] = useState(true);

  const fetchData = async () => {
    setIsloading(true);
    const data = await getAllVenues();
    setVenues(Array.prototype.concat(venues, data));
    setIsloading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  if (loading || !venues) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Search
        placeholder="Search venues"
        handleChange={(e) => setSearchField(e.target.value)}
      />
      <VenuesList
        venues={venues.filter((venue) =>
          venue.name.toLowerCase().includes(searchField.toLowerCase())
        )}
      />
    </main>
  );
}

export default Home;
