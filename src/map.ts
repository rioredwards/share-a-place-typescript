import { Coords } from "./types";
import { Loader } from "@googlemaps/js-api-loader";

// Singleton for managing the map state
export default class Map {
  private static instance: Map;
  private loader: Loader;
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
    this.loader = new Loader({
      apiKey: "AIzaSyA7czqjPLupqHKx4vfgWaHrnpO2_BuZL2k",
      version: "weekly",
      libraries: ["places"],
    });
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
      this.instance = new Map(newMapEl, newCoords, newZoom);
    }
    return this.instance;
  }

  render() {
    this.loader
      .load()
      .then((google) => {
        const newMap = new google.maps.Map(this.mapEl, {
          zoom: this.zoom,
          center: this.coords,
        });
        new google.maps.Marker({
          position: this.coords,
          map: newMap,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
