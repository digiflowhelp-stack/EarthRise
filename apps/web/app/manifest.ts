import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FireWatch",
    short_name: "FireWatch",
    description: "Real-time wildfire intelligence from space. Live fire detections, intensity, and climate risk — for communities on the front line.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    lang: "fr",
    categories: ["weather", "utilities", "news"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
