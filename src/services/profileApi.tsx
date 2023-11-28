import { BASE_API } from "../utils/constants";

export async function getProfiles() {
  const res = await fetch(`${BASE_API}/profiles`);

  if (!res.ok) throw Error("Failed getting profiles.");

  const data = await res.json();

  return data;
}

export async function getProfile(
  name: string | undefined,
  token: string | null
) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${BASE_API}/profiles/${name}`, options);

  if (!res.ok) throw Error("Failed getting profile.");

  const data = await res.json();

  return data;
}

export async function updateUserProfile(
  token: string | null,
  name: string | null
) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ venueManager: true }),
  };

  const res = await fetch(`$BASE_API}/profiles/${name}`, options);
  const data = await res.json();

  return data;
}

export async function getProfileVenues(
  name: string | null,
  token: string | null
) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${BASE_API}/profiles/${name}/venues?_owner=true&_bookings=true`,
    options
  );

  if (!res.ok) throw Error("Error fetching venues.");

  const data = await res.json();

  return data;
}
