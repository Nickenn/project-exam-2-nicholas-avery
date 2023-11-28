import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Container from "../../ui/Container";
import { NavLink, useNavigate } from "react-router-dom";

interface VenueItemProp {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
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
    continent: string;
    lat: number;
    lng: number;
  };
  bookings: [{ id: string; dateFrom: string; dateTo: string; guests: number; created: string; updated: string }];
}

function ProfileVenues() {
  const [venues, setVenues] = useState<VenueItemProp[]>();
  const [loading, setLoading] = useState(true);
  const { userName, authToken } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await 
  }
}
