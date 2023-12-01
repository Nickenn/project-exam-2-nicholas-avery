import { getAllVenues } from "../services/venuesApi";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../ui/Container";
import Search from "../ui/Search";

import { PAGE_LIMIT } from "../utils/constants";
import { useSearch } from "../context/searchContext";
import VenuesList from "../features/venues/VenueList";
import { GridCols } from "../ui/Grid";

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
  const [pageOffset, setPageOffset] = useState(0);
  const [loading, setIsloading] = useState(true);
  const { searchValue } = useSearch();

  const filteredVenues = venues.filter((venue) => {
    const cityMatch = venue.location.city
      .toLowerCase()
      .includes(searchValue.destination.toLowerCase());
    const countryMatch = venue.location.country
      .toLowerCase()
      .includes(searchValue.destination.toLowerCase());
    const addressMatch = venue.location.address.includes(
      searchValue.destination.toLowerCase()
    );
    const guestLimit = venue.maxGuests >= searchValue.guests.adult;

    return (cityMatch || countryMatch || addressMatch) && guestLimit;
  });

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
