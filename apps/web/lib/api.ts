// Typed client for the FastAPI backend. The frontend is stateless and holds
// no secrets — it only calls this public API.

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Confidence = "low" | "nominal" | "high";

export interface FireProperties {
  frp: number;
  confidence: Confidence;
  acq_datetime: string | null;
  satellite: string;
  instrument: string;
  daynight: string;
  brightness: number | null;
}

export interface FireFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: FireProperties;
}

export interface FireCollectionMeta {
  generated_at: string;
  days: number;
  count: number;
  sources: string[];
  aoi_bbox: string;
}

export interface FireCollection {
  type: "FeatureCollection";
  features: FireFeature[];
  properties: FireCollectionMeta;
}

export interface SelectedFire {
  id: number | string;
  lng: number;
  lat: number;
  properties: FireProperties;
}

export async function fetchFires(url: string): Promise<FireCollection> {
  const res = await fetch(url);
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) detail = body.detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  return res.json();
}

export function firesKey(days: number): string {
  return `${API_URL}/fires?days=${days}`;
}

export interface PlaceInfo {
  wilaya: string | null;
  town: string | null;
  district: string | null;
  country: string | null;
  display: string | null;
}

export function placeKey(lat: number, lng: number): string {
  return `${API_URL}/place?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}`;
}

export async function fetchPlace(url: string): Promise<PlaceInfo> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("place lookup failed");
  return res.json();
}
