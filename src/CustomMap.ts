import { Coords } from "./types";

// Singleton for managing the map state
export default class CustomMap {
  private static instance: CustomMap;
  private googleMap: google.maps.Map;
  private mapMarker!: google.maps.Marker;

  private constructor(mapEl: HTMLDivElement) {
    this.googleMap = new google.maps.Map(mapEl, {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    });
  }

  addMarker(coords: Coords) {
    this.mapMarker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
    });
  }

  updateCoords(newCoords: Coords) {
    this.googleMap.panTo(newCoords);
    this.googleMap.setZoom(4);
    this.updateMarker(newCoords);
  }

  updateMarker(newCoords: Coords) {
    if (!this.mapMarker) {
      this.addMarker(newCoords);
    } else {
      this.mapMarker.setPosition(newCoords);
    }
  }

  static getInstance(newMapEl: HTMLDivElement) {
    if (!this.instance) {
      this.instance = new CustomMap(newMapEl);
    }
    return this.instance;
  }
}
