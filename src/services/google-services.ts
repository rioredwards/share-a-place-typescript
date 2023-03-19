import { Coords, GoogleGeocodingResponse } from "../types";

export async function fetchLocation(enteredAddress: string) {
  const response = await fetch("/.netlify/functions/google-api", {
    method: "POST",
    body: JSON.stringify({ address: enteredAddress }),
  });

  if (response.status !== 200) {
    throw new Error("Could not fetch location!");
  }

  const data: GoogleGeocodingResponse = await response.json();
  return data;
}
