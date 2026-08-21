"use client";

// Shared segmented control (Apple-style: neutral track, solid raised active
// segment — no gradients). `big` bumps touch targets to ~44px for mobile.
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  big,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  big?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 3, padding: 3, background: "rgba(255,255,255,0.06)", borderRadius: 12 }}>
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              flex: 1,
              minHeight: big ? 44 : undefined,
              padding: big ? "0" : "7px 0",
              borderRadius: 9,
              border: active ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: big ? 13.5 : 12,
              transition: "background 0.18s ease, color 0.18s ease",
              background: active ? "rgba(255,255,255,0.16)" : "transparent",
              color: active ? "#fff" : "var(--text-secondary)",
              boxShadow: active ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
