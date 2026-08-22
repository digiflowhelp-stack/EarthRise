import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { DEFAULT_LOCALE, dirFor, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoArabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const TITLE = "FireWatch — Real-time wildfire intelligence from space";
const DESCRIPTION =
  "Real-time wildfire intelligence from space. Live fire detections, intensity, and climate risk — for communities on the front line. " +
  "Satellite monitoring across Algeria from NASA FIRMS. " +
  "متابعة حرائق الغابات في الجزائر مباشرة عبر الأقمار الاصطناعية.";

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  applicationName: "FireWatch",
  title: { default: TITLE, template: "%s · FireWatch" },
  description: DESCRIPTION,
  keywords: [
    // English
    "FireWatch", "wildfire intelligence", "wildfire map", "live fire detections", "climate risk",
    "Algeria fire map", "wildfire Algeria", "forest fire Algeria",
    "NASA FIRMS", "live fire map", "fire risk", "VIIRS MODIS",
    // French
    "carte des feux Algérie", "feux de forêt Algérie", "incendie Algérie", "feux Kabylie",
    "risque incendie Algérie", "surveillance des feux Algérie",
    // Arabic
    "خريطة حرائق الجزائر", "حرائق الغابات الجزائر", "حرائق الجزائر مباشر", "حرائق القبائل",
    "خريطة الحرائق في الجزائر", "خطر الحرائق الجزائر", "رصد الحرائق بالأقمار الاصطناعية",
  ],
  authors: [{ name: "Digiflow", url: "https://github.com/digiflowhelp-stack" }],
  creator: "Digiflow",
  category: "Environment",
  alternates: {
    canonical: "/",
    languages: { "ar-DZ": "/", "fr-DZ": "/", en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "FireWatch",
    title: TITLE,
    description:
      "Real-time wildfire intelligence from space. Live fire detections, intensity, and climate risk — for communities on the front line.",
    url: SITE_URL,
    locale: "ar_DZ",
    alternateLocale: ["fr_DZ", "en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Real-time wildfire intelligence from space — live detections, intensity, and climate risk via NASA FIRMS.",
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
  name: "FireWatch",
  alternateName: ["خريطة حرائق الجزائر", "Carte des feux de forêt en Algérie"],
  url: SITE_URL,
  applicationCategory: "https://schema.org/GovernmentApplication",
  operatingSystem: "Web",
  inLanguage: ["ar", "fr", "en"],
  description: DESCRIPTION,
  isAccessibleForFree: true,
  author: { "@type": "Organization", name: "Digiflow", url: "https://github.com/digiflowhelp-stack" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "Thing", name: "Wildfire monitoring in Algeria" },
  areaServed: { "@type": "Country", name: "Algeria" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </body>
    </html>
  );
}
