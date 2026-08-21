"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetchFires, firesKey, type FireCollection, type SelectedFire } from "@/lib/api";
import { passesFilter, type FireFilterKey } from "@/lib/fire";
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
  const [filter, setFilter] = useState<FireFilterKey>("confirmed");
  const [selected, setSelected] = useState<SelectedFire | null>(null);

  const { data, error, isLoading } = useSWR<FireCollection>(firesKey(days), fetchFires, {
    refreshInterval: 5 * 60 * 1000, // FIRMS updates a few times/day; 5 min is plenty.
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  // Client-side filtering → instant toggling, no refetch.
  const filtered = useMemo<FireCollection | undefined>(() => {
    if (!data) return data;
    const features = data.features.filter((f) => passesFilter(f.properties, filter));
    return { ...data, features, properties: { ...data.properties, count: features.length } };
  }, [data, filter]);

  return (
    <main style={{ position: "fixed", inset: 0, background: "var(--bg)" }}>
      <FireMap data={filtered} selected={selected} onSelect={setSelected} />
      <TopBar
        days={days}
        onDaysChange={(d) => {
          setDays(d);
          setSelected(null);
        }}
        filter={filter}
        onFilterChange={(f) => {
          setFilter(f);
          setSelected(null);
        }}
        shownCount={filtered?.features.length ?? 0}
        totalCount={data?.properties.count ?? 0}
        generatedAt={data?.properties.generated_at}
        loading={isLoading}
        error={error ? String(error.message ?? error) : undefined}
      />
      <Legend />
      {selected && <FireDetailPanel fire={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
