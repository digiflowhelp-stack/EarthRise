"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FireCollection } from "@/lib/api";

// Free, tokenless vector basemap.
const BASEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// Center on fire-prone northern Algeria (Sahara is just backdrop).
const INITIAL_CENTER: [number, number] = [3.5, 34.8];
const INITIAL_ZOOM = 5.1;

const SOURCE_ID = "fires";
const LAYER_ID = "fires-circles";

const EMPTY: FireCollection = {
  type: "FeatureCollection",
  features: [],
  properties: { generated_at: "", days: 1, count: 0, sources: [], aoi_bbox: "" },
};

function relativeTime(iso: string | null): string {
  if (!iso) return "unknown";
  const then = new Date(iso).getTime();
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

function popupHTML(p: FireCollection["features"][number]["properties"]): string {
  return `
    <div style="font:13px/1.5 system-ui,sans-serif;min-width:180px">
      <div style="font-weight:600;margin-bottom:4px">🔥 Active fire detection</div>
      <div><b>Fire power:</b> ${p.frp} MW</div>
      <div><b>Detected:</b> ${relativeTime(p.acq_datetime)}</div>
      <div><b>Confidence:</b> ${p.confidence}</div>
      <div><b>Satellite:</b> ${p.satellite || "—"} (${p.instrument || "—"})</div>
      <div><b>Time of day:</b> ${p.daynight === "D" ? "Day" : p.daynight === "N" ? "Night" : "—"}</div>
    </div>`;
}

export default function FireMap({ data }: { data: FireCollection | undefined }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const readyRef = useRef(false);

  // Initialize the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASEMAP_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource(SOURCE_ID, { type: "geojson", data: EMPTY });
      map.addLayer({
        id: LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          // Radius grows with fire power and zoom.
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            ["interpolate", ["linear"], ["get", "frp"], 0, 3, 50, 7],
            10,
            ["interpolate", ["linear"], ["get", "frp"], 0, 6, 50, 16],
          ],
          // Color ramp by fire radiative power (MW): yellow → deep red.
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "frp"],
            0,
            "#ffeda0",
            5,
            "#feb24c",
            20,
            "#fc4e2a",
            50,
            "#bd0026",
            100,
            "#800026",
          ],
          "circle-opacity": 0.85,
          "circle-stroke-width": 0.6,
          "circle-stroke-color": "#4a0011",
        },
      });
      readyRef.current = true;
      // Push any data that arrived before load.
      const src = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      if (src && data) src.setData(data as unknown as GeoJSON.FeatureCollection);

      map.on("click", LAYER_ID, (e) => {
        const f = e.features?.[0];
        if (!f) return;
        const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        new maplibregl.Popup({ closeButton: true })
          .setLngLat(coords)
          .setHTML(popupHTML(f.properties as never))
          .addTo(map);
      });
      map.on("mouseenter", LAYER_ID, () => (map.getCanvas().style.cursor = "pointer"));
      map.on("mouseleave", LAYER_ID, () => (map.getCanvas().style.cursor = ""));
    });

    return () => {
      map.remove();
      mapRef.current = null;
      readyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update fire data whenever it changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current || !data) return;
    const src = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
    if (src) src.setData(data as unknown as GeoJSON.FeatureCollection);
  }, [data]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
