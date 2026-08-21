"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetchFires, firesKey, type FireCollection, type SelectedFire } from "@/lib/api";
import TopBar from "./TopBar";
import Legend from "./Legend";
import FireDetailPanel from "./FireDetailPanel";

// MapLibre needs `window`, so load the map client-only.
const FireMap = dynamic(() => import("./FireMap"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: 14 }}>
      Loading map…
    </div>
  ),
});

export default function FireDashboard() {
  const [days, setDays] = useState(1);
  const [selected, setSelected] = useState<SelectedFire | null>(null);

  const { data, error, isLoading } = useSWR<FireCollection>(firesKey(days), fetchFires, {
    refreshInterval: 5 * 60 * 1000, // FIRMS updates a few times/day; 5 min is plenty.
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return (
    <main style={{ position: "fixed", inset: 0, background: "var(--bg)" }}>
      <FireMap data={data} selected={selected} onSelect={setSelected} />
      <TopBar
        days={days}
        onDaysChange={(d) => {
          setDays(d);
          setSelected(null);
        }}
        meta={data?.properties}
        loading={isLoading}
        error={error ? String(error.message ?? error) : undefined}
      />
      <Legend />
      {selected && <FireDetailPanel fire={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
