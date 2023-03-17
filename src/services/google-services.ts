import { Coords, GoogleGeocodingResponse } from "../types";

export async function fetchCoords(enteredAddress: string) {
  let response: Response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress
    )}&key=AIzaSyA7czqjPLupqHKx4vfgWaHrnpO2_BuZL2k`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  if (response.status !== 200) {
    throw new Error("Could not fetch location!");
  }

  const data: GoogleGeocodingResponse = await response.json();

  if (data.status !== "OK") {
    throw new Error("Could not fetch location!");
  }

  const coords: Coords = data.results[0].geometry.location;
  return coords;
}
