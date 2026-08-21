"use client";

import { useState } from "react";
import { CONFIRMED_EXPLAINER, DURATIONS, type DurationKey } from "@/lib/fire";
import { MAP_STYLES, type MapStyleKey } from "@/lib/mapStyles";

function lastUpdated(iso: string | undefined): string {
  if (!iso) return "—";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  return `${Math.round(mins / 60)} h ago`;
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  accent,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  accent?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 4, padding: 3, background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              flex: 1,
              padding: "7px 0",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 12,
              transition: "all 0.2s ease",
              background: active ? (accent ? "var(--accent-grad)" : "rgba(255,255,255,0.14)") : "transparent",
              color: active ? "#fff" : "var(--text-secondary)",
              boxShadow: active && accent ? "0 2px 10px rgba(224,30,55,0.35)" : "none",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  styleKey: MapStyleKey;
  onStyleChange: (k: MapStyleKey) => void;
  duration: DurationKey;
  onDurationChange: (d: DurationKey) => void;
  shownCount: number;
  totalCount: number;
  generatedAt: string | undefined;
  loading: boolean;
  error?: string;
}

export default function TopBar({
  styleKey,
  onStyleChange,
  duration,
  onDurationChange,
  shownCount,
  totalCount,
  generatedAt,
  loading,
  error,
}: Props) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="glass animate-in" style={{ position: "absolute", top: 16, left: 16, zIndex: 20, padding: 18, width: 300, maxWidth: "calc(100vw - 32px)" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--accent-grad)", display: "grid", placeItems: "center", fontSize: 20, boxShadow: "0 4px 16px rgba(224,30,55,0.4)" }}>🔥</div>
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
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{shownCount.toLocaleString()}</span>
              <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
                active fires
                {loading && <span style={{ color: "var(--text-muted)" }}> · updating…</span>}
              </span>
            </div>
            {/* Confirmed badge + info popover */}
            <div style={{ position: "relative", display: "inline-flex", marginTop: 6 }}>
              <span
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                onClick={() => setShowInfo((v) => !v)}
                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 99, background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.3)", color: "#5fe3ab", fontSize: 11, fontWeight: 600, cursor: "help" }}
              >
                ✓ Confirmed only
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center", fontSize: 9, color: "var(--text-secondary)" }}>i</span>
              </span>
              {showInfo && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: 268, zIndex: 30, padding: 12, borderRadius: 12, background: "var(--surface-solid)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow)", fontSize: 12, lineHeight: 1.55, color: "var(--text-secondary)" }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>How we confirm fires</div>
                  {CONFIRMED_EXPLAINER}
                </div>
              )}
            </div>
          </>
        )}
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 8 }}>
          of {totalCount.toLocaleString()} hotspots · updated {lastUpdated(generatedAt)}
        </div>
      </div>

      {/* Map style */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 6 }}>Map</div>
        <Segmented options={MAP_STYLES.map((s) => ({ key: s.key, label: s.label }))} value={styleKey} onChange={onStyleChange} />
      </div>

      {/* Duration */}
      <div>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 6 }}>Period</div>
        <Segmented options={DURATIONS.map((d) => ({ key: d.key, label: d.label }))} value={duration} onChange={onDurationChange} accent />
      </div>
    </div>
  );
}
