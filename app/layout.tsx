import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SinghCod3r — Ayush Singh | Software Developer & Open Source Contributor",
  description:
    "Portfolio of Ayush Singh (SinghCod3r) — Open source maintainer, Python tooling builder, and web developer.",
  verification: {
    google: "njBiYD1R5mTuY_37h2XR498birTtkrHu1GFUzc71LZ8",
  },
  keywords: [
    "Ayush Singh",
    "SinghCod3r",
    "OpenPrinting",
    "The Linux Foundation",
    "Linux Engineer",
    "Python Developer",
    "System Software",
    "Next.js",
  ],
  authors: [{ name: "Ayush Singh", url: "https://github.com/SinghCod3r" }],
  openGraph: {
    title: "SinghCod3r — Ayush Singh",
    description: "Open source software, developer tooling, and web applications.",
    url: "https://singhcod3r.github.io",
    siteName: "SinghCod3r Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SinghCod3r — Ayush Singh",
    description: "Open source software, developer tooling, and web applications.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="google-site-verification" content="njBiYD1R5mTuY_37h2XR498birTtkrHu1GFUzc71LZ8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#d8ff58] selection:text-[#07080a] bg-[#07080a] text-[#f0f0e9]">
        {children}
      </body>
    </html>
  );
}
