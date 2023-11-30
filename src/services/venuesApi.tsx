import { BASE_API_URL } from "../utils/constants";

export async function getAllVenues(limit: number, offset: number) {
  const result = await fetch(
    `${BASE_API_URL}/venues?limit=${limit}&offset=${offset}`
  );

  if (!result.ok) throw Error("Failed attempt at fetching venues.");

  const data = await result.json();

  return data;
}

export async function getSingleVenue(id: string | undefined) {
  const result = await fetch(
    `${BASE_API_URL}/venues/${id}?_owner=true&_bookings=true`
  );

  if (!result.ok) throw Error("Failed attempt at getting single venue.");

  const data = await result.json();

  return data;
}