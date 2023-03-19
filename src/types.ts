/* Types */
export type Coords = { lat: number; lng: number };

export interface Viewport {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

export interface GoogleGeocodingResponse {
  coords: Coords;
  viewport: Viewport;
}
