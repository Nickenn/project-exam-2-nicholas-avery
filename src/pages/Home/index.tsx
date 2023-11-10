import { getAllVenues } from "../../api";
import { useState, useEffect } from "react";
import { Venue } from "../../types/venue";
import VenueList from "../../components/VenuesList";
import { BASE_URL } from "../../api";

function Homepage() {
  const { data, isLoading, isError } = useApi(`${BASE_URL}`);

  if (isLoading) {
    return <div>Page is loading</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <main>
      <VenueList />
    </main>
  );
}

export default Homepage;
