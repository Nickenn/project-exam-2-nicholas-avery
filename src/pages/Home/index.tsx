import { getAllVenues } from "../../services/venuesApi";
import { useEffect, useState } from "react";

import { PAGE_LIMIT } from "../../utils/constants";
import { useSearch } from "../../context/searchContext";
import VenuesList from "../../features/venues/VenueList";

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
  const [pageOffset, setPageOffset] = useState(0);
  const [loading, setIsloading] = useState(true);

  const fetchData = async () => {
    setIsloading(true);
    const data = await getAllVenues(PAGE_LIMIT, pageOffset);
    setVenues(Array.prototype.concat(venues, data));
    setIsloading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [pageOffset]);

  return (
    <main>
      <p>Hello</p>
      <VenuesList venues={venues} />
    </main>
  );
}

export default Home;
