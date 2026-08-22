import { ImageResponse } from "next/og";

export const alt = "FireWatch — Real-time wildfire intelligence from space";
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
              background: "#0a0c10",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="84" height="84" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="fw" x1="18" y1="10" x2="46" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ffb020" />
                  <stop offset="0.55" stopColor="#ff5a36" />
                  <stop offset="1" stopColor="#e01e37" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="21" fill="none" stroke="#ffffff" strokeOpacity="0.13" strokeWidth="2.5" />
              <path d="M 32 11 A 21 21 0 0 1 50.19 42.5" fill="none" stroke="url(#fw)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50.19" cy="42.5" r="3" fill="#ffb020" />
              <path transform="translate(18.2 18.2) scale(1.15)" fill="url(#fw)" fillRule="evenodd" clipRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.547 3.75 3.75 0 0 1 3.255 3.718Z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#34d399", fontWeight: 700, letterSpacing: 2 }}>● LIVE</div>
            <div style={{ fontSize: 26, color: "#a4a7b2" }}>Algeria · NASA FIRMS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>FireWatch</div>
          <div style={{ fontSize: 32, color: "#c9ccd6", lineHeight: 1.3, maxWidth: 900 }}>
            Real-time wildfire intelligence from space. Live detections, intensity &amp; climate risk — for communities on the front line.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 28, color: "#ff9e3d", fontWeight: 700 }}>github.com/digiflowhelp-stack/FireWatch</div>
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
