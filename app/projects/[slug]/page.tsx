import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  UserCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { GithubIcon } from "@/components/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} — Architecture & Technical Case Study`;
  const description = `${project.description} Engineered by Ayush Singh (SinghCod3r) using ${project.tags.slice(0, 4).join(", ")}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://singhcod3r.github.io/projects/${project.slug}/`,
      type: "article",
      images: [
        {
          url: project.image.startsWith("http")
            ? project.image
            : `https://singhcod3r.github.io${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        project.image.startsWith("http")
          ? project.image
          : `https://singhcod3r.github.io${project.image}`,
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const accentColorMap = {
    lime: "#d8ff58",
    violet: "#a786ff",
    coral: "#ff806d",
    cyan: "#7ff3da",
  };
  const accentHex = accentColorMap[project.accent] || "#d8ff58";

  // Schema.org SoftwareApplication structured data
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    headline: project.tagline,
    description: project.fullDescription,
    applicationCategory: project.category,
    operatingSystem: "Linux, Web, Cross-platform",
    url: project.live,
    codeRepository: project.github,
    author: {
      "@type": "Person",
      "@id": "https://singhcod3r.github.io/#person",
      name: "Ayush Singh",
    },
    keywords: project.tags.join(", "),
    datePublished: `${project.year}-01-01`,
    image: `https://singhcod3r.github.io${project.image}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://singhcod3r.github.io/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://singhcod3r.github.io/projects/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://singhcod3r.github.io/projects/${project.slug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-[#07080a] text-[#f0f0e9] selection:bg-[#d8ff58] selection:text-[#0c0d0e]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-25"
          style={{ background: accentHex }}
        />
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07080a]/80 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#989c99] hover:text-[#f0f0e9] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" style={{ color: accentHex }} />
            <span>All Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#f0f0e9] transition-colors"
            >
              Portfolio Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#707471]">
          <Link href="/" className="hover:text-[#f0f0e9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projects/" className="hover:text-[#f0f0e9] transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#f0f0e9] truncate">{project.title}</span>
        </nav>

        {/* Title Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span
              className="font-mono text-xs px-2.5 py-0.5 rounded border border-white/15 bg-black/60 font-semibold"
              style={{ color: accentHex }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#989c99] flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
              <Calendar className="w-3 h-3 text-[#d8ff58]" />
              {project.year}
            </span>
            <span className="text-xs font-mono text-[#989c99] flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
              <UserCheck className="w-3 h-3 text-[#7ff3da]" />
              {project.role}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#f0f0e9] mb-3">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg font-mono font-medium max-w-3xl" style={{ color: accentHex }}>
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-[#d8ff58] text-[#07080a] hover:scale-105 transition-transform"
              >
                <span>Live Demo / Release</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono border border-white/20 bg-white/5 hover:bg-white/10 text-[#f0f0e9] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code on GitHub</span>
              </a>
            )}
          </div>
        </header>

        {/* Hero Visual Image */}
        <section className="relative w-full h-[280px] sm:h-[460px] rounded-2xl overflow-hidden border border-white/15 bg-black/70 mb-10 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </section>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-xl border border-white/10 bg-[#121316]/60 backdrop-blur-md"
            >
              <div className="text-xs font-mono text-[#707471] uppercase tracking-wider mb-1">
                {m.label}
              </div>
              <div className="text-lg sm:text-xl font-mono font-bold text-[#f0f0e9]">
                {m.value}
              </div>
            </div>
          ))}
        </section>

        {/* Technical Deep Dive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section className="rounded-2xl border border-white/10 bg-[#121316]/40 p-6 sm:p-8">
              <h2 className="text-xl font-display font-bold text-[#f0f0e9] mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#d8ff58]" />
                System Overview &amp; Problem Solved
              </h2>
              <p className="text-sm sm:text-base text-[#989c99] leading-relaxed font-light">
                {project.fullDescription}
              </p>
            </section>

            {/* Architecture */}
            <section className="rounded-2xl border border-white/10 bg-[#121316]/40 p-6 sm:p-8">
              <h2 className="text-xl font-display font-bold text-[#f0f0e9] mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#a786ff]" />
                Architecture &amp; Pipeline Design
              </h2>
              <p className="text-sm sm:text-base text-[#989c99] leading-relaxed font-light">
                {project.architecture}
              </p>
            </section>

            {/* Highlights */}
            <section className="rounded-2xl border border-white/10 bg-[#121316]/40 p-6 sm:p-8">
              <h2 className="text-xl font-display font-bold text-[#f0f0e9] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7ff3da]" />
                Key Engineering Deliverables
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#989c99]">
                    <CheckCircle2 className="w-4 h-4 text-[#d8ff58] mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Additional Images Gallery if present */}
            {project.additionalImages && project.additionalImages.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-[#f0f0e9]">
                  Interface &amp; Implementation Previews
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.additionalImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full h-[240px] sm:h-[360px] rounded-xl overflow-hidden border border-white/10 bg-black/50"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} Preview ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121316]/60 p-6 sticky top-24">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#707471] mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#f0f0e9]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#707471]">
                    Developer &amp; Architect
                  </div>
                  <div className="text-sm font-semibold text-[#f0f0e9] mt-0.5">
                    Ayush Singh (SinghCod3r)
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#707471]">
                    Organization / Context
                  </div>
                  <div className="text-sm text-[#989c99] mt-0.5">
                    {project.category} ({project.year})
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center py-2.5 rounded-full text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 text-[#f0f0e9] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Explore Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center py-2.5 rounded-full text-xs font-mono border border-white/10 hover:border-white/20 text-[#989c99] hover:text-[#f0f0e9] transition-colors flex items-center justify-center gap-2"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Crawlable Internal Links: Next & Previous Project */}
        <nav aria-label="Adjacent Projects" className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}/`}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col group"
            >
              <span className="text-[11px] font-mono text-[#707471] mb-1 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-[#d8ff58]" />
                Previous Project
              </span>
              <span className="text-base font-display font-bold text-[#f0f0e9] group-hover:text-[#d8ff58] transition-colors truncate">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}/`}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col sm:items-end text-left sm:text-right group"
            >
              <span className="text-[11px] font-mono text-[#707471] mb-1 flex items-center gap-1.5 sm:justify-end">
                Next Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#d8ff58]" />
              </span>
              <span className="text-base font-display font-bold text-[#f0f0e9] group-hover:text-[#d8ff58] transition-colors truncate">
                {nextProject.title}
              </span>
            </Link>
          )}
        </nav>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs font-mono text-[#707471] mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ayush Singh (SinghCod3r). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#f0f0e9] transition-colors">Portfolio</Link>
            <Link href="/projects/" className="hover:text-[#f0f0e9] transition-colors">Projects</Link>
            <Link href="/medium-blog/" className="hover:text-[#f0f0e9] transition-colors">Medium Blog</Link>
            <a href="https://github.com/SinghCod3r" target="_blank" rel="noreferrer" className="hover:text-[#f0f0e9] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
