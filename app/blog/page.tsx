import { Metadata } from "next";
import BlogView from "@/components/BlogView";
import { fetchMediumRssPosts } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Blog & Technical Dispatches — Ayush Singh (SinghCod3r)",
  description:
    "Live Medium RSS feed and technical engineering dispatches on Linux systems tooling, AI agent containment, and OpenPrinting by Ayush Singh.",
  alternates: {
    canonical: "/blog/",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  openGraph: {
    title: "Blog & Technical Dispatches — Ayush Singh (SinghCod3r)",
    description:
      "Live Medium RSS feed and technical engineering dispatches on Linux systems tooling, AI agent containment, and OpenPrinting by Ayush Singh.",
    url: "https://singhcod3r.github.io/blog/",
    type: "website",
  },
};

export default async function BlogPage() {
  const { posts, isLiveRss } = await fetchMediumRssPosts();

  return <BlogView initialPosts={posts} isLiveRss={isLiveRss} />;
}
