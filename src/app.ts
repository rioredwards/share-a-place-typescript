import { fetchCoords } from "./services/google-services";
import { Coords } from "./types";
import Map from "./map";

/* DOM Elements */
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const myMapEl = document.getElementById("map")! as HTMLDivElement;

/* Global State */
let myMap: Map;
let portlandCoords: Coords = { lat: 45.515232, lng: -122.6783853 };
let userCoords: Coords | null = null;
let initZoom: number = 4;

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Get Coordinates from Google's API!
  userCoords = await fetchCoords(enteredAddress);
  console.log("coordinates: ", userCoords);
  myMap.coordinates = userCoords;
  myMap.zoomLevel = 16;
  myMap.render();
}

form.addEventListener("submit", searchAddressHandler);

// Initialize and add the map
function initMap(): void {
  myMap = Map.getInstance(myMapEl, portlandCoords, initZoom);
}
declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
