"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetchFires, firesKey, type FireCollection, type SelectedFire } from "@/lib/api";
import { durationFor, passesFilter, withinAge, type DurationKey } from "@/lib/fire";
import type { MapStyleKey } from "@/lib/mapStyles";
import TopBar from "./TopBar";
import Legend from "./Legend";
import FireDetailPanel from "./FireDetailPanel";

const FireMap = dynamic(() => import("./FireMap"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: 14 }}>
      Loading map…
    </div>
  ),
});

export default function FireDashboard() {
  const [duration, setDuration] = useState<DurationKey>("24h");
  const [styleKey, setStyleKey] = useState<MapStyleKey>("dark");
  const [selected, setSelected] = useState<SelectedFire | null>(null);

  const dur = durationFor(duration);

  const { data, error, isLoading } = useSWR<FireCollection>(firesKey(dur.apiDays), fetchFires, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  // Always show Confirmed fires, within the selected recency window.
  const filtered = useMemo<FireCollection | undefined>(() => {
    if (!data) return data;
    const features = data.features.filter(
      (f) => passesFilter(f.properties, "confirmed") && withinAge(f.properties.acq_datetime, dur.maxAgeHours)
    );
    return { ...data, features, properties: { ...data.properties, count: features.length } };
  }, [data, dur.maxAgeHours]);

  return (
    <main style={{ position: "fixed", inset: 0, background: "var(--bg)" }}>
      <FireMap data={filtered} selected={selected} onSelect={setSelected} styleKey={styleKey} />
      <TopBar
        styleKey={styleKey}
        onStyleChange={setStyleKey}
        duration={duration}
        onDurationChange={(d) => {
          setDuration(d);
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
