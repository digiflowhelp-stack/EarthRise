import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Algeria Fire Map",
    short_name: "Fire Map",
    description: "Real-time satellite wildfire monitoring and fire-risk for Algeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    lang: "fr",
    categories: ["weather", "utilities", "news"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
