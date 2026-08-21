"use client";

import { useState } from "react";
import { INTENSITY_LEVELS } from "@/lib/fire";

export default function Legend() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="glass animate-in"
      style={{ position: "absolute", left: 16, bottom: 16, zIndex: 20, padding: open ? 16 : "10px 14px", width: open ? 208 : "auto" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}
      >
        <span style={{ textTransform: "uppercase", color: "var(--text-secondary)" }}>Fire power (MW)</span>
        <span style={{ color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          {INTENSITY_LEVELS.map((l, i) => {
            const next = INTENSITY_LEVELS[i + 1];
            const range = next ? `${l.min}–${next.min}` : `${l.min}+`;
            return (
              <div key={l.key} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: l.color, boxShadow: `0 0 8px ${l.color}99`, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, flex: 1 }}>{l.label}</span>
                <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{range}</span>
              </div>
            );
          })}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Glow shows density; zoom in for individual detections.
          </div>
        </div>
      )}
    </div>
  );
}
