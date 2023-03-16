import axios from "axios";
import { GOOGLE_API_KEY } from "./key";
// import { Loader } from "@googlemaps/js-api-loader";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
let mapEl = document.getElementById("map")! as HTMLDivElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Get Coordinates from Google's API!
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log("coordinates: ", coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });

  //   // Load map from Google Maps API
  //   const loader = new Loader({
  //     apiKey: GOOGLE_API_KEY,
  //     version: "weekly",
  //   });

  //   loader.load().then(() => {
  //     const map = new google.maps.Map(
  //       document.getElementById("map") as HTMLElement,
  //       {
  //         center: { lat: -34.397, lng: 150.644 },
  //         zoom: 8,
  //       }
  //     );
  //   });
}

form.addEventListener("submit", searchAddressHandler);

// Initialize and add the map
function initMap(): void {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(mapEl, {
    zoom: 4,
    center: uluru,
  });

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
