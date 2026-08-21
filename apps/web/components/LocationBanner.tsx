"use client";

import { CloseIcon, PinIcon } from "./Icons";

interface Props {
  nearest: { km: number; name: string } | null;
  error: string | null;
  isMobile: boolean;
  onClose: () => void;
}

export default function LocationBanner({ nearest, error, isMobile, onClose }: Props) {
  const shell: React.CSSProperties = isMobile
    ? { position: "absolute", left: 12, right: 12, top: "calc(env(safe-area-inset-top) + 82px)", zIndex: 25, padding: "12px 14px" }
    : { position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 25, padding: "12px 16px", maxWidth: "calc(100vw - 680px)" };

  return (
    <div className={`glass ${isMobile ? "sheet-in" : "animate-in"}`} style={{ ...shell, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: "#3b82f6", flexShrink: 0 }}>
        <PinIcon size={16} color="#3b82f6" />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {error ? (
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{error}</span>
        ) : nearest ? (
          <span style={{ fontSize: 13.5, color: "var(--text)" }}>
            Nearest active fire: <b>{nearest.km} km</b>
            <span style={{ color: "var(--text-secondary)" }}> · near {nearest.name}</span>
          </span>
        ) : (
          <span style={{ fontSize: 13.5, color: "var(--text)" }}>No active fires detected nearby.</span>
        )}
      </div>
      <button onClick={onClose} aria-label="Dismiss" style={{ width: 26, height: 26, borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface-hover)", color: "var(--text-secondary)", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <CloseIcon size={13} />
      </button>
    </div>
  );
}
