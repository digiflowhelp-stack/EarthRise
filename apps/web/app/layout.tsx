import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algeriafiremap.site";

const TITLE = "Algeria Fire Map — Live wildfire tracking | خريطة حرائق الجزائر";
const DESCRIPTION =
  "Real-time satellite wildfire monitoring across Algeria: live fire detections, intensity, and fire-risk by wilaya, from NASA FIRMS. " +
  "Suivi en temps réel des feux de forêt en Algérie. " +
  "متابعة حرائق الغابات في الجزائر مباشرة عبر الأقمار الاصطناعية.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Algeria Fire Map",
  title: { default: TITLE, template: "%s · Algeria Fire Map" },
  description: DESCRIPTION,
  keywords: [
    // English
    "Algeria fire map", "wildfire Algeria", "Algeria wildfires", "forest fire Algeria",
    "NASA FIRMS Algeria", "live fire map Algeria", "fire risk Algeria", "VIIRS MODIS Algeria",
    // French
    "carte des feux Algérie", "feux de forêt Algérie", "incendie Algérie", "feux Kabylie",
    "risque incendie Algérie", "surveillance des feux Algérie",
    // Arabic
    "خريطة حرائق الجزائر", "حرائق الغابات الجزائر", "حرائق الجزائر مباشر", "حرائق القبائل",
    "خريطة الحرائق في الجزائر", "خطر الحرائق الجزائر", "رصد الحرائق بالأقمار الاصطناعية",
  ],
  authors: [{ name: "Moussaab Badla", url: "https://github.com/MoussaabBadla" }],
  creator: "Moussaab Badla",
  category: "Environment",
  alternates: {
    canonical: "/",
    languages: { "ar-DZ": "/", "fr-DZ": "/", en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Algeria Fire Map",
    title: TITLE,
    description:
      "Live satellite wildfire monitoring across Algeria — detections, intensity and fire-risk by wilaya. خريطة حرائق الجزائر مباشرة.",
    url: SITE_URL,
    locale: "ar_DZ",
    alternateLocale: ["fr_DZ", "en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Real-time wildfire monitoring for Algeria — NASA FIRMS detections + fire-risk by wilaya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Algeria Fire Map",
  alternateName: ["خريطة حرائق الجزائر", "Carte des feux de forêt en Algérie"],
  url: SITE_URL,
  applicationCategory: "https://schema.org/GovernmentApplication",
  operatingSystem: "Web",
  inLanguage: ["ar", "fr", "en"],
  description: DESCRIPTION,
  isAccessibleForFree: true,
  author: { "@type": "Person", name: "Moussaab Badla", url: "https://github.com/MoussaabBadla" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "Thing", name: "Wildfire monitoring in Algeria" },
  areaServed: { "@type": "Country", name: "Algeria" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </body>
    </html>
  );
}
