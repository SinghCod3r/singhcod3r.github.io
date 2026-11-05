import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://singhcod3r.github.io"),
  title: {
    default: "Ayush Singh (SinghCod3r) — Linux Systems Engineer & Full-Stack Developer",
    template: "%s | Ayush Singh (SinghCod3r)",
  },
  description:
    "Official portfolio of Ayush Singh (SinghCod3r) — Linux systems engineer, OpenPrinting / The Linux Foundation contributor, compiler creator, and full-stack developer specializing in CUPS, Python developer tooling, and modern web applications.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
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
    "Linux Systems Engineer",
    "OpenPrinting",
    "The Linux Foundation",
    "CUPS",
    "Google Summer of Code",
    "GSoC 2024",
    "Python Developer",
    "Printer Support Resolver",
    "Ezy Scripting Language",
    "AuraAI",
    "Full Stack Web Developer",
    "Next.js Developer",
    "System Software",
  ],
  authors: [{ name: "Ayush Singh", url: "https://github.com/SinghCod3r" }],
  creator: "Ayush Singh (SinghCod3r)",
  publisher: "Ayush Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://singhcod3r.github.io",
    siteName: "Ayush Singh (SinghCod3r) Portfolio",
    title: "Ayush Singh (SinghCod3r) — Linux Systems Engineer & Full-Stack Developer",
    description:
      "Open source maintainer (The Linux Foundation / OpenPrinting), Python systems builder, and full-stack developer. Explore high-performance tools, compilers, and projects.",
    images: [
      {
        url: "https://singhcod3r.github.io/hero_collage_desktop.webp",
        width: 1200,
        height: 630,
        alt: "Ayush Singh (SinghCod3r) Portfolio and Engineering Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SinghCod3r",
    creator: "@SinghCod3r",
    title: "Ayush Singh (SinghCod3r) — Linux Systems Engineer & Full-Stack Developer",
    description:
      "Open source maintainer (The Linux Foundation / OpenPrinting), Python systems builder, and full-stack developer.",
    images: ["https://singhcod3r.github.io/hero_collage_desktop.webp"],
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
      alternateName: ["SinghCod3r", "Ayush", "singhcod3r"],
      url: "https://singhcod3r.github.io",
      image: "https://singhcod3r.github.io/my_image.webp",
      jobTitle: "Software Developer & Linux Systems Contributor",
      description:
        "Software developer, open-source maintainer, and Linux systems engineer specializing in CUPS printing architecture, Python developer tooling, and modern web applications.",
      worksFor: {
        "@type": "Organization",
        name: "OpenPrinting / The Linux Foundation",
        url: "https://openprinting.github.io",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Google Summer of Code (GSoC)",
        url: "https://summerofcode.withgoogle.com",
      },
      sameAs: [
        "https://github.com/SinghCod3r",
        "https://medium.com/@Singhcod3r",
        "https://www.linkedin.com/in/ayush-singh-cod3r/",
        "https://x.com/SinghCod3r",
      ],
      knowsAbout: [
        "Linux Systems Programming",
        "OpenPrinting Architecture",
        "CUPS (Common UNIX Printing System)",
        "Python Developer Tooling",
        "Compiler & Interpreter Design",
        "Full-stack Web Development",
        "Next.js & React",
        "TypeScript",
        "AI Agent Containment & Security",
      ],
      knowsLanguage: ["en", "hi"],
      mainEntityOfPage: "https://singhcod3r.github.io",
    },
    {
      "@type": "WebSite",
      "@id": "https://singhcod3r.github.io/#website",
      url: "https://singhcod3r.github.io",
      name: "Ayush Singh (SinghCod3r) Portfolio",
      description:
        "Official portfolio and technical engineering dispatches of Ayush Singh (SinghCod3r).",
      publisher: {
        "@id": "https://singhcod3r.github.io/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://singhcod3r.github.io/#profilepage",
      url: "https://singhcod3r.github.io",
      name: "Ayush Singh (SinghCod3r) Profile",
      mainEntity: {
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
