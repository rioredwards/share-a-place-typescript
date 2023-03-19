import { Coords } from "../types";

interface Viewport {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

interface GoogleGeocodingResponse {
  coords: Coords;
  viewport: Viewport;
}

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
