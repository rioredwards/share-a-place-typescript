import { fetchLocation } from "./services/google-services";
import CustomMap from "./CustomMap";
import { Viewport } from "./types";

/* DOM Elements */
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const myMapEl = document.getElementById("map")! as HTMLDivElement;

/* Global State */
let myMap: CustomMap = CustomMap.getInstance(myMapEl);

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Get Coordinates from Google's API!
  const location = await fetchLocation(enteredAddress);
  const userCoords = location.coords;
  const viewport = location.viewport;
  console.log("viewport:", viewport);
  myMap.updateCoords(userCoords);
}

form.addEventListener("submit", searchAddressHandler);
