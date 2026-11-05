export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  architecture: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  image: string;
  additionalImages?: string[];
  tags: string[];
  category: string;
  accent: "lime" | "violet" | "coral" | "cyan";
  year: string;
  live: string;
  github: string;
  role: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "printer-support-resolver",
    title: "Printer Support Resolver",
    tagline: "Linux device driver resolver & capability pipeline",
    description:
      "A fast Linux tool that matches printers to the right driver in seconds using SQLite indexing and IEEE 1284 IDs, preventing system freezes.",
    fullDescription:
      "Printer Support Resolver is an open-source systems utility designed to eliminate hardware discovery bottlenecks on Linux distributions. By pre-indexing Foomatic XML driver repositories into an optimized SQLite schema, it resolves hardware IDs (IEEE 1284 device IDs) to CUPS drivers and PPD configurations in sub-50 milliseconds without locking desktop processes.",
    architecture:
      "Built with Python 3, SQLite relational indexing, CUPS (Common UNIX Printing System) APIs, and Pytest. Features a non-blocking asynchronous resolver pipeline and deterministic matching heuristics.",
    highlights: [
      "Sub-50ms driver matching across 10,000+ printer models",
      "Robust IEEE 1284 Device ID parsing and normalization",
      "Zero system freezes by replacing linear XML tree scans with indexed SQLite queries",
      "Direct CUPS PPD compatibility verification",
    ],
    metrics: [
      { label: "Query Latency", value: "< 50ms" },
      { label: "Driver DB", value: "10,000+ Models" },
      { label: "Test Coverage", value: "95%+" },
      { label: "License", value: "MIT / Open Source" },
    ],
    image: "/psr.png",
    tags: ["Python", "SQLite", "CUPS", "PPD", "Pytest", "Linux Kernel"],
    category: "Linux & Systems",
    accent: "lime",
    year: "2025",
    live: "https://github.com/SinghCod3r/printer-support-resolver",
    github: "https://github.com/SinghCod3r/printer-support-resolver",
    role: "Lead Developer & System Architect",
  },
  {
    slug: "system-config-printer",
    title: "system-config-printer — CUPS Modernization",
    tagline: "Linux Foundation & OpenPrinting infrastructure",
    description:
      "Modernized core printer management desktop software for GNOME/Fedora/Ubuntu, revamping device discovery and CUPS print queue configuration.",
    fullDescription:
      "As part of Google Summer of Code with OpenPrinting and The Linux Foundation, contributed core enhancements to system-config-printer, the universal GTK-based printer configuration utility installed across major GNU/Linux distributions. Modernized driver discovery, fixed upstream build failures, and resolved legacy Foomatic database query issues.",
    architecture:
      "Python, GTK3/PyGObject, CUPS D-Bus services, Linux UDEV subsystem, and Foomatic-DB printer metadata engine.",
    highlights: [
      "Official Google Summer of Code (GSoC) 2024 Project for OpenPrinting",
      "Replaced synchronous blocking network calls with responsive background threads",
      "Fixed dead upstream driver URLs in Foomatic DB affecting hundreds of legacy printers",
      "Engineered driver build fixes for SpliX and proprietary driver fallbacks",
    ],
    metrics: [
      { label: "Organization", value: "Linux Foundation" },
      { label: "Distros Reached", value: "Ubuntu, Fedora, Debian" },
      { label: "Program", value: "GSoC 2024" },
      { label: "Stack", value: "Python & GTK3" },
    ],
    image: "/system-config-printer_preview1.png",
    additionalImages: ["/system-config-printer-preview2.png"],
    tags: ["Python", "GTK3", "PyGObject", "CUPS", "D-Bus", "OpenPrinting"],
    category: "Open Source & Systems",
    accent: "lime",
    year: "2024",
    live: "https://github.com/OpenPrinting/system-config-printer",
    github: "https://github.com/OpenPrinting/system-config-printer",
    role: "GSoC Contributor @ OpenPrinting",
  },
  {
    slug: "openprinting-web",
    title: "OpenPrinting Portal & Documentation Nexus",
    tagline: "Official Linux Foundation OpenPrinting web infrastructure",
    description:
      "Maintainer and core contributor to the official OpenPrinting web portal, documenting modern CUPS 3.x architecture, driverless standards, and subsystems.",
    fullDescription:
      "The official web portal of OpenPrinting under The Linux Foundation serves as the primary documentation, standards, and news platform for all UNIX/Linux printing subsystems. As an active maintainer of the repository, spearheaded content modernizations, updated architecture documentation for CUPS 3.x and Driverless IPP standards, and ensured continuous deployment reliability.",
    architecture:
      "Jekyll, Liquid templates, responsive HTML5/CSS3, automated GitHub Actions deployment pipeline, and Markdown technical authoring.",
    highlights: [
      "Official maintainer of github.com/OpenPrinting/openprinting.github.io",
      "Authored and updated CUPS 3.x and Driverless Printing architectural documentation",
      "Streamlined multi-device responsiveness and accessibility for global open-source developers",
      "Integrated automated CI/CD validation workflows for documentation integrity",
    ],
    metrics: [
      { label: "Organization", value: "Linux Foundation" },
      { label: "Repository Role", value: "Active Maintainer" },
      { label: "Readership", value: "Global Linux Devs" },
      { label: "License", value: "MIT / Open Source" },
    ],
    image: "/openprinting_web.webp",
    tags: ["Jekyll", "Liquid", "Markdown", "OpenPrinting", "Linux Foundation", "CI/CD"],
    category: "Open Source & Systems",
    accent: "lime",
    year: "2024 - Present",
    live: "https://openprinting.github.io/",
    github: "https://github.com/OpenPrinting/openprinting.github.io",
    role: "OpenPrinting Maintainer",
  },
  {
    slug: "foomatic-lookup-site",
    title: "Foomatic Database Static Lookup Engine",
    tagline: "High-performance static search engine indexing 6,000+ Linux printer drivers",
    description:
      "Engineered a data extraction pipeline compiling 6,000+ printer drivers from upstream Foomatic-DB XML into a lightning-fast, zero-backend static search engine.",
    fullDescription:
      "The Linux Foundation's Foomatic-DB holds extensive XML archives defining printer capabilities and driver mappings across hundreds of manufacturers. Co-engineered a high-performance static lookup utility that parses and transforms over 6,000 driver records into an optimized, pre-indexed client-side data structure, allowing Linux users to search compatibility in milliseconds without server overhead.",
    architecture:
      "Python XML ETL extraction scripts parsing upstream Foomatic repositories, generating normalized static JSON indices; client-side fuzzy search UI hosted statically on GitHub Pages.",
    highlights: [
      "Automated Python extraction pipeline processing 6,000+ driver records from Foomatic-DB",
      "Instant sub-100ms client-side search across printer manufacturers and IEEE 1284 device IDs",
      "Zero-maintenance, zero-backend architecture deployed statically on GitHub Pages",
      "Direct collaboration with OpenPrinting community contributors to modernize printer tooling",
    ],
    metrics: [
      { label: "Drivers Indexed", value: "6,000+ Models" },
      { label: "Search Latency", value: "< 100ms" },
      { label: "Pipeline", value: "Python XML ETL" },
      { label: "Hosting", value: "GitHub Pages" },
    ],
    image: "/foomatic_lookup_preview.webp",
    tags: ["Python", "OpenPrinting", "Foomatic-DB", "Data Pipeline", "ETL", "Static Web"],
    category: "Open Source & Systems",
    accent: "violet",
    year: "2024",
    live: "https://rudra-iitm.github.io/foomatic-lookup-site/",
    github: "https://github.com/SinghCod3r/foomatic-lookup-site",
    role: "Data Pipeline & Core Contributor",
  },
  {
    slug: "floor-and-furnishings",
    title: "Floor & Furnishings — Web Admin & Mobile Platform",
    tagline: "Commercial interior decor ecommerce & cross-platform React Native app",
    description:
      "Engineered an enterprise interior decor ecommerce platform featuring a full-featured web admin dashboard and cross-platform React Native mobile application.",
    fullDescription:
      "Floor and Furnishings is an enterprise interior decor and furnishing management ecosystem built for seamless catalog browsing, multi-channel order fulfillment, and real-time inventory tracking. Developed an end-to-end web administration suite for inventory management, customer analytics, and order fulfillment states alongside a cross-platform React Native mobile application for customer discovery.",
    architecture:
      "React Native with Expo for mobile app; Next.js and Tailwind CSS for web admin portal; Node.js, Express, and REST APIs with MongoDB Atlas for scalable order processing and session telemetry.",
    highlights: [
      "Complete Web Admin dashboard with real-time inventory management and sales analytics",
      "Cross-platform React Native mobile application with smooth navigation and cart workflows",
      "Secure REST API backend with JWT authentication and role-based access control (RBAC)",
      "Dynamic product filtering by fabric, texture, room dimensions, and color palettes",
    ],
    metrics: [
      { label: "Platform", value: "Web Admin + Mobile" },
      { label: "Mobile Stack", value: "React Native" },
      { label: "Admin Stack", value: "Next.js & Node.js" },
      { label: "Status", value: "Production Live" },
    ],
    image: "/fandf_landing.webp",
    tags: ["React Native", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "Full Stack Web",
    accent: "coral",
    year: "2025",
    live: "https://www.fandf.online/",
    github: "https://github.com/SinghCod3r/Floor_and_Furnishings-",
    role: "Lead Full-Stack & Mobile Developer",
  },
  {
    slug: "ezy-language",
    title: "Ezy Scripting Language",
    tagline: "Deterministic interpreter & automation runtime",
    description:
      "A programming language written from scratch in Python with an indentation-aware lexer, recursive-descent parser, AST, and CLI REPL.",
    fullDescription:
      "Ezy is a minimalist, dynamically-typed scripting language crafted to explore compiler architecture and deterministic runtime execution. Engineered without third-party parser generators, it implements custom lexical analysis, Abstract Syntax Tree (AST) construction, scope environments with lexical closures, and an interactive terminal REPL.",
    architecture:
      "Custom Hand-written Lexer (indentation-aware), Recursive-Descent Parser, Tree-Walking AST Interpreter, Runtime Scope Environments, and CLI REPL.",
    highlights: [
      "Custom lexical tokenizer supporting indentation-based block syntax",
      "Pure recursive-descent parser generating clean Abstract Syntax Trees",
      "First-class functions, lexical scoping, closures, and control flow primitives",
      "Zero external compiler dependencies — built entirely in pure Python",
    ],
    metrics: [
      { label: "Parser Type", value: "Recursive-Descent" },
      { label: "Dependencies", value: "0 External" },
      { label: "Interactive REPL", value: "Built-in" },
      { label: "Test Suite", value: "Pytest Automated" },
    ],
    image: "/ezy_page_image.png",
    tags: ["Python", "Compilers", "AST", "Lexer", "Parser", "CLI"],
    category: "Languages & Runtimes",
    accent: "violet",
    year: "2025",
    live: "https://singhcod3r.github.io/ezy/",
    github: "https://github.com/SinghCod3r/ezy",
    role: "Creator & Language Designer",
  },
  {
    slug: "aura-ai",
    title: "Aura.Ai — Intelligent Voice & Workflow Agent",
    tagline: "Autonomous multi-modal interview and intelligence assistant",
    description:
      "An intelligent workflow and voice interface for technical interview preparation, automated audio evaluation, and health data tracking.",
    fullDescription:
      "AuraAI is an AI-powered conversational platform featuring high-fidelity voice interaction and real-time structured telemetry. Designed to evaluate speech fluency, technical accuracy, and analytical problem-solving, it integrates high-throughput Next.js frontend interfaces with PyTorch and Python backend inference pipelines.",
    architecture:
      "Next.js 15 App Router, TypeScript, Tailwind CSS, PyTorch audio tensor evaluation, WebSockets, and Web Audio API streaming.",
    highlights: [
      "Sub-200ms audio streaming and speech sentiment analysis pipeline",
      "Interactive analytics dashboard tracking session accuracy and fluency",
      "Responsive design with Dark-mode glassmorphic aesthetics",
      "Secure backend token authentication and rate-limited evaluation workers",
    ],
    metrics: [
      { label: "Frontend", value: "Next.js 15" },
      { label: "Audio Latency", value: "< 200ms" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "AI Engine", value: "PyTorch & Gemini" },
    ],
    image: "/Aurai_landing.png",
    additionalImages: ["/auraai_second_page.png"],
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Python", "PyTorch", "WebSockets"],
    category: "Full Stack Web",
    accent: "coral",
    year: "2025",
    live: "https://auraaiprep.tech/",
    github: "https://github.com/SinghCod3r/Aura.Ai",
    role: "Full-Stack & AI Systems Engineer",
  },
  {
    slug: "moodbite-ai",
    title: "MoodBite.AI — Personalized Meal Intelligence",
    tagline: "Personalized healthy meal finder & nutritional advisor",
    description:
      "A friendly web app that recommends wholesome meals based on your mood, daily energy, and dietary routine with recipe analytics.",
    fullDescription:
      "MoodBite.AI leverages emotional state telemetry and macronutrient profiling to recommend customized nutritional meals. Combines responsive React user interfaces with a robust Node.js/Express REST API and MongoDB schema architecture.",
    architecture:
      "React, Node.js, Express, MongoDB Atlas, Tailwind CSS, and Spoonacular API integration.",
    highlights: [
      "Mood-to-macronutrient mapping algorithm recommending wholesome recipes",
      "Dynamic filtering for vegan, keto, allergen-free, and high-protein meals",
      "Real-time nutritional breakdown calculation with visual charts",
      "Favorites bookmarking and grocery list auto-generation",
    ],
    metrics: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Database", value: "MongoDB Atlas" },
      { label: "API", value: "Express REST" },
      { label: "Design", value: "Responsive UI" },
    ],
    image: "/moodbite_landing_page.png",
    additionalImages: ["/moodbite_example.png"],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "Full Stack Web",
    accent: "cyan",
    year: "2024",
    live: "https://moodbiteai.vercel.app",
    github: "https://github.com/SinghCod3r/MoodBite.Ai",
    role: "Full-Stack Web Developer",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
