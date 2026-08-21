import { ImageResponse } from "next/og";

export const alt = "Algeria Fire Map — Real-time wildfire monitoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "radial-gradient(1000px 500px at 85% -10%, #3a0f08 0%, #07080c 60%)",
          color: "#f5f6f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: 26,
              background: "#ff7a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#fff">
              <path d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.547 3.75 3.75 0 0 1 3.255 3.718Z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#34d399", fontWeight: 700, letterSpacing: 2 }}>● LIVE</div>
            <div style={{ fontSize: 26, color: "#a4a7b2" }}>Algeria · NASA FIRMS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>Algeria Fire Map</div>
          <div style={{ fontSize: 34, color: "#c9ccd6" }}>
            Real-time satellite wildfire monitoring &amp; fire-risk by wilaya
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 28, color: "#ff9e3d", fontWeight: 700 }}>algeriafiremap.site</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["#ffe066", "#ffa630", "#fb5607", "#e01e37", "#a4133c"].map((c) => (
              <div key={c} style={{ width: 26, height: 26, borderRadius: 26, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
