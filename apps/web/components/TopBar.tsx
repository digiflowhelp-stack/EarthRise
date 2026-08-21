"use client";

import { FIRE_FILTERS, type FireFilterKey } from "@/lib/fire";

const RANGES = [
  { label: "24h", days: 1 },
  { label: "48h", days: 2 },
  { label: "7d", days: 7 },
];

function lastUpdated(iso: string | undefined): string {
  if (!iso) return "—";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  return `${Math.round(mins / 60)} h ago`;
}

interface Props {
  days: number;
  onDaysChange: (days: number) => void;
  filter: FireFilterKey;
  onFilterChange: (f: FireFilterKey) => void;
  shownCount: number;
  totalCount: number;
  generatedAt: string | undefined;
  loading: boolean;
  error?: string;
}

const activeFilterDef = (key: FireFilterKey) => FIRE_FILTERS.find((f) => f.key === key)!;

export default function TopBar({
  days,
  onDaysChange,
  filter,
  onFilterChange,
  shownCount,
  totalCount,
  generatedAt,
  loading,
  error,
}: Props) {
  return (
    <div className="glass animate-in" style={{ position: "absolute", top: 16, left: 16, zIndex: 20, padding: 18, width: 300, maxWidth: "calc(100vw - 32px)" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--accent-grad)", display: "grid", placeItems: "center", fontSize: 20, boxShadow: "0 4px 16px rgba(224,30,55,0.4)" }}>
          🔥
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>Algeria Fire Map</div>
          <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Live wildfire monitoring 🇩🇿</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--live)", animation: "livePulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--live)", letterSpacing: "0.06em" }}>LIVE</span>
        </div>
      </div>

      {/* Stat */}
      <div style={{ marginBottom: 14 }}>
        {error ? (
          <div style={{ color: "var(--fire-4)", fontSize: 13 }}>⚠️ {error}</div>
        ) : (
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{shownCount.toLocaleString()}</span>
            <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
              fires shown
              {loading && <span style={{ color: "var(--text-muted)" }}> · updating…</span>}
            </span>
          </div>
        )}
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>
          {filter !== "all" && `of ${totalCount.toLocaleString()} hotspots · `}updated {lastUpdated(generatedAt)}
        </div>
      </div>

      {/* Filter mode */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 6 }}>Show</div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
          {FIRE_FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => onFilterChange(f.key)}
                title={f.description}
                style={{ flex: 1, padding: "7px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, transition: "all 0.2s ease", background: active ? "var(--accent-grad)" : "transparent", color: active ? "#fff" : "var(--text-secondary)", boxShadow: active ? "0 2px 10px rgba(224,30,55,0.35)" : "none" }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>{activeFilterDef(filter).description}</div>
      </div>

      {/* Time range */}
      <div>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 6 }}>Period</div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
          {RANGES.map((r) => {
            const active = days === r.days;
            return (
              <button
                key={r.days}
                onClick={() => onDaysChange(r.days)}
                style={{ flex: 1, padding: "7px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12.5, transition: "all 0.2s ease", background: active ? "rgba(255,255,255,0.14)" : "transparent", color: active ? "#fff" : "var(--text-secondary)" }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
