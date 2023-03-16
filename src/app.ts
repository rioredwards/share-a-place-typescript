import axios from "axios";

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

/* Global State */
let myMap: MapState;
let portlandCoords: Coords = { lat: 45.515232, lng: -122.6783853 };
let userCoords: Coords | null = null;
let initZoom: number = 4;

// Singleton for managing the map state
class MapState {
  private static instance: MapState;
  private map?: google.maps.Map;
  private marker?: google.maps.Marker;
  private mapEl: HTMLDivElement;
  private coords: Coords;
  private zoom: number;

  // Setter for the coords property
  set coordinates(newCoords: Coords) {
    this.coords = newCoords;
    this.render();
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
    this.render();
  }

  static getInstance(
    newMapEl: HTMLDivElement,
    newCoords: Coords,
    newZoom: number
  ) {
    if (!this.instance) {
      this.instance = new MapState(newMapEl, newCoords, newZoom);
    }
    return this.instance;
  }

  render() {
    this.map = new google.maps.Map(this.mapEl, {
      zoom: this.zoom,
      center: this.coords,
    });
    this.marker = new google.maps.Marker({
      position: this.coords,
      map: this.map,
    });
    console.log("New marker:", this.marker);
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
      )}&key=AIzaSyA7czqjPLupqHKx4vfgWaHrnpO2_BuZL2k`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      userCoords = response.data.results[0].geometry.location;
      console.log("coordinates: ", userCoords);
      myMap.coordinates = userCoords;
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
