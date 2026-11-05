import { Metadata } from "next";
import ProjectsIndexView from "@/components/ProjectsIndexView";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Engineering Projects & Architecture Case Studies — Ayush Singh",
  description:
    "Explore open-source Linux systems tooling, compiler interpreters, and full-stack web applications engineered by Ayush Singh (SinghCod3r). Includes deep-dives on CUPS, Python tooling, and AI workflows.",
  alternates: {
    canonical: "/projects/",
  },
  openGraph: {
    title: "Engineering Projects & Architecture Case Studies — Ayush Singh",
    description:
      "Explore open-source Linux systems tooling, compiler interpreters, and full-stack web applications engineered by Ayush Singh (SinghCod3r).",
    url: "https://singhcod3r.github.io/projects/",
    type: "website",
    images: [
      {
        url: "https://singhcod3r.github.io/hero_collage_desktop.webp",
        width: 1200,
        height: 630,
        alt: "Ayush Singh Engineering Projects",
      },
    ],
  },
};

export default function ProjectsPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ayush Singh (SinghCod3r) Engineering Projects Archive",
    description: "Case studies and open-source software applications by Ayush Singh.",
    url: "https://singhcod3r.github.io/projects/",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((project, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://singhcod3r.github.io/projects/${project.slug}/`,
        name: project.title,
        description: project.description,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <ProjectsIndexView projects={PROJECTS} />
    </>
  );
}
