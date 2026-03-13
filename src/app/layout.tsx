import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Traust smíði — Húsasmíði og smíðaþjónusta á Suðurnesjum",
    template: "%s | Traust smíði",
  },
  description:
    "Fagleg smíðaþjónusta í Reykjanesbæ og á Suðurnesjum. Alhliða húsasmíði, viðhald og endurbætur.",
  metadataBase: new URL("https://traustsmidi.is"),
  openGraph: {
    title: "Traust smíði — Fagleg smíðaþjónusta í Reykjanesbæ og á Suðurnesjum",
    description:
      "Fagleg smíðaþjónusta í Reykjanesbæ og á Suðurnesjum. Alhliða húsasmíði, viðhald og endurbætur.",
    url: "https://traustsmidi.is",
    siteName: "Traust smíði",
    locale: "is_IS",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Traust smíði",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-dark.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="is">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "Traust smíði",
              description:
                "Fagleg smíðaþjónusta í Reykjanesbæ og á Suðurnesjum. Alhliða húsasmíði, viðhald og endurbætur.",
              url: "https://traustsmidi.is",
              telephone: "+3547752274",
              email: "traustsmidi@traustsmidi.is",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Address 12",
                addressLocality: "Reykjanesbær",
                postalCode: "260",
                addressCountry: "IS",
              },
              areaServed: [
                { "@type": "City", name: "Reykjanesbær" },
                { "@type": "AdministrativeArea", name: "Suðurnes" },
              ],
              founder: {
                "@type": "Person",
                name: "Emil Breki Kristinsson",
                jobTitle: "Húsasmíðameistari",
              },
              image: "https://traustsmidi.is/og-image.png",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
