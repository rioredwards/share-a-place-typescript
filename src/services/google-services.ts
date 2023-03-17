import { Coords } from "../types";

export async function fetchCoords(enteredAddress: string) {
  const response = await fetch("/.netlify/functions/google-api", {
    method: "POST",
    body: JSON.stringify({ address: enteredAddress }),
  });

  if (response.status !== 200) {
    throw new Error("Could not fetch location!");
  }

  const coords: Coords = await response.json();
  return coords;
}
