import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://singhcod3r.github.io"),
  title: "SinghCod3r — Ayush Singh | Software Developer & Open Source Contributor",
  description:
    "Portfolio of Ayush Singh (SinghCod3r) — Open source maintainer, Python tooling builder, and web developer.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://singhcod3r.github.io/#person",
      name: "Ayush Singh",
      alternateName: "SinghCod3r",
      url: "https://singhcod3r.github.io",
      image: "https://singhcod3r.github.io/my_image.webp",
      jobTitle: "Software Developer & Open Source Contributor",
      worksFor: {
        "@type": "Organization",
        name: "OpenPrinting / Linux Foundation",
      },
      sameAs: [
        "https://github.com/SinghCod3r",
        "https://medium.com/@Singhcod3r",
        "https://www.linkedin.com/in/ayush-singh-cod3r/",
        "https://x.com/SinghCod3r",
      ],
      knowsAbout: [
        "Linux Systems Programming",
        "OpenPrinting",
        "Python Developer Tooling",
        "CUPS & Printer Drivers",
        "Full-stack Web Development",
        "Next.js",
        "AI Agent Containment",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://singhcod3r.github.io/#website",
      url: "https://singhcod3r.github.io",
      name: "SinghCod3r Portfolio",
      description: "Portfolio and technical writings of Ayush Singh (SinghCod3r)",
      publisher: {
        "@id": "https://singhcod3r.github.io/#person",
      },
    },
  ],
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
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-[#d8ff58] selection:text-[#07080a] bg-[#07080a] text-[#f0f0e9]">
        {children}
      </body>
    </html>
  );
}
