import axios from "axios";
import { GOOGLE_API_KEY } from "./key";
// import { Loader } from "@googlemaps/js-api-loader";

/* DOM Elements */
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const myMapEl = document.getElementById("map")! as HTMLDivElement;

/* Types */
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};
type Coords = { lat: number; lng: number };

/* Global State (Bad Practice) */
let myMap: MapState;
let portlandCoords: Coords = { lat: 45.515232, lng: -122.6783853 };
// let userCoords: Coords | null = null;
let initZoom: number = 4;

// Singleton for managing the map state
class MapState {
  private static instance: MapState;
  private map: google.maps.Map;
  private mapEl: HTMLDivElement;
  private coords: Coords;
  private zoom: number;

  // Setter for the coords property
  set coordinates(newCoords: Coords) {
    this.coords = newCoords;
  }

  // Getter for the coords property
  get coordinates() {
    return this.coords;
  }

  // setter for the zoom property
  set zoomLevel(newZoom: number) {
    this.zoom = newZoom;
  }

  private constructor(
    newMapEl: HTMLDivElement,
    newCoords: Coords,
    newZoom: number
  ) {
    this.mapEl = newMapEl;
    this.coords = newCoords;
    this.zoom = newZoom;
    this.map = new google.maps.Map(this.mapEl, {
      zoom: this.zoom,
      center: this.coords,
    });
  }

  static getInstance(
    newMapEl: HTMLDivElement,
    newCoords: Coords,
    newZoom: number
  ) {
    if (!this.instance) {
      this.instance = new MapState(newMapEl, newCoords, newZoom);
    }
    console.log("MapState instance:", this.instance);
    console.log("MapState instance map:", this.instance.map);
    return this.instance;
  }

  render() {
    this.map = new google.maps.Map(this.mapEl, {
      zoom: this.zoom,
      center: this.coords,
    });
    console.log("rendering map:", this.map);
  }
}

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
      myMap.coordinates = coordinates;
      myMap.zoomLevel = 16;
      myMap.render();
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);

// Initialize and add the map
function initMap(): void {
  myMap = MapState.getInstance(myMapEl, portlandCoords, initZoom);
}
declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
