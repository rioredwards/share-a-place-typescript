import { Coords } from "./types";
// Singleton for managing the map state

export default class Map {
  private static instance: Map;
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
      this.instance = new Map(newMapEl, newCoords, newZoom);
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
