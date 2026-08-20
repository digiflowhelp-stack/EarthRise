"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetchFires, firesKey, type FireCollection } from "@/lib/api";
import MapControls from "./MapControls";

// MapLibre touches `window`, so load the map client-only.
const FireMap = dynamic(() => import("./FireMap"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#888" }}>
      Loading map…
    </div>
  ),
});

export default function FireDashboard() {
  const [days, setDays] = useState(1);

  const { data, error, isLoading } = useSWR<FireCollection>(firesKey(days), fetchFires, {
    refreshInterval: 5 * 60 * 1000, // FIRMS updates a few times/day; 5 min is plenty.
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return (
    <main style={{ position: "fixed", inset: 0 }}>
      <FireMap data={data} />
      <MapControls
        days={days}
        onDaysChange={setDays}
        meta={data?.properties}
        loading={isLoading}
        error={error ? String(error.message ?? error) : undefined}
      />
    </main>
  );
}
